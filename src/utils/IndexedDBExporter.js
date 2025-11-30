class IndexedDBExporter {
  constructor(dbName, dbVersion) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  // 导出所有数据表数据
  async exportAllTables() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(new Error(`数据库打开失败: ${request.error}`));

      request.onsuccess = async (event) => {
        const db = event.target.result;
        try {
          const exportData = {
            metadata: {
              dbName: this.dbName,
              dbVersion: this.dbVersion,
              exportTime: new Date().toISOString(),
              totalStores: db.objectStoreNames.length
            },
            data: {}
          };

          // 遍历所有对象存储（数据表）
          const storeNames = Array.from(db.objectStoreNames);

          for (const storeName of storeNames) {
            const storeData = await this.exportStore(db, storeName);
            exportData.data[storeName] = storeData;
          }

          db.close();
          resolve(exportData);

        } catch (error) {
          db.close();
          reject(error);
        }
      };
    });
  }

  // 导出单个数据表
  async exportStore(db, storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(new Error(`导出 ${storeName} 失败: ${request.error}`));
      request.onsuccess = () => {
        resolve({
          count: request.result.length,
          records: request.result
        });
      };
    });
  }

  // 下载导出的数据
  downloadExport(data, filename = null) {
    if (!filename) {
      filename = `${this.dbName}-export-${new Date().toISOString().split('T')[0]}.json`;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 完整的导出流程
  async exportAndDownload() {
    try {
      console.log('开始导出数据库...');

      const exportData = await this.exportAllTables();

      // 统计总记录数
      let totalRecords = 0;
      Object.values(exportData.data).forEach(store => {
        totalRecords += store.count;
      });

      console.log(`导出完成: ${exportData.metadata.totalStores} 个数据表, ${totalRecords} 条记录`);

      this.downloadExport(exportData);

      return {
        success: true,
        stores: exportData.metadata.totalStores,
        records: totalRecords,
        data: exportData
      };

    } catch (error) {
      console.error('导出失败:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}


export default IndexedDBExporter;