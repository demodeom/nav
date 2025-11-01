<script setup>
import { reactive, ref } from 'vue'

import CategoriesSection from '@/components/Category/CategoriesSection.vue'
import FriendLinksSection from '@/components/FriendLink/FriendLinksSection.vue'
import Footer from '@/components/Footer.vue'
import SearchSection from '@/components/Search/SearchSection.vue'

import searchEnginesData from '@/../data/searchEngines.json'
import categoriesData from '@/../data/categories.json'
import friendLinksData from '@/../data/friendLinks.json'

const searchEngines = ref(searchEnginesData)
const categories = ref(categoriesData)
const friendLinks = ref(friendLinksData)

</script>

<template>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>

  <div class="container">
    <!--    <header>-->
    <!--      <h1 class="logo">TECH NAVIGATOR</h1>-->
    <!--      <p class="tagline">高效上网入口 · 个性化导航体验</p>-->
    <!--    </header>-->

    <SearchSection :search-engines="searchEngines"></SearchSection>

    <!--    <section class="search-section">-->
    <!--      <div class="search-container">-->
    <!--        <div class="engine-selector" id="engineSelector">-->
    <!--          <button class="engine-btn active" data-engine="baidu">-->
    <!--            <i class="fab fa-baidu"></i> 百度-->
    <!--          </button>-->
    <!--          <button class="engine-btn" data-engine="bing">-->
    <!--            <i class="fab fa-microsoft"></i> 必应-->
    <!--          </button>-->
    <!--          <button class="engine-btn" data-engine="google">-->
    <!--            <i class="fab fa-google"></i> 谷歌-->
    <!--          </button>-->
    <!--          <button class="engine-btn" data-engine="sogou"><i class="fas fa-search"></i> 搜狗</button>-->
    <!--          <button class="engine-btn" data-engine="duckduckgo">-->
    <!--            <i class="fas fa-duck"></i> DuckDuckGo-->
    <!--          </button>-->
    <!--        </div>-->

    <!--        <div class="search-box">-->
    <!--          <input-->
    <!--            type="text"-->
    <!--            class="search-input"-->
    <!--            id="searchInput"-->
    <!--            placeholder="输入关键词，探索知识海洋..."-->
    <!--          />-->
    <!--          <button class="search-btn" id="searchBtn"><i class="fas fa-search"></i> 搜索</button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <CategoriesSection :categories="categories" />

    <FriendLinksSection :friendLinks="friendLinks" />

    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

body {
  background: linear-gradient(135deg, #0c1029, #161a40, #1c1e3e);
  color: #e0e0ff;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 10% 20%, rgba(80, 60, 255, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(0, 195, 255, 0.15) 0%, transparent 40%);
  z-index: -1;
}

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

.search-section {
  background: rgba(20, 25, 50, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 40px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(92, 107, 192, 0.3);
  position: relative;
  overflow: hidden;
}

.search-section::before {
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

.search-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.engine-selector {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.engine-btn {
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

.engine-btn:hover {
  background: rgba(60, 65, 120, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(92, 107, 192, 0.4);
}

.engine-btn.active {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(92, 107, 192, 0.6);
}

.search-box {
  display: flex;
  height: 70px;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.search-input {
  flex: 1;
  padding: 0 30px;
  font-size: 1.2rem;
  background: rgba(10, 15, 30, 0.85);
  border: none;
  color: #e0e0ff;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(15, 20, 40, 0.95);
  box-shadow: inset 0 0 15px rgba(92, 107, 192, 0.3);
}

.search-input::placeholder {
  color: #8888cc;
}

.search-btn {
  width: 140px;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.search-btn:hover {
  opacity: 0.9;
  letter-spacing: 1.5px;
  background: linear-gradient(90deg, #fc00ff, #00dbde);
}

.categories-section {
  margin-top: 50px;
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

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.category-card {
  background: rgba(25, 30, 60, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 25px;
  transition: all 0.3s ease;
  border: 1px solid rgba(92, 107, 192, 0.25);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(92, 107, 192, 0.6);
  background: rgba(30, 35, 70, 0.85);
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(92, 107, 192, 0.3);
}

.category-icon {
  width: 50px;
  height: 50px;
  background: rgba(35, 40, 75, 0.9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #00dbde;
  border: 1px solid rgba(92, 107, 192, 0.4);
  margin-right: 15px;
  transition: all 0.3s ease;
}

.category-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sites-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sites-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.site-item {
  background: rgba(35, 40, 75, 0.8);
  border-radius: 12px;
  padding: 15px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  width: calc(25% - 15px);
  min-width: 240px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(92, 107, 192, 0.2);
}

.site-item:hover {
  background: rgba(45, 50, 95, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(92, 107, 192, 0.5);
}

.site-icon {
  width: 40px;
  height: 40px;
  background: rgba(45, 50, 95, 0.9);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #00dbde;
  border: 1px solid rgba(92, 107, 192, 0.3);
  margin-right: 15px;
  flex-shrink: 0;
}

.site-info {
  flex: 1;
  overflow: hidden;
}

.site-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-desc {
  font-size: 0.85rem;
  opacity: 0.8;
  color: #d0d0ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* 友情链接区域 */
.friend-links-section {
  margin-top: 60px;
  padding: 30px 0;
  border-top: 1px solid rgba(92, 107, 192, 0.2);
  border-bottom: 1px solid rgba(92, 107, 192, 0.2);
}

.friend-links-container {
  max-width: 1200px;
  margin: 0 auto;
}

.friend-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.friend-link {
  background: rgba(30, 35, 70, 0.6);
  padding: 10px 25px;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: 1px solid rgba(92, 107, 192, 0.3);
  color: #c0c0ff;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.friend-link:hover {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(92, 107, 192, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.friend-link i {
  font-size: 0.9rem;
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
  .site-item {
    width: calc(33.333% - 15px);
  }
}

@media (max-width: 992px) {
  .site-item {
    width: calc(50% - 15px);
  }

  .logo {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .engine-selector {
    gap: 12px;
  }

  .engine-btn {
    padding: 10px 18px;
    font-size: 1rem;
  }

  .search-box {
    height: 60px;
  }

  .search-input {
    padding: 0 20px;
    font-size: 1.1rem;
  }

  .search-btn {
    width: 120px;
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .category-card {
    padding: 20px;
  }

  .category-title {
    font-size: 1.6rem;
  }

  .friend-links-grid {
    gap: 10px;
  }

  .friend-link {
    padding: 8px 18px;
    font-size: 0.95rem;
  }
}

@media (max-width: 576px) {
  .search-section {
    padding: 25px 20px;
  }

  .search-box {
    flex-direction: column;
    height: auto;
    border-radius: 18px;
  }

  .search-input {
    padding: 18px;
  }

  .search-btn {
    width: 100%;
    padding: 18px;
  }

  .site-item {
    width: 100%;
    min-width: auto;
  }

  .logo {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.1rem;
    padding: 8px 15px;
  }

  .sites-row {
    gap: 12px;
  }

  .friend-links-grid {
    justify-content: flex-start;
  }
}
</style>
