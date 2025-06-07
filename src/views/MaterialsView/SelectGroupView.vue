<template>
  <Layout>
    <Router-Link to="/single-select" class="link-item mb-15" exact-active-class="link-item-active"
      >单选题</Router-Link
    >
    <Router-Link to="/multi-select" class="link-item mb-15" exact-active-class="link-item-active"
      >多选题</Router-Link
    >
    <Router-Link to="/option-select" class="link-item mb-15" exact-active-class="link-item-active"
      >下拉选择题</Router-Link
    >
    <Router-Link
      to="/single-pic-select"
      class="link-item mb-15"
      exact-active-class="link-item-active"
      >图片单选题</Router-Link
    >
    <Router-Link
      to="/multi-pic-select"
      class="link-item mb-15"
      exact-active-class="link-item-active"
      >图片多选题</Router-Link
    >
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue'
</script>
