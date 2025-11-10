<script setup>
const props = defineProps({
  currentIndex: Number,
  searchEngines: Object,
})
const emit = defineEmits(["showAddModal",  "showDelModal","showEditModal"])
</script>

<template>
  <section class="admin-section" :class="{ active: currentIndex === 0 }" id="search-engines">
    <!--      <h2 class="section-title">搜索引擎管理</h2>-->

    <button class="add-btn" @click="emit('showAddModal')" id="add-engine-btn">
      <i class="fas fa-plus"></i> 添加搜索引擎
    </button>

    <table class="data-table">
      <thead>
      <tr>
        <th style="width: 20%">名称</th>
        <th style="width: 20%">标识符</th>
        <th style="width: 20%">搜索URL</th>
        <th style="width: 20%">图标</th>
        <th style="width: 20%">操作</th>
      </tr>
      </thead>
      <tbody id="engines-list">
      <!-- 搜索引擎列表将通过JS动态生成 -->
      <tr v-for="searchEngine in searchEngines" :key="searchEngine.id">
        <td>{{ searchEngine.name }}</td>
        <td>{{ searchEngine.name }}</td>
        <td style="text-wrap: nowrap; overflow: hidden">{{ searchEngine.url }}</td>
        <td><i :class="searchEngine.icon"></i></td>
        <td>
          <button class="action-btn edit" @click="emit('showEditModal',searchEngine.id)">
            <i class="fas fa-edit"></i> 编辑
          </button>
          <button class="action-btn delete" @click="emit('showDelModal', searchEngine.id)">
            <i class="fas fa-trash"></i> 删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>

</template>

<style scoped></style>
