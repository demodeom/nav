<script setup>
import SiteItem from '@/components/Category/SiteItem.vue'

const props = defineProps({
  category:{
    type: Object,
    default: () => {
      return {
        "icon": "",
        "name": "",
        "sites": [],
        "desc": "",
      }
    }
  }
})

</script>

<template>

  <div class="category-card">
    <div class="category-header">
      <div class="category-icon">
        <i :class="category.icon"></i>
      </div>
      <h3 class="category-title">{{ category.name }}</h3>
    </div>
    <div class="sites-container">
      <div class="sites-row">
        <site-item
          v-for="site in category.sites"
          :url="site.url"
          :icon="site.icon"
          :desc="site.desc"
          :name="site.name"
        ></site-item>
      </div>
    </div>
  </div>

</template>

<style scoped></style>
