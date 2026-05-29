<script setup lang="ts">
import SeoPage from '../../components/SeoPage.vue'
</script>

<template>
  <SeoPage title="URL QR Code Generator" description="Convert any URL or link into a scannable QR code. Perfect for sharing websites, social media profiles, and online resources." default-type="url">
    <section class="seo-content card">
      <h2>URL to QR Code</h2>
      <p>Turn any web address into a QR code that people can scan with their phone camera to instantly open the link.</p>
      <h3>Popular Uses</h3>
      <ul>
        <li>Marketing materials and flyers</li>
        <li>Social media profile sharing</li>
        <li>Product pages and online stores</li>
        <li>Restaurant menus and ordering pages</li>
        <li>Event registration links</li>
      </ul>
    </section>
  </SeoPage>
</template>

<style scoped>
.seo-content { margin-top: 48px; }
.seo-content h2, .seo-content h3 { margin-bottom: 12px; }
.seo-content h3 { margin-top: 20px; font-size: 1.1rem; }
.seo-content p { color: var(--text-muted); margin-bottom: 12px; }
.seo-content ul { padding-left: 20px; color: var(--text-muted); }
.seo-content li { margin-bottom: 6px; }
</style>
