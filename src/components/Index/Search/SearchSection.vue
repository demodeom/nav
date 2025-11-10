<script setup>
import EngineBtnItem from '@/components/Index/Search/EngineBtnItem.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  searchEngines: {},
})

const currentIndex = ref(0)
const currentUrl = ref('')
const searchKeyWorld = ref('')

const changeIndex = function (k, url) {
  console.log(`k: ${k}, url: ${url}`)
  currentIndex.value = Number(k)
  currentUrl.value = url
}

const handleEnter = () => {
  // console.log('Enter 键被按下，输入内容:', inputText.value)
  // 执行搜索、提交等操作
  openUrl()
}

const openUrl = function () {
  if (currentUrl.value.length < 1) {
    currentUrl.value = props.searchEngines[0]['url']
  }
  console.log(currentUrl.value)
  let url = ''
  if (searchKeyWorld.value.length > 0) {
    url = currentUrl.value + searchKeyWorld.value
  } else {
    url = currentUrl.value.toString().split('?')[0]
  }
  searchKeyWorld.value = ''
  window.open(url, '_blank')
}
</script>

<template>
  <section class="search-section">
    <div class="search-container">
      <div class="engine-selector" id="engineSelector">
        <EngineBtnItem
          v-for="(searchEngine, k) in searchEngines"
          :name="searchEngine.name"
          :icon="searchEngine.icon"
          :url="searchEngine.url"
          :className="{ 'engine-btn': true, active: currentIndex === k }"
          @changeIndex="changeIndex(k, searchEngine.url)"
        ></EngineBtnItem>
      </div>

      <div class="search-box">
        <input
          type="text"
          class="search-input"
          id="searchInput"
          placeholder="输入关键词，探索知识海洋..."
          v-model="searchKeyWorld"
          @keyup.enter="handleEnter"
        />
        <button class="search-btn" id="searchBtn" @click="openUrl">
          <i class="fas fa-search"></i> 搜索
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .engine-selector {
    gap: 12px;
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

}

</style>
