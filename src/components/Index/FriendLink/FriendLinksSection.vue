<script setup>
import FriendLinkItem from '@/components/Index/FriendLink/FriendLinkItem.vue'

const props = defineProps({
  friendLinks: {},
})
</script>

<template>
  <section class="friend-links-section">
    <div class="friend-links-container">
      <!--      <h2 class="section-title">友情链接</h2>-->
      <div class="friend-links-grid" id="friendLinksGrid">
        <FriendLinkItem
          v-for="friendLink in friendLinks"
          :name="friendLink.name"
          :icon="friendLink.icon"
          :url="friendLink.url"
        ></FriendLinkItem>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 友情链接区域 */
.friend-links-section {
  margin-top: 60px;
  padding: 30px 0;
  border-top: 1px solid rgba(92, 107, 192, 0.2);
  border-bottom: 1px solid rgba(92, 107, 192, 0.2);
}

.friend-links-container {
  max-width: 1200px;
  margin: 0 auto;
}

.friend-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .friend-links-grid {
    gap: 10px;
  }
}

@media (max-width: 576px) {
  .friend-links-grid {
    justify-content: flex-start;
  }
}


</style>
