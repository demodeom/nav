<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import IndexedDB from '@/utils/indexedDB.js'
import SearchEngineTable from '@/components/Manager/SearchEngine/SearchEngineTable.vue'
import CategoryTable from '@/components/Manager/Category/CategoryTable.vue'
import BookmarkTable from '@/components/Manager/Bookmark/BookmarkTable.vue'
import FriendLinkTable from '@/components/Manager/FriendLink/FriendLinkTable.vue'
import Toolbar from '@/components/Toolbar.vue'
import Footer from '@/components/Footer.vue'

// 选项卡
const currentIndex = ref(0)
const changeIndex = (val) => {
  currentIndex.value = val
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
    ></SearchEngineTable>

    <CategoryTable
      :currentIndex="currentIndex"
    ></CategoryTable>

    <BookmarkTable
      :currentIndex="currentIndex"
    ></BookmarkTable>

    <FriendLinkTable
      :currentIndex="currentIndex">

    </FriendLinkTable>

    <!-- 浮动工具条 -->
    <Toolbar></Toolbar>

    <Footer />
  </div>




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
