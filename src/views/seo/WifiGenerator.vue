<script setup lang="ts">
import SeoPage from '../../components/SeoPage.vue'
</script>

<template>
  <SeoPage title="WiFi QR Code Generator" description="Create a QR code for your WiFi network. Guests can scan to connect instantly without typing the password." default-type="wifi">
    <section class="seo-content card">
      <h2>How WiFi QR Codes Work</h2>
      <p>A WiFi QR code encodes your network name (SSID), password, and encryption type. When someone scans it with their phone camera, they automatically connect to your WiFi network.</p>
      <h3>Perfect For</h3>
      <ul>
        <li>Restaurants and cafes sharing guest WiFi</li>
        <li>Hotels and Airbnb properties</li>
        <li>Office visitor networks</li>
        <li>Home networks for guests</li>
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
