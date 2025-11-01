<script setup>
const props = defineProps({
  name: String,
  icon: String,
})
</script>

<template>
  <button class="engine-btn active" data-engine="baidu"><i :class="icon"></i> {{ name }}</button>
</template>

<style scoped></style>
