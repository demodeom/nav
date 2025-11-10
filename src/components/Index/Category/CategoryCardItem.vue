<script setup>
import SiteItem from '@/components/Index/Category/SiteItem.vue'

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

<style scoped>

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
@media (max-width: 768px) {


  .category-card {
    padding: 20px;
  }

  .category-title {
    font-size: 1.6rem;
  }

}

@media (max-width: 576px) {

  .sites-row {
    gap: 12px;
  }


}

</style>
