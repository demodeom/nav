<script setup>
</script>

<template>
  <header>
    <h1 class="logo">个性化导航</h1>
    <h1 class="logo">TECH NAVIGATOR</h1>
    <p class="tagline">高效上网入口 · 个性化导航体验</p>
  </header>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
  position: relative;
}

.logo {
  font-size: 3.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #00dbde, #fc00ff, #00dbde);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(92, 107, 192, 0.7);
  letter-spacing: 2px;
  animation: glow 3s ease-in-out infinite alternate;
}

.tagline {
  font-size: 1.4rem;
  opacity: 0.9;
  letter-spacing: 1.5px;
  margin-top: 10px;
  background: rgba(20, 25, 50, 0.5);
  display: inline-block;
  padding: 10px 25px;
  border-radius: 30px;
  border: 1px solid rgba(92, 107, 192, 0.3);
  backdrop-filter: blur(5px);
}
@media (max-width: 992px) {
  .logo {
    font-size: 3rem;
  }
}
</style>
