<script setup>
import CategoryCardItem from '@/components/Index/Category/CategoryCardItem.vue'

const props = defineProps({
  categories: {},
})
</script>

<template>
  <section class="categories-section">
    <!--    <h2 class="section-title">网站分类</h2>-->
    <div class="categories-container" id="categoriesContainer">
      <CategoryCardItem v-for="category in categories" :category="category"></CategoryCardItem>
    </div>
  </section>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }
}


</style>
