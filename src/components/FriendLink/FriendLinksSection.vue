<script setup>
import FriendLinkItem from '@/components/FriendLink/FriendLinkItem.vue'

const props = defineProps({
  friendLinks: {},
})
</script>

<template>
  <section class="friend-links-section">
    <div class="friend-links-container">
      <h2 class="section-title">友情链接</h2>
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

<style scoped></style>
