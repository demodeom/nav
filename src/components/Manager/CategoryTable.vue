<script setup>
const props = defineProps({
  currentIndex: Number,
  categories: Object,
})
const emit = defineEmits(["showAddModal",  "showDelModal"])
</script>

<template>
  <section class="admin-section" :class="{ active: currentIndex === 1 }" id="categories">
    <!--      <h2 class="section-title">书签分类管理</h2>-->

    <button class="add-btn" @click="emit('showAddModal')" id="add-category-btn">
      <i class="fas fa-plus"></i> 添加分类
    </button>

    <table class="data-table">
      <thead>
      <tr>
        <th>分类名称</th>
        <!--            <th>标识符</th>-->
        <th>图标</th>
        <th>书签数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody id="categories-list">
      <!-- 分类列表将通过JS动态生成 -->
      <tr v-for="(category, index) in categories" :key="index">
        <td>{{ category.name }}</td>
        <!--            <td>{{ category.name }}</td>-->
        <td><i :class="category.icon"></i></td>
        <td>{{ category.sites.length }}</td>
        <td>
          <button class="action-btn edit" @click="emit('showAddModal')">
            <i class="fas fa-edit"></i> 编辑
          </button>
          <button class="action-btn delete" @click="emit('showDelModal',index)">
            <i class="fas fa-trash"></i> 删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
