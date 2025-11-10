<script setup>
// 定义 emits
const emit = defineEmits(['changeIndex'])

const handleClick = () => {
  // 传递参数给父组件
  emit('changeIndex')
}

const props = defineProps({
  name: String,
  icon: String,
  className: Object,
})
</script>

<template>
  <button :class="className" @click="handleClick" data-engine="">
    <i :class="icon"></i> {{ name }}
  </button>
</template>

<style scoped>
.engine-btn {
  background: rgba(30, 35, 70, 0.8);
  border: 1px solid rgba(92, 107, 192, 0.4);
  color: #a0a0ff;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.engine-btn:hover {
  background: rgba(60, 65, 120, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(92, 107, 192, 0.4);
}

.engine-btn.active {
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(92, 107, 192, 0.6);
}



@media (max-width: 576px) {


  .search-btn {
    width: 100%;
    padding: 18px;
  }



}
</style>
