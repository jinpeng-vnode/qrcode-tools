<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import QRCode from 'qrcode'
import { Download, Image, Palette, Upload } from '@lucide/vue'

const props = defineProps<{ defaultType?: string }>()

type QRType = 'url' | 'text' | 'wifi' | 'vcard' | 'email'
const qrType = ref<QRType>((props.defaultType as QRType) || 'url')

// 表单数据
const url = ref('https://example.com')
const text = ref('')
const wifi = ref({ ssid: '', password: '', encryption: 'WPA' })
const vcard = ref({ name: '', phone: '', email: '', org: '', url: '' })
const email = ref({ to: '', subject: '', body: '' })

// 样式选项
const fgColor = ref('#000000')
const bgColor = ref('#ffffff')
const logoFile = ref<string | null>(null)
const logoSize = ref(40)

// 输出
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const qrDataUrl = ref('')

const qrContent = computed(() => {
  switch (qrType.value) {
    case 'url': return url.value
    case 'text': return text.value
    case 'wifi': return `WIFI:T:${wifi.value.encryption};S:${wifi.value.ssid};P:${wifi.value.password};;`
    case 'vcard': return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcard.value.name}\nTEL:${vcard.value.phone}\nEMAIL:${vcard.value.email}\nORG:${vcard.value.org}\nURL:${vcard.value.url}\nEND:VCARD`
    case 'email': return `mailto:${email.value.to}?subject=${encodeURIComponent(email.value.subject)}&body=${encodeURIComponent(email.value.body)}`
  }
})

async function generateQR() {
  if (!qrContent.value) return
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, qrContent.value, {
    width: 300, margin: 2,
    color: { dark: fgColor.value, light: bgColor.value }
  })
  // 叠加Logo
  if (logoFile.value) {
    const ctx = canvas.getContext('2d')!
    const img = new window.Image()
    img.src = logoFile.value
    await new Promise(r => { img.onload = r })
    const s = logoSize.value
    const x = (canvas.width - s) / 2
    ctx.fillStyle = bgColor.value
    ctx.fillRect(x - 4, x - 4, s + 8, s + 8)
    ctx.drawImage(img, x, x, s, s)
  }
  qrDataUrl.value = canvas.toDataURL('image/png')
  qrCanvas.value = canvas
}

function handleLogo(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { logoFile.value = reader.result as string }
  reader.readAsDataURL(file)
}

function downloadPNG() {
  if (!qrDataUrl.value) return
  const a = document.createElement('a')
  a.href = qrDataUrl.value
  a.download = 'qrcode.png'
  a.click()
}

async function downloadSVG() {
  if (!qrContent.value) return
  const svg = await QRCode.toString(qrContent.value, {
    type: 'svg', color: { dark: fgColor.value, light: bgColor.value }, margin: 2
  })
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'qrcode.svg'
  a.click()
}

watch([qrContent, fgColor, bgColor, logoFile, logoSize], generateQR, { immediate: true })

const types: { key: QRType; label: string }[] = [
  { key: 'url', label: 'URL' },
  { key: 'text', label: 'Text' },
  { key: 'wifi', label: 'WiFi' },
  { key: 'vcard', label: 'vCard' },
  { key: 'email', label: 'Email' },
]
</script>

<template>
  <div class="generator">
    <div class="left">
      <!-- 类型选择 -->
      <div class="type-tabs">
        <button v-for="t in types" :key="t.key" :class="{ active: qrType === t.key }" @click="qrType = t.key">{{ t.label }}</button>
      </div>

      <!-- 表单 -->
      <div class="form card">
        <div v-if="qrType === 'url'">
          <label>URL</label>
          <input v-model="url" placeholder="https://example.com" />
        </div>
        <div v-else-if="qrType === 'text'">
          <label>Text Content</label>
          <textarea v-model="text" rows="4" placeholder="Enter your text..." />
        </div>
        <div v-else-if="qrType === 'wifi'" class="fields">
          <div><label>Network Name (SSID)</label><input v-model="wifi.ssid" placeholder="WiFi Name" /></div>
          <div><label>Password</label><input v-model="wifi.password" type="password" placeholder="Password" /></div>
          <div><label>Encryption</label>
            <select v-model="wifi.encryption"><option>WPA</option><option>WEP</option><option>None</option></select>
          </div>
        </div>
        <div v-else-if="qrType === 'vcard'" class="fields">
          <div><label>Full Name</label><input v-model="vcard.name" placeholder="John Doe" /></div>
          <div><label>Phone</label><input v-model="vcard.phone" placeholder="+1234567890" /></div>
          <div><label>Email</label><input v-model="vcard.email" placeholder="john@example.com" /></div>
          <div><label>Organization</label><input v-model="vcard.org" placeholder="Company" /></div>
          <div><label>Website</label><input v-model="vcard.url" placeholder="https://..." /></div>
        </div>
        <div v-else-if="qrType === 'email'" class="fields">
          <div><label>To</label><input v-model="email.to" placeholder="recipient@example.com" /></div>
          <div><label>Subject</label><input v-model="email.subject" placeholder="Subject" /></div>
          <div><label>Body</label><textarea v-model="email.body" rows="3" placeholder="Message..." /></div>
        </div>
      </div>

      <!-- 样式选项 -->
      <div class="card style-options">
        <h3><Palette :size="18" /> Customize</h3>
        <div class="color-row">
          <div><label>Foreground</label><input type="color" v-model="fgColor" /></div>
          <div><label>Background</label><input type="color" v-model="bgColor" /></div>
        </div>
        <div class="logo-row">
          <label><Upload :size="16" /> Logo (optional)</label>
          <input type="file" accept="image/*" @change="handleLogo" />
          <div v-if="logoFile" class="logo-size">
            <label>Size: {{ logoSize }}px</label>
            <input type="range" v-model.number="logoSize" min="20" max="80" />
          </div>
        </div>
      </div>
    </div>

    <!-- 预览 -->
    <div class="right">
      <div class="card preview">
        <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code" />
        <p v-else class="placeholder">Enter content to generate QR code</p>
      </div>
      <div class="actions">
        <button class="primary" @click="downloadPNG"><Download :size="16" /> PNG</button>
        <button class="primary" @click="downloadSVG"><Image :size="16" /> SVG</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generator { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
@media (max-width: 768px) { .generator { grid-template-columns: 1fr; } }
.left { display: flex; flex-direction: column; gap: 20px; }
.type-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.type-tabs button { background: var(--border); color: var(--text-muted); padding: 8px 16px; }
.type-tabs button.active { background: var(--primary); color: #fff; }
.form label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--text-muted); }
.fields { display: flex; flex-direction: column; gap: 14px; }
.style-options h3 { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 15px; }
.color-row { display: flex; gap: 16px; margin-bottom: 16px; }
.color-row input[type="color"] { width: 48px; height: 36px; padding: 2px; cursor: pointer; }
.logo-row label { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.logo-size { margin-top: 8px; }
.logo-size input[type="range"] { margin-top: 4px; }
.right { position: sticky; top: 80px; }
.preview { display: flex; justify-content: center; align-items: center; min-height: 300px; }
.preview img { max-width: 100%; border-radius: 8px; }
.placeholder { color: var(--text-muted); font-size: 14px; }
.actions { display: flex; gap: 12px; margin-top: 16px; }
.actions button { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; }
</style>
