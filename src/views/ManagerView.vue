<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import searchEnginesData from '@/../data/searchEngines.json'
import categoriesData from '@/../data/categories.json'
import friendLinksData from '@/../data/friendLinks.json'
import IndexedDB from '@/utils/indexedDB.js'
import AddSearchEngineModal from '@/components/Manager/SearchEngine/addSearchEngineModal.vue'
import DeleteModal from '@/components/Manager/DeleteModal.vue'
import SearchEngineTable from '@/components/Manager/SearchEngineTable.vue'
import CategoryTable from '@/components/Manager/CategoryTable.vue'
import EditSearchEngineModal from '@/components/Manager/SearchEngine/editSearchEngineModal.vue'

// 数据
const searchEngines = ref([])
const categories = ref([])
const friendLinks = ref([])

const currentModel = reactive({})

searchEngines.value = searchEnginesData
categories.value = categoriesData
friendLinks.value = friendLinksData

// 选项卡
const currentIndex = ref(0)
const changeIndex = (val) => {
  currentIndex.value = val
}

// 添加模态框
const addModalStatus = ref(false)
const showAddModal = () => {
  addModalStatus.value = !addModalStatus.value
}

// 编辑模态框
const editModalStatus = ref(false)
const showEditModal = async (id) => {
  currentDataIndex.value = id

  switch (currentIndex.value) {
    case 0:
      // currentModel.value = await db.value.get('search_engines', currentDataIndex.value)
      let editData = await db.value.get('search_engines', currentDataIndex.value)
      currentModel.id = editData.id
      currentModel.key = editData.key
      currentModel.name = editData.name
      currentModel.url = editData.url
      currentModel.icon = editData.icon

      console.log(currentModel.value)
      break
    case 1:
      break
    case 2:
      break
    case 3:
      break
    default:
      console.log(currentDataIndex)
      break
  }

  editModalStatus.value = !editModalStatus.value
}

const closeEditModal = () => {
  editModalStatus.value = !editModalStatus.value

}

// 删除模态框
const currentDataIndex = ref(0)
const delModalStatus = ref(false)
const showDelModal = (dataIndex) => {
  console.log(dataIndex)
  currentDataIndex.value = dataIndex
  delModalStatus.value = !delModalStatus.value
}

// 删除数据
const deleteData = () => {
  // console.log(delDataIndex.value)
  switch (currentIndex.value) {
    case 0:
      deleteSearchEngine(currentDataIndex.value)
      break
    case 1:
      categories.value.splice(currentDataIndex.value, 1)
      break
    case 2:
      let indexArr = currentDataIndex.value.split('-')
      let categoryIndex = Number(indexArr[0])
      let siteIndex = Number(indexArr[1])
      categories.value[categoryIndex].sites.splice(siteIndex, 1)
      break
    case 3:
      friendLinks.value.splice(currentDataIndex.value, 1)
      break
    default:
      console.log(currentDataIndex)
      break
  }
  showDelModal()
}

const loading = ref(true)
const db = ref(null)

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
onMounted(async () => {
  await initDB()
  await loadSearchEngines()
})

onUnmounted(() => {
  if (db.value) {
    db.value.close()
  }
})

const newSearchEngine = reactive({
  id: 0,
  key: 'bing',
  name: '必应',
  url: 'https://www.bing.com/search?q=',
  icon: 'fab fa-microsoft',
})

const loadSearchEngines = async () => {
  if (!db.value) return
  loading.value = true
  try {
    searchEngines.value = await db.value.getAll('search_engines')
  } catch (error) {
    console.error('加载用户失败:', error)
    // showMessage('error', '加载用户失败！')
  } finally {
    console.log(searchEngines.value)
    loading.value = false
  }
}

// 保存用户（添加或更新）
const saveSearchEngine = async (newSearchEngine) => {
  if (!db.value) {
    console.log('warning', '请先初始化数据库！')
    return
  }
  try {
    const userData = {
      key: newSearchEngine.key,
      name: newSearchEngine.name,
      url: newSearchEngine.url,
      icon: newSearchEngine.icon,
    }
    console.log(userData)
    await db.value.add('search_engines', userData)
    console.log('success', '搜索引擎添加成功！')
    showAddModal()
    await loadSearchEngines()
  } catch (error) {
    console.error('保存搜索引擎添失败:', error)
    // showMessage('error', '保存用户失败！')
  }
}

// 删除用户
const deleteSearchEngine = async (id) => {
  try {
    await db.value.delete('search_engines', id)
    // showMessage('success', '用户删除成功！')
    console.log('success', '用户删除成功！')
    await loadSearchEngines()
  } catch (error) {
    console.error('删除用户失败:', error)
    // showMessage('error', '删除用户失败！')
  }
}
</script>

<template>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>

  <div class="container">
    <header>
      <!--      <h1 class="logo">TECH NAVIGATOR</h1>-->
      <h1 class="logo">管理后台 · 个性化导航配置</h1>
      <!--      <p class="tagline">管理后台 · 个性化导航配置</p>-->
    </header>

    <div class="admin-nav">
      <button
        class="nav-btn"
        :class="{ active: currentIndex === 0 }"
        @click="changeIndex(0)"
        data-section="search-engines"
      >
        <i class="fas fa-search"></i> 搜索引擎管理
      </button>
      <button
        class="nav-btn"
        :class="{ active: currentIndex === 1 }"
        @click="changeIndex(1)"
        data-section="categories"
      >
        <i class="fas fa-folder"></i> 书签分类管理
      </button>
      <button
        class="nav-btn"
        :class="{ active: currentIndex === 2 }"
        @click="changeIndex(2)"
        data-section="bookmarks"
      >
        <i class="fas fa-bookmark"></i> 书签管理
      </button>
      <button
        class="nav-btn"
        :class="{ active: currentIndex === 3 }"
        @click="changeIndex(3)"
        data-section="friend-links"
      >
        <i class="fas fa-link"></i> 友情链接管理
      </button>
    </div>

    <!-- 搜索引擎管理 -->
    <SearchEngineTable
      :currentIndex="currentIndex"
      :searchEngines="searchEngines"
      @showDelModal="showDelModal"
      @showAddModal="showAddModal"
      @showEditModal="showEditModal"
    ></SearchEngineTable>
    <!-- 书签分类管理 -->
    <CategoryTable
      :currentIndex="currentIndex"
      :categories="categories"
      @showDelModal="showDelModal"
      @showAddModal="showAddModal"
    >
    </CategoryTable>

    <!-- 书签管理 -->
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
          <template v-for="(category, indexCategory) in categories">
            <tr v-for="(site, siteIndex) in category.sites" :key="`${indexCategory}-${siteIndex}`">
              <!--              <td>{{ indexCategory }}- {{ siteIndex }}</td>-->
              <td>{{ site.name }}</td>
              <td>{{ site.url }}</td>
              <!--              <td><i :class="site.icon"></i></td>-->
              <td>{{ category.name }}</td>
              <!--              <td>{{ site.desc }}</td>-->
              <td>
                <button class="action-btn edit" @click="showAddModal()">
                  <i class="fas fa-edit"></i> 编辑
                </button>
                <button
                  class="action-btn delete"
                  @click="showDelModal(`${indexCategory}-${siteIndex}`)"
                >
                  <i class="fas fa-trash"></i> 删除
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>

    <!-- 友情链接管理 -->
    <section class="admin-section" :class="{ active: currentIndex === 3 }" id="friend-links">
      <!--      <h2 class="section-title">友情链接管理</h2>-->

      <button class="add-btn" @click="showAddModal" id="add-friend-link-btn">
        <i class="fas fa-plus"></i> 添加友情链接
      </button>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>URL</th>
            <th>图标</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="friend-links-list">
          <tr v-for="(friend, index) in friendLinks" :key="index">
            <td>{{ index }}</td>
            <td>{{ friend.name }}</td>
            <td>{{ friend.url }}</td>
            <td><i :class="friend.icon"></i></td>
            <td>
              <button class="action-btn edit" @click="showAddModal()">
                <i class="fas fa-edit"></i> 编辑
              </button>
              <button class="action-btn delete" @click="showDelModal(index)">
                <i class="fas fa-trash"></i> 删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer>
      <p>科技导航管理后台 © 2023 | 高效 · 简洁 · 个性化</p>
    </footer>
  </div>

  <!-- 添加搜索引擎模态框 -->
  <add-search-engine-modal
    @save-search-engine="saveSearchEngine"
    @close-modal="showAddModal"
    @load-search-engines="loadSearchEngines"
    :className="{ active: currentIndex === 0 && addModalStatus }"
    :newSearchEngine="newSearchEngine"
  ></add-search-engine-modal>

  <!-- 编辑搜索引擎模态框 -->
  <edit-search-engine-modal
    :newSearchEngine="currentModel"
    @save-search-engine="saveSearchEngine"
    @close-modal="closeEditModal"
    @load-search-engines="loadSearchEngines"
    :className="{ active: currentIndex === 0 && editModalStatus }"
  ></edit-search-engine-modal>

  <!-- 分类模态框 -->
  <div class="modal" :class="{ active: currentIndex === 1 && addModalStatus }" id="category-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="category-modal-title">添加分类</h3>
        <button class="close-btn" @click="showAddModal" id="close-category-modal">&times;</button>
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
            required
          />
        </div>
        <button type="submit" class="submit-btn"><i class="fas fa-save"></i> 保存分类</button>
      </form>
    </div>
  </div>

  <!-- 书签模态框 -->
  <div class="modal" :class="{ active: currentIndex === 2 && addModalStatus }" id="bookmark-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="bookmark-modal-title">添加书签</h3>
        <button class="close-btn" @click="showAddModal" id="close-bookmark-modal">&times;</button>
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
            />
          </div>
          <div class="form-group">
            <label class="form-label">URL</label>
            <input
              type="text"
              class="form-input"
              id="bookmark-url"
              placeholder="例如：https://github.com"
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
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">所属分类</label>
            <select class="form-input" id="bookmark-category" required>
              <option value="">请选择分类</option>
              <!-- 分类选项将通过JS动态生成 -->
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
            required
          />
        </div>
        <button type="submit" class="submit-btn"><i class="fas fa-save"></i> 保存书签</button>
      </form>
    </div>
  </div>

  <!-- 友情链接模态框 -->
  <div
    class="modal"
    :class="{ active: currentIndex === 3 && addModalStatus }"
    id="friend-link-modal"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="friend-link-modal-title">添加友情链接</h3>
        <button class="close-btn" @click="showAddModal" id="close-friend-link-modal">
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
            />
          </div>
          <div class="form-group">
            <label class="form-label">URL</label>
            <input
              type="text"
              class="form-input"
              id="friend-link-url"
              placeholder="例如：https://example.com"
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
            required
          />
        </div>
        <button type="submit" class="submit-btn"><i class="fas fa-save"></i> 保存友情链接</button>
      </form>
    </div>
  </div>

  <!-- 删除确认模态框 -->
  <delete-modal
    :del-modal-status="delModalStatus"
    @show-del-modal="showDelModal"
    @delete-data="deleteData"
  ></delete-modal>
</template>

<style>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
  position: relative;
}

.logo {
  font-size: 3.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #00dbde, #fc00ff, #00dbde);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(92, 107, 192, 0.7);
  letter-spacing: 2px;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px rgba(92, 107, 192, 0.5);
  }
  to {
    text-shadow:
      0 0 25px rgba(92, 107, 192, 0.8),
      0 0 40px rgba(0, 219, 222, 0.6);
  }
}

.tagline {
  font-size: 1.4rem;
  opacity: 0.9;
  letter-spacing: 1.5px;
  margin-top: 10px;
  background: rgba(20, 25, 50, 0.5);
  display: inline-block;
  padding: 10px 25px;
  border-radius: 30px;
  border: 1px solid rgba(92, 107, 192, 0.3);
  backdrop-filter: blur(5px);
}

.admin-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.nav-btn {
  background: rgba(30, 35, 70, 0.8);
  border: 1px solid rgba(92, 107, 192, 0.4);
  color: #a0a0ff;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.nav-btn:hover {
  background: rgba(60, 65, 120, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(92, 107, 192, 0.4);
}

.nav-btn.active {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(92, 107, 192, 0.6);
}

.section-title {
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 25px;
  font-weight: 700;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00dbde, #fc00ff, transparent);
  border-radius: 2px;
}

.admin-section {
  background: rgba(20, 25, 50, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 40px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(92, 107, 192, 0.3);
  position: relative;
  overflow: hidden;
  display: none;
}

.admin-section.active {
  display: block;
}

.admin-section::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00dbde, #fc00ff, #00dbde, #fc00ff);
  z-index: -1;
  border-radius: 22px;
  animation: borderAnimation 6s linear infinite;
  background-size: 300% 300%;
}

@keyframes borderAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(92, 107, 192, 0.3);
}

.data-table th {
  background: rgba(35, 40, 75, 0.8);
  color: #00dbde;
  font-weight: 600;
}

.data-table tr:hover {
  background: rgba(45, 50, 95, 0.5);
}

.action-btn {
  background: rgba(30, 35, 70, 0.8);
  border: 1px solid rgba(92, 107, 192, 0.4);
  color: #a0a0ff;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-right: 8px;
}

.action-btn:hover {
  background: rgba(60, 65, 120, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(92, 107, 192, 0.4);
}

.action-btn.edit {
  background: linear-gradient(90deg, #00dbde, #00a2ff);
  color: white;
}

.action-btn.delete {
  background: linear-gradient(90deg, #fc00ff, #ff0066);
  color: white;
}

.add-btn {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.add-btn:hover {
  opacity: 0.9;
  letter-spacing: 1.5px;
  background: linear-gradient(90deg, #fc00ff, #00dbde);
}

/* 模态框样式 */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 15, 30, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal.active {
  display: flex;
}

.modal-content {
  background: rgba(20, 25, 50, 0.95);
  border-radius: 20px;
  padding: 35px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(92, 107, 192, 0.4);
  position: relative;
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(92, 107, 192, 0.3);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.close-btn {
  background: none;
  border: none;
  color: #a0a0ff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #fc00ff;
  transform: rotate(90deg);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #a0a0ff;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  background: rgba(10, 15, 30, 0.85);
  border: 1px solid rgba(92, 107, 192, 0.4);
  color: #e0e0ff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #00dbde;
  box-shadow: 0 0 10px rgba(0, 219, 222, 0.5);
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.submit-btn {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
}

.submit-btn:hover {
  opacity: 0.9;
  letter-spacing: 1.5px;
  background: linear-gradient(90deg, #fc00ff, #00dbde);
}

/* 删除确认模态框 */
.delete-modal .modal-content {
  max-width: 450px;
  text-align: center;
}

.delete-icon {
  font-size: 4rem;
  color: #ff0066;
  margin-bottom: 20px;
}

.delete-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #fff;
}

.delete-text {
  margin-bottom: 25px;
  color: #d0d0ff;
  line-height: 1.5;
}

.delete-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.cancel-btn {
  background: rgba(30, 35, 70, 0.8);
  border: 1px solid rgba(92, 107, 192, 0.4);
  color: #a0a0ff;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  flex: 1;
}

.cancel-btn:hover {
  background: rgba(60, 65, 120, 0.9);
}

.confirm-delete-btn {
  background: linear-gradient(90deg, #fc00ff, #ff0066);
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  flex: 1;
}

.confirm-delete-btn:hover {
  opacity: 0.9;
  letter-spacing: 1px;
}

.glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 219, 222, 0.4) 0%, transparent 70%);
  filter: blur(60px);
  z-index: -1;
  animation: glowMove 12s linear infinite alternate;
}

.glow-1 {
  top: 10%;
  left: 5%;
}

.glow-2 {
  bottom: 10%;
  right: 5%;
  background: radial-gradient(circle, rgba(252, 0, 255, 0.4) 0%, transparent 70%);
  animation-delay: -4s;
}

@keyframes glowMove {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, 30px);
  }
  50% {
    transform: translate(-20px, 10px);
  }
  75% {
    transform: translate(10px, -20px);
  }
  100% {
    transform: translate(-30px, 20px);
  }
}

footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 992px) {
  .logo {
    font-size: 3rem;
  }

  .data-table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .nav-btn {
    padding: 10px 18px;
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .admin-section {
    padding: 25px;
  }

  .data-table th,
  .data-table td {
    padding: 10px;
  }

  .modal-content {
    padding: 25px;
  }

  .delete-actions {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .admin-section {
    padding: 20px;
  }

  .logo {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.1rem;
    padding: 8px 15px;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }

  .modal-content {
    padding: 20px;
  }
}
</style>
