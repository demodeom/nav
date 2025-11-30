class IndexedDBImporter {
  constructor(dbName, dbVersion) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  // 验证导入数据格式
  validateImportData(data) {
    if (!data.metadata || !data.data) {
      throw new Error('无效的导入文件格式');
    }

    if (data.metadata.dbName !== this.dbName) {
      console.warn(`数据库名称不匹配: 导入文件来自 ${data.metadata.dbName}, 当前数据库 ${this.dbName}`);
    }

    return true;
  }

  // 导入所有数据表数据
  async importAllTables(importData, options = {}) {
    const {
      clearBeforeImport = false, // 导入前是否清空现有数据
      onProgress = null,         // 进度回调
      skipDuplicates = true      // 是否跳过重复数据
    } = options;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(new Error(`数据库打开失败: ${request.error}`));

      request.onsuccess = async (event) => {
        const db = event.target.result;
        try {
          this.validateImportData(importData);

          const results = {
            totalStores: Object.keys(importData.data).length,
            importedStores: 0,
            totalRecords: 0,
            importedRecords: 0,
            storeDetails: {}
          };

          // 遍历导入数据中的所有数据表
          for (const [storeName, storeData] of Object.entries(importData.data)) {
            if (!db.objectStoreNames.contains(storeName)) {
              console.warn(`数据表 ${storeName} 不存在，跳过导入`);
              continue;
            }

            const storeResult = await this.importStore(
              db,
              storeName,
              storeData.records,
              { clearBeforeImport, skipDuplicates }
            );

            results.storeDetails[storeName] = storeResult;
            results.importedStores++;
            results.totalRecords += storeData.count;
            results.importedRecords += storeResult.imported;

            // 报告进度
            if (onProgress) {
              onProgress({
                storeName,
                progress: (results.importedStores / results.totalStores) * 100,
                currentStore: storeName,
                importedStores: results.importedStores,
                totalStores: results.totalStores
              });
            }
          }

          db.close();
          resolve(results);

        } catch (error) {
          db.close();
          reject(error);
        }
      };

      request.onupgradeneeded = (event) => {
        // 如果数据库版本需要升级，可以在这里处理
        console.log('数据库版本升级:', event.oldVersion, '->', event.newVersion);
      };
    });
  }

  // 导入单个数据表
  async importStore(db, storeName, records, options) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      const result = {
        storeName,
        total: records.length,
        imported: 0,
        errors: [],
        skipped: 0
      };

      // 如果需要清空现有数据
      if (options.clearBeforeImport) {
        const clearRequest = store.clear();
        clearRequest.onerror = () => {
          result.errors.push(`清空数据表失败: ${clearRequest.error}`);
        };
      }

      // 批量导入记录
      let completed = 0;

      records.forEach((record, index) => {
        try {
          const request = store.add(record);

          request.onsuccess = () => {
            result.imported++;
            completed++;

            // 检查是否所有操作完成
            if (completed === records.length) {
              resolve(result);
            }
          };

          request.onerror = () => {
            if (request.error.name === 'ConstraintError' && options.skipDuplicates) {
              result.skipped++;
            } else {
              result.errors.push(`记录 ${index} 导入失败: ${request.error}`);
            }
            completed++;

            if (completed === records.length) {
              resolve(result);
            }
          };

        } catch (error) {
          result.errors.push(`记录 ${index} 处理失败: ${error.message}`);
          completed++;

          if (completed === records.length) {
            resolve(result);
          }
        }
      });

      // 处理空数组的情况
      if (records.length === 0) {
        resolve(result);
      }
    });
  }

  // 从文件读取导入数据
  async readImportFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          resolve(data);
        } catch (error) {
          reject(new Error('文件解析失败: 不是有效的 JSON 格式'));
        }
      };

      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };

      reader.readAsText(file);
    });
  }

  // 完整的导入流程
  async importFromFile(file, options = {}) {
    try {
      console.log('开始导入数据...');

      // 读取文件
      const importData = await this.readImportFile(file);
      console.log('文件读取成功:', importData.metadata);

      // 导入数据
      const results = await this.importAllTables(importData, {
        ...options,
        onProgress: (progress) => {
          console.log(`导入进度: ${progress.progress.toFixed(1)}% - ${progress.currentStore}`);
          if (options.onProgress) {
            options.onProgress(progress);
          }
        }
      });

      console.log('导入完成:', results);

      return {
        success: true,
        ...results
      };

    } catch (error) {
      console.error('导入失败:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default IndexedDBImporter;