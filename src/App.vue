<script setup lang="ts">
import { QrCode, Menu, X } from '@lucide/vue'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const menuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink to="/" class="logo"><QrCode :size="28" /> QR Tools</RouterLink>
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="24" /><Menu v-else :size="24" />
      </button>
      <nav :class="{ open: menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Generator</RouterLink>
        <RouterLink to="/batch" @click="menuOpen = false">Batch</RouterLink>
        <RouterLink to="/free-qr-code-generator" @click="menuOpen = false">Free</RouterLink>
        <RouterLink to="/wifi-qr-code-generator" @click="menuOpen = false">WiFi</RouterLink>
      </nav>
    </div>
  </header>
  <main><RouterView /></main>
  <footer class="footer">
    <p>&copy; 2024 QR Tools. Free online QR code generator.</p>
    <nav>
      <RouterLink to="/free-qr-code-generator">Free QR Generator</RouterLink>
      <RouterLink to="/wifi-qr-code-generator">WiFi QR</RouterLink>
      <RouterLink to="/vcard-qr-code-generator">vCard QR</RouterLink>
      <RouterLink to="/email-qr-code-generator">Email QR</RouterLink>
      <RouterLink to="/url-qr-code-generator">URL QR</RouterLink>
    </nav>
  </footer>
</template>

<style scoped>
.header { background: var(--card); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1200px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 700; color: var(--text); }
.logo:hover { text-decoration: none; }
nav { display: flex; gap: 24px; }
nav a { color: var(--text-muted); font-weight: 500; }
nav a:hover, nav a.router-link-active { color: var(--primary); text-decoration: none; }
.menu-toggle { display: none; background: none; padding: 4px; }
@media (max-width: 768px) {
  .menu-toggle { display: block; }
  nav { display: none; position: absolute; top: 56px; left: 0; right: 0; background: var(--card); flex-direction: column; padding: 16px 24px; border-bottom: 1px solid var(--border); }
  nav.open { display: flex; }
}
.footer { max-width: 1200px; margin: 60px auto 0; padding: 24px; text-align: center; color: var(--text-muted); font-size: 14px; }
.footer nav { justify-content: center; flex-wrap: wrap; gap: 16px; margin-top: 12px; display: flex; }
.footer nav a { color: var(--text-muted); font-size: 13px; }
main { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
</style>
