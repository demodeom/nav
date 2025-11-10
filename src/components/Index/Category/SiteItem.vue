<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  icon:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="site-item">
    <div class="site-icon">
      <i :class="icon"></i>
    </div>
    <div class="site-info">
      <div class="site-name">{{ name }}</div>
      <div class="site-desc">{{ desc }}</div>
    </div>
    <a :href="url" target="_blank" class="site-link"></a>
  </div>
</template>

<style scoped>
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
}

@media (max-width: 576px) {


  .site-item {
    width: 100%;
    min-width: auto;
  }
}
</style>
