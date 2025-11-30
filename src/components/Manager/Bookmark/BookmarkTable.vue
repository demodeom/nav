<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import IndexedDB from '@/utils/indexedDB.js'
import AddBookmarkModal from '@/components/Manager/Bookmark/AddBookmarkModal.vue'
import EditBookmarkModal from '@/components/Manager/Bookmark/EditBookmarkModal.vue'
import DeleteModal from '@/components/Manager/DeleteModal.vue'

const props = defineProps({
  currentIndex: Number,
})
const tableName = 'bookmarks'
const db = ref(null)
const modelData = ref([])
const newModel = reactive({
  id: 0,
  key: '',
  categoryKey: "",
  name: '',
  url: '',
  icon: '',
  desc: ""
})
const editModel = reactive({})
const currentId = ref(0)
const categoryModelData = ref([])

// 添加模态框
const addModalStatus = ref(false)
const showAddModal = async () => {
  if (!addModalStatus.value) {
    await loadCategoryData()
  }
  addModalStatus.value = !addModalStatus.value
  console.log(addModalStatus.value)
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

const loadCategoryData = async () => {
  try {
    categoryModelData.value = await db.value.getAll("categories")
    console.log(categoryModelData)
  } catch (error) {
    console.error('加载用户失败:', error)
    // showMessage('error', '加载用户失败！')
  } finally {
    // console.log(searchEngines.value)
    // console.log(searchEngines.value)
    // loading.value = false
  }
}

const loadData = async () => {
  try {
    const data = await db.value.getAll(tableName)
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
      categoryKey: newModel.categoryKey,
      name: newModel.name,
      url: newModel.url,
      icon: newModel.icon,
      desc: newModel.desc,
    }
    // console.log(addData)
    await db.value.add(tableName, addData)
    console.log('success', '添加成功！')
    await loadData()
    await showAddModal()

  } catch (error) {
    console.error('保存搜索引擎添失败:', error)
    // showMessage('error', '保存用户失败！')
  }
}

// 查询数据
const editData = async (id) => {
  const data = await db.value.get(tableName, id)
  editModel.id = data.id
  editModel.key = data.key
  editModel.categoryKey = data.categoryKey
  editModel.desc = data.desc
  editModel.name = data.name
  editModel.icon = data.icon
  editModel.url = data.url
  console.log(editModel)
  await loadCategoryData()
  console.log(categoryModelData.value)
  showEditModal()
}

// 更新数据
const updateData = async (editModel) => {
  try {
    const data = {
      id: editModel.id,
      key: editModel.key,
      name: editModel.name,
      icon: editModel.icon,
      url: editModel.url,
      desc: editModel.desc,
      categoryKey: editModel.categoryKey,
    }
    console.log(data)
    await db.value.update(tableName, data)
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
    await db.value.delete(tableName, id)
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
<!--  书签管理-->
  <section class="admin-section" :class="{ active: currentIndex === 2 }" id="bookmarks">
    <!--      <h2 class="section-title">书签管理</h2>-->

    <button class="add-btn" @click="showAddModal" id="add-bookmark-btn">
      <i class="fas fa-plus"></i> 添加书签
    </button>

    <table class="data-table">
      <thead>
        <tr>
          <!--            <th>序号</th>-->
          <th>名称</th>
          <th>URL</th>
          <!--            <th>图标</th>-->
          <th>分类</th>
          <!--            <th>描述</th>-->
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="bookmarks-list">
        <!-- 书签列表将通过JS动态生成 -->

          <tr v-for="d in modelData" >
            <!--              <td>{{ indexCategory }}- {{ siteIndex }}</td>-->
            <td>{{ d.name }}</td>
            <td>{{ d.url }}</td>
            <!--              <td><i :class="site.icon"></i></td>-->
            <td>{{ d.categoryKey }}</td>
            <!--              <td>{{ site.desc }}</td>-->
            <td>
              <button class="action-btn edit" @click="editData(d.id)">
                <i class="fas fa-edit"></i> 编辑
              </button>
              <button
                class="action-btn delete"
                @click="showDelModal(d.id)"
              >
                <i class="fas fa-trash"></i> 删除
              </button>
            </td>
          </tr>

      </tbody>
    </table>
  </section>

  <AddBookmarkModal
    @addData="addData"
    @close-modal="showAddModal"
    :className="{ active: currentIndex === 2 && addModalStatus }"
    :newModel="newModel"
    :categoryModelData="categoryModelData"
  >

  </AddBookmarkModal>

  <EditBookmarkModal
    :editModel="editModel"
    :categoryModelData="categoryModelData"
    @updateData="updateData"
    @closeModal="showEditModal"
    :className="{ active: currentIndex === 2 && editModalStatus }"
  ></EditBookmarkModal>


  <DeleteModal
    :currentId="currentId"
    :delModalStatus="delModalStatus"
    @showDelModal="showDelModal"
    @deleteData="deleteData"
  >
  </DeleteModal>

</template>

<style scoped></style>
