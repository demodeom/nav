<script setup>
const props = defineProps({
  className: Object,
  newModel: Object,
  categoryModelData: Object,
})

const emit = defineEmits(['closeModal', 'addData'])
</script>

<template>
  <!--  书签模态框-->
  <div class="modal" :class="className" id="bookmark-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="bookmark-modal-title">添加书签</h3>
        <button class="close-btn" @click="emit('closeModal')" id="close-bookmark-modal">
          &times;
        </button>
      </div>
      <form id="bookmark-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">书签名称</label>
            <input
              type="text"
              class="form-input"
              id="bookmark-name"
              placeholder="例如：GitHub"
              required
              v-model="props.newModel.name"
            />
          </div>
          <div class="form-group">
            <label class="form-label">URL</label>
            <input
              type="text"
              class="form-input"
              id="bookmark-url"
              placeholder="例如：https://github.com"
              v-model="props.newModel.url"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">图标类名</label>
            <input
              type="text"
              class="form-input"
              id="bookmark-icon"
              placeholder="例如：fab fa-github"
              v-model="props.newModel.icon"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">所属分类</label>
            <select
              class="form-input"
              v-model="props.newModel.categoryKey"
              id="bookmark-category"
              required
            >
              <option value="">请选择分类</option>
              <!-- 分类选项将通过JS动态生成 -->
              <option v-for="category in props.categoryModelData"
                      :value="category.key"
                      :selected="category.key === props.newModel.categoryKey"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">描述</label>
          <input
            type="text"
            class="form-input"
            id="bookmark-desc"
            placeholder="例如：全球最大的代码托管平台"
            v-model="props.newModel.desc"
            required
          />
        </div>
        <span @click="emit('addData', props.newModel)" class="submit-btn"
          ><i class="fas fa-save"></i> 保存书签</span
        >
      </form>
    </div>
  </div>
</template>

<style scoped></style>
