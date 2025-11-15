<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import AddSearchEngineModal from '@/components/Manager/SearchEngine/addSearchEngineModal.vue'
import EditSearchEngineModal from '@/components/Manager/SearchEngine/editSearchEngineModal.vue'
import IndexedDB from '@/utils/indexedDB.js'
import DeleteModal from '@/components/Manager/DeleteModal.vue'

const props = defineProps({
  currentIndex: Number,
})

const db = ref(null)
const modelData = ref([])
const newModel = reactive({
  id: 0,
  key: 'bing',
  name: '必应',
  url: 'https://www.bing.com/search?q=',
  icon: 'fab fa-microsoft',
})
const editModel = reactive({})
const currentId = ref(0)

// 添加模态框
const addModalStatus = ref(false)
const showAddModal = () => {
  addModalStatus.value = !addModalStatus.value
}

const editModalStatus = ref(false)
const showEditModal = () => {
  editModalStatus.value = !editModalStatus.value
}

const delModalStatus = ref(false)
const showDelModal = (id) => {
  currentId.value = id
  delModalStatus.value = !delModalStatus.value
}

const loadData = async () => {
  try {
    const data = await db.value.getAll('search_engines')
    modelData.value = data
    console.log(data)
  } catch (error) {
    console.error('加载用户失败:', error)
    // showMessage('error', '加载用户失败！')
  } finally {
    // console.log(searchEngines.value)
    // loading.value = false
  }
}

// 添加数据
const addData = async (newModel) => {
  if (!db.value) {
    console.log('warning', '请先初始化数据库！')
    return
  }
  try {
    const addData = {
      key: newModel.key,
      name: newModel.name,
      url: newModel.url,
      icon: newModel.icon,
    }
    // console.log(addData)
    await db.value.add('search_engines', addData)
    console.log('success', '添加成功！')
    showAddModal()
    await loadData()
  } catch (error) {
    console.error('保存搜索引擎添失败:', error)
    // showMessage('error', '保存用户失败！')
  }
}

// 查询数据
const editData = async (id) => {
  const data = await db.value.get('search_engines', id)
  editModel.id = data.id
  editModel.key = data.key
  editModel.name = data.name
  editModel.url = data.url
  editModel.icon = data.icon
  showEditModal()
}

// 更新数据
const updateData = async (editModel) => {
  try {
    const data = {
      id: editModel.id,
      key: editModel.key,
      name: editModel.name,
      url: editModel.url,
      icon: editModel.icon,
    }
    console.log(data)
    await db.value.update('search_engines', data)
    console.log('success', '书签分类添加成功！')
    showEditModal()
    await loadData()
  } catch (error) {
    console.error('书签分类添加失败:', error)
    // showMessage('error', '保存用户失败！')
  }
}

// 删除数据
const deleteData = async (id) => {
  try {
    await db.value.delete('search_engines', id)
    // showMessage('success', '用户删除成功！')
    console.log('success', '用户删除成功！')
    await loadData()
    showDelModal(0)
  } catch (error) {
    console.error('删除用户失败:', error)
    // showMessage('error', '删除用户失败！')
  }
}
// 初始化数据库
const initDB = async () => {
  try {
    db.value = new IndexedDB('UserDatabase', 1)
    await db.value.open()
    // this.$message.success('数据库初始化成功！');
  } catch (error) {
    console.error('数据库初始化失败:', error)
    // this.$message.error('数据库初始化失败！');
  }
}
// 生命周期
onBeforeMount(async () => {
  await initDB()
  await loadData()
})
</script>

<template>
  <section class="admin-section" :class="{ active: currentIndex === 0 }" id="search-engines">
    <!--      <h2 class="section-title">搜索引擎管理</h2>-->

    <button class="add-btn" @click="showAddModal" id="add-engine-btn">
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
        <tr v-for="d in modelData" :key="d.id">
          <td>{{ d.key }}</td>
          <td>{{ d.name }}</td>
          <td style="text-wrap: nowrap; overflow: hidden">{{ d.url }}</td>
          <td><i :class="d.icon"></i></td>
          <td>
            <button class="action-btn edit" @click="editData(d.id)">
              <i class="fas fa-edit"></i> 编辑
            </button>
            <button class="action-btn delete" @click="showDelModal(d.id)">
              <i class="fas fa-trash"></i> 删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- 添加搜索引擎模态框 -->
  <add-search-engine-modal
    @addData="addData"
    @close-modal="showAddModal"
    :className="{ active: currentIndex === 0 && addModalStatus }"
    :newModel="newModel"
  ></add-search-engine-modal>

  <!-- 编辑搜索引擎模态框 -->
  <edit-search-engine-modal
    :editModel="editModel"
    @updateData="updateData"
    @closeModal="showEditModal"
    :className="{ active: currentIndex === 0 && editModalStatus }"
  ></edit-search-engine-modal>

  <DeleteModal
    :currentId="currentId"
    :delModalStatus="delModalStatus"
    @showDelModal="showDelModal"
    @deleteData="deleteData"
  >
  </DeleteModal>
</template>

<style scoped></style>
