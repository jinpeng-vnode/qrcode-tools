<script setup lang="ts">
import SeoPage from '../../components/SeoPage.vue'
</script>

<template>
  <SeoPage title="Email QR Code Generator" description="Generate QR codes that open a pre-filled email when scanned. Perfect for customer support and feedback collection." default-type="email">
    <section class="seo-content card">
      <h2>Email QR Codes</h2>
      <p>An email QR code opens the user's email app with pre-filled recipient, subject, and body text. Great for making it easy for customers to reach you.</p>
      <h3>Use Cases</h3>
      <ul>
        <li>Customer feedback and support requests</li>
        <li>Event RSVP collection</li>
        <li>Newsletter sign-up prompts</li>
        <li>Product packaging contact info</li>
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
