<script setup>
const props = defineProps({
  className: Object,
  editModel: Object
})

const emit = defineEmits(["closeModal","updateData"])
</script>

<template>
  <!-- 友情链接模态框 -->
    <div
      class="modal"
      :class="className"
      id="friend-link-modal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="friend-link-modal-title">修改友情链接</h3>
          <button class="close-btn" @click="emit('closeModal')" id="close-friend-link-modal">
            &times;
          </button>
        </div>
        <form id="friend-link-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">链接名称</label>
              <input
                type="text"
                class="form-input"
                id="friend-link-name"
                placeholder="例如：技术博客"
                required
                v-model="editModel.name"
              />
            </div>
            <div class="form-group">
              <label class="form-label">URL</label>
              <input
                type="text"
                class="form-input"
                id="friend-link-url"
                placeholder="例如：https://example.com"
                v-model="editModel.url"

                required
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">图标类名</label>
            <input
              type="text"
              class="form-input"
              id="friend-link-icon"
              placeholder="例如：fas fa-blog"
              v-model="editModel.icon"
              required
            />
          </div>
          <span @click="emit('updateData', editModel)" class="submit-btn"><i class="fas fa-save"></i> 保存友情链接</span>
        </form>
      </div>
    </div>
</template>

<style scoped></style>
