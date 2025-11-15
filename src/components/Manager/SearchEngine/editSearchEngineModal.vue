<script setup>
import { reactive } from 'vue'

const props = defineProps({
  className: Object,
  editModel: Object,
  newSearchEngine:Object
})

const emit = defineEmits(["closeModal","updateData"])



</script>

<template>
  <!-- 搜索引擎模态框 -->
  <div class="modal" :class="className" id="engine-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="engine-modal-title">编辑搜索引擎</h3>
        <button class="close-btn" @click="emit('closeModal')" id="close-engine-modal">&times;</button>
      </div>
      <form id="engine-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">名称</label>
            <input
              type="text"
              class="form-input"
              id="engine-name"
              placeholder="例如：百度"
              v-model="props.editModel.name"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">标识符</label>
            <input
              type="text"
              class="form-input"
              id="engine-id"
              placeholder="例如：baidu"
              v-model="props.editModel.key"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">搜索URL</label>
            <input
              type="text"
              class="form-input"
              id="engine-url"
              placeholder="例如：https://www.baidu.com/s?wd="
              v-model="props.editModel.url"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">图标类名</label>
            <input
              type="text"
              class="form-input"
              id="engine-icon"
              placeholder="例如：fab fa-baidu"
              v-model="props.editModel.icon"
              required
            />
          </div>
        </div>
        <span class="submit-btn" @click="emit('updateData', props.editModel)"><i class="fas fa-save"></i> 保存搜索引擎</span>
      </form>
    </div>
  </div>

</template>

<style scoped></style>
