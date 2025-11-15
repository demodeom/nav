<script setup>
const props = defineProps({
  className: Object,
  editModel: Object,
  newSearchEngine:Object
})

const emit = defineEmits(["closeModal","updateData"])

</script>

<template>
  <div class="modal" :class="className" id="category-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="category-modal-title">添加分类</h3>
        <button class="close-btn" @click="emit('closeModal')" id="close-category-modal">&times;</button>
      </div>
      <form id="category-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">分类名称</label>
            <input
              type="text"
              class="form-input"
              id="category-name"
              placeholder="例如：技术开发"
              v-model="props.editModel.name"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">分类标识符</label>
            <input
              type="text"
              class="form-input"
              id="category-id"
              placeholder="例如：tech"
              v-model="props.editModel.key"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">图标类名</label>
          <input
            type="text"
            class="form-input"
            id="category-icon"
            placeholder="例如：fas fa-code"
            v-model="props.editModel.icon"
            required
          />
        </div>
        <span @click="emit('updateData',props.editModel)" class="submit-btn"><i class="fas fa-save"></i> 保存分类</span>
      </form>
    </div>
  </div>

</template>

<style scoped></style>
