<script setup>
const props = defineProps({
  delModalStatus: Boolean,
  currentId: Number,
})

const emit = defineEmits(['showDelModal', 'deleteData'])
</script>

<template>
  <div class="modal delete-modal" :class="{ active: delModalStatus }" id="delete-modal">
    <div class="modal-content">
      <div class="delete-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="delete-title" id="delete-title">确认删除</h3>
      <p class="delete-text" id="delete-text">您确定要删除此项吗？此操作不可撤销。</p>
      <div class="delete-actions">
        <button class="cancel-btn" id="cancel-delete" @click="emit('showDelModal')">取消</button>
        <button
          class="confirm-delete-btn"
          @click="emit('deleteData', props.currentId)"
          id="confirm-delete"
        >
          确认删除
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
