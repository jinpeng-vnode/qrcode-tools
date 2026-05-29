<script setup lang="ts">
import QRGenerator from './QRGenerator.vue'
defineProps<{ title: string; description: string; defaultType?: string }>()
</script>

<template>
  <section class="seo-hero">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
  <QRGenerator :default-type="defaultType" />
  <slot />
</template>

<style scoped>
.seo-hero { text-align: center; margin-bottom: 40px; }
.seo-hero h1 { font-size: 2rem; margin-bottom: 8px; }
.seo-hero p { color: var(--text-muted); max-width: 640px; margin: 0 auto; }
</style>
