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

</style>
