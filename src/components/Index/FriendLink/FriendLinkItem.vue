<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a class="friend-link" :href="url" target="_blank">
    <i :class="icon"></i>
    {{ name }}
  </a>
</template>

<style scoped>
.friend-link {
  background: rgba(30, 35, 70, 0.6);
  padding: 10px 25px;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: 1px solid rgba(92, 107, 192, 0.3);
  color: #c0c0ff;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.friend-link:hover {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(92, 107, 192, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.friend-link i {
  font-size: 0.9rem;
}
</style>
