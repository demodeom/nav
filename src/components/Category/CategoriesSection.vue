<script setup>
import CategoryCardItem from '@/components/Category/CategoryCardItem.vue'

const props = defineProps({
  categories: {},
})
</script>

<template>
  <section class="categories-section">
    <h2 class="section-title">网站分类</h2>
    <div class="categories-container" id="categoriesContainer">
      <CategoryCardItem v-for="category in categories" :category="category"></CategoryCardItem>
    </div>
  </section>
</template>

<style scoped></style>
