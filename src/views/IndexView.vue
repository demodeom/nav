<script setup>
import { reactive, ref } from 'vue'

import CategoriesSection from '@/components/Index/Category/CategoriesSection.vue'
import FriendLinksSection from '@/components/Index/FriendLink/FriendLinksSection.vue'
import Footer from '@/components/Footer.vue'
import SearchSection from '@/components/Index/Search/SearchSection.vue'

import searchEnginesData from '@/../data/searchEngines.json'
import categoriesData from '@/../data/categories.json'
import friendLinksData from '@/../data/friendLinks.json'
import Header from '@/components/Index/Header.vue'

const searchEngines = ref(searchEnginesData)
const categories = ref(categoriesData)
const friendLinks = ref(friendLinksData)
</script>

<template>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>

  <div class="container">
    <!--    <Header></Header>-->

    <SearchSection :search-engines="searchEngines"></SearchSection>

    <CategoriesSection :categories="categories" />

    <FriendLinksSection :friendLinks="friendLinks" />

    <Footer />
  </div>
</template>

<style scoped>


.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
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



</style>
