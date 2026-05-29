import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue'), meta: { title: 'QR Code Generator - Free Online QR Code Maker' } },
  { path: '/batch', component: () => import('../views/Batch.vue'), meta: { title: 'Batch QR Code Generator - Create Multiple QR Codes' } },
  // SEO落地页
  { path: '/free-qr-code-generator', component: () => import('../views/seo/FreeGenerator.vue'), meta: { title: 'Free QR Code Generator Online - No Sign Up Required' } },
  { path: '/wifi-qr-code-generator', component: () => import('../views/seo/WifiGenerator.vue'), meta: { title: 'WiFi QR Code Generator - Share WiFi Password Easily' } },
  { path: '/vcard-qr-code-generator', component: () => import('../views/seo/VcardGenerator.vue'), meta: { title: 'vCard QR Code Generator - Create Digital Business Cards' } },
  { path: '/email-qr-code-generator', component: () => import('../views/seo/EmailGenerator.vue'), meta: { title: 'Email QR Code Generator - Create Email QR Codes' } },
  { path: '/url-qr-code-generator', component: () => import('../views/seo/UrlGenerator.vue'), meta: { title: 'URL QR Code Generator - Convert Links to QR Codes' } },
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to) => { document.title = (to.meta.title as string) || 'QR Code Generator' })
export default router
