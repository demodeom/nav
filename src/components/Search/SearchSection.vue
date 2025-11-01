<script setup>
import EngineBtnItem from '@/components/Search/EngineBtnItem.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  searchEngines: {},
})

const currentIndex = ref(0)
const currentUrl = ref('')
const searchKeyWorld = ref('')

const changeIndex = function (k, url) {
  currentIndex.value = k
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
  searchKeyWorld.value = ""
  window.open(url, '_blank')
}
</script>

<template>
  <section class="search-section">
    <div class="search-container">
      <div class="engine-selector" id="engineSelector">
        <button
          v-for="(searchEngine, k) in searchEngines"
          :class="{ 'engine-btn': true, active: currentIndex === k }"
          :data-engine="searchEngine.key"
          @click="changeIndex(k, searchEngine.url)"
        >
          <i :class="searchEngine.icon"></i> {{ searchEngine.name }}
        </button>
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

<style scoped></style>
