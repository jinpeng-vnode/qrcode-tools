<script setup lang="ts">
import SeoPage from '../../components/SeoPage.vue'
</script>

<template>
  <SeoPage title="vCard QR Code Generator" description="Create a digital business card QR code. Share your contact information instantly when scanned." default-type="vcard">
    <section class="seo-content card">
      <h2>Digital Business Cards with QR Codes</h2>
      <p>A vCard QR code contains your contact details — name, phone, email, organization, and website. When scanned, it prompts the user to save your contact directly to their phone.</p>
      <h3>Benefits</h3>
      <ul>
        <li>Share contacts without physical business cards</li>
        <li>Always up-to-date information</li>
        <li>Eco-friendly alternative to printed cards</li>
        <li>Works with all modern smartphones</li>
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
