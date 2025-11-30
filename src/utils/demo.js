// 初始化导出导入器
const dbName = 'MyAppDatabase';
const dbVersion = 1;

const exporter = new IndexedDBExporter(dbName, dbVersion);
const importer = new IndexedDBImporter(dbName, dbVersion);

// 导出示例
async function handleExport() {
  const result = await exporter.exportAndDownload();

  if (result.success) {
    alert(`导出成功！${result.stores} 个数据表，${result.records} 条记录`);
  } else {
    alert(`导出失败: ${result.error}`);
  }
}

// 导入示例
async function handleImport(file, options = {}) {
  const result = await importer.importFromFile(file, {
    clearBeforeImport: false, // 导入前不清空现有数据
    skipDuplicates: true,     // 跳过重复记录
    onProgress: (progress) => {
      // 更新进度条
      updateProgressBar(progress.progress);
      console.log(`进度: ${progress.progress.toFixed(1)}%`);
    }
  });

  if (result.success) {
    alert(`导入成功！${result.importedStores} 个数据表，${result.importedRecords} 条记录`);
  } else {
    alert(`导入失败: ${result.error}`);
  }
}

// 文件选择事件处理
document.getElementById('importFile').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    handleImport(file);
  }
});

// 导出按钮事件
document.getElementById('exportBtn').addEventListener('click', handleExport);