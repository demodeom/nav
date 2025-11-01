<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  }
})
</script>

<template>
  <a  class="friend-link" :href="url" target="_blank">
    <i :class="icon"></i>
    {{name}}
  </a>
</template>

<style scoped></style>
