<script setup>
import IndexedDBExporter from '@/utils/IndexedDBExporter.js'
import { ref } from 'vue'
import IndexedDBImporter from '@/utils/IndexedDBImporter.js'

const fileInput = ref(null)
const selectedFiles = ref([])

const exportData = async () => {
  const dbName = 'UserDatabase'
  const dbVersion = 1
  const exporter = new IndexedDBExporter(dbName, dbVersion)
  const result = await exporter.exportAndDownload()

  if (result.success) {
    alert(`导出成功！${result.stores} 个数据表，${result.records} 条记录`)
  } else {
    alert(`导出失败: ${result.error}`)
  }
}

// 导入示例
async function handleImport(file, options = {}) {
  const dbName = 'UserDatabase'
  const dbVersion = 1
  const importer = new IndexedDBImporter(dbName, dbVersion);

  const result = await importer.importFromFile(file, {
    clearBeforeImport: false, // 导入前不清空现有数据
    skipDuplicates: true, // 跳过重复记录
    onProgress: (progress) => {
      // 更新进度条
      // updateProgressBar(progress.progress)
      console.log(`进度: ${progress.progress.toFixed(1)}%`)
    },
  })

  if (result.success) {
    alert(`导入成功！${result.importedStores} 个数据表，${result.importedRecords} 条记录`)
  } else {
    alert(`导入失败: ${result.error}`)
  }
}

// 打开文件选择对话框
const openFileDialog = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = files
  files.forEach(file => {
    handleImport(file)
  })
}
</script>

<template>
  <!-- 隐藏的文件输入 -->
  <input
    type="file"
    ref="fileInput"
    @change="handleFileSelect"
    style="display: none"
    accept=".json,.txt,.csv"
    multiple
  />
  <div class="floating-toolbar">
    <!-- 导入按钮 -->
    <button @click="exportData" class="toolbar-btn import-btn">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- 导入图标：向内的箭头和下载符号 -->
        <path d="M12 2V16M12 16L8 12M12 16L16 12" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M2 17L2 21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V17"
          stroke-linecap="round"
        />
        <!-- 云下载符号 -->
        <path
          d="M8 7C5.79086 7 4 8.79086 4 11C4 12.4806 4.8044 13.773 6 14.4646"
          stroke-linecap="round"
        />
        <path
          d="M16 7C18.2091 7 20 8.79086 20 11C20 12.4806 19.1956 13.773 18 14.4646"
          stroke-linecap="round"
        />
      </svg>
      <span class="tooltip">导入数据</span>
    </button>

    <!-- 导出按钮 -->
    <button @click="openFileDialog" class="toolbar-btn export-btn">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- 导出图标：向外的箭头和上传符号 -->
        <path d="M12 22V8M12 8L8 12M12 8L16 12" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M2 7L2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V7"
          stroke-linecap="round"
        />
        <!-- 云上传符号 -->
        <path
          d="M8 17C5.79086 17 4 15.2091 4 13C4 11.5194 4.8044 10.227 6 9.53544"
          stroke-linecap="round"
        />
        <path
          d="M16 17C18.2091 17 20 15.2091 20 13C20 11.5194 19.1956 10.227 18 9.53544"
          stroke-linecap="round"
        />
      </svg>
      <span class="tooltip">导出数据</span>
    </button>
  </div>
</template>

<style scoped>
/* 浮动工具条样式 */
.floating-toolbar {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.toolbar-btn {
  width: 65px;
  height: 65px;
  border-radius: 18px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.toolbar-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toolbar-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.2),
    0 6px 18px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.toolbar-btn:hover::before {
  opacity: 1;
}

.toolbar-btn:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.15),
    0 3px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.toolbar-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.toolbar-btn:active::after {
  width: 100%;
  height: 100%;
}

/* SVG图标样式 */
.icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.toolbar-btn:hover .icon {
  transform: scale(1.1);
}

/* 工具提示 */
.tooltip {
  position: absolute;
  right: 75px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  backdrop-filter: blur(10px);
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  border-left: 5px solid rgba(0, 0, 0, 0.8);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.toolbar-btn:hover .tooltip {
  opacity: 1;
  transform: translateX(0);
}
</style>
