<script setup lang="ts">
import QRGenerator from '../components/QRGenerator.vue'
</script>

<template>
  <section class="hero">
    <h1>Free QR Code Generator</h1>
    <p>Create QR codes for URLs, text, WiFi, business cards, and email. Customize colors, add your logo, and download in PNG or SVG.</p>
  </section>
  <QRGenerator />
</template>

<style scoped>
.hero { text-align: center; margin-bottom: 40px; }
.hero h1 { font-size: 2rem; margin-bottom: 8px; }
.hero p { color: var(--text-muted); max-width: 600px; margin: 0 auto; }
</style>
