<script setup lang="ts">
import { ref } from 'vue'
import QRCode from 'qrcode'
import { Download, Plus, Trash2 } from '@lucide/vue'

const items = ref<string[]>([''])
const results = ref<{ content: string; dataUrl: string }[]>([])
const fgColor = ref('#000000')
const bgColor = ref('#ffffff')

function addItem() { items.value.push('') }
function removeItem(i: number) { items.value.splice(i, 1) }

async function generateAll() {
  results.value = []
  for (const content of items.value) {
    if (!content.trim()) continue
    const dataUrl = await QRCode.toDataURL(content.trim(), {
      width: 300, margin: 2,
      color: { dark: fgColor.value, light: bgColor.value }
    })
    results.value.push({ content: content.trim(), dataUrl })
  }
}

function downloadAll() {
  results.value.forEach((r, i) => {
    const a = document.createElement('a')
    a.href = r.dataUrl
    a.download = `qrcode-${i + 1}.png`
    a.click()
  })
}
</script>

<template>
  <section class="hero">
    <h1>Batch QR Code Generator</h1>
    <p>Generate multiple QR codes at once. Enter one URL or text per line.</p>
  </section>

  <div class="batch-layout">
    <div class="card input-section">
      <div class="color-row">
        <div><label>Foreground</label><input type="color" v-model="fgColor" /></div>
        <div><label>Background</label><input type="color" v-model="bgColor" /></div>
      </div>
      <div v-for="(_, i) in items" :key="i" class="input-row">
        <input v-model="items[i]" :placeholder="`Item ${i + 1}: URL or text`" />
        <button class="secondary" @click="removeItem(i)" v-if="items.length > 1"><Trash2 :size="16" /></button>
      </div>
      <div class="btn-row">
        <button class="secondary" @click="addItem"><Plus :size="16" /> Add</button>
        <button class="primary" @click="generateAll">Generate All</button>
      </div>
    </div>

    <div v-if="results.length" class="results">
      <div class="results-header">
        <h3>{{ results.length }} QR Codes Generated</h3>
        <button class="primary" @click="downloadAll"><Download :size="16" /> Download All</button>
      </div>
      <div class="grid">
        <div v-for="(r, i) in results" :key="i" class="card result-item">
          <img :src="r.dataUrl" :alt="r.content" />
          <p>{{ r.content.slice(0, 40) }}{{ r.content.length > 40 ? '...' : '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero { text-align: center; margin-bottom: 32px; }
.hero h1 { font-size: 2rem; margin-bottom: 8px; }
.hero p { color: var(--text-muted); }
.batch-layout { display: flex; flex-direction: column; gap: 24px; }
.input-section { display: flex; flex-direction: column; gap: 12px; }
.color-row { display: flex; gap: 16px; margin-bottom: 8px; }
.color-row label { font-size: 13px; font-weight: 600; color: var(--text-muted); }
.color-row input[type="color"] { width: 48px; height: 36px; padding: 2px; cursor: pointer; }
.input-row { display: flex; gap: 8px; }
.btn-row { display: flex; gap: 12px; margin-top: 8px; }
.results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.results-header h3 { font-size: 16px; }
.results-header button { display: flex; align-items: center; gap: 6px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
.result-item { text-align: center; padding: 16px; }
.result-item img { width: 100%; max-width: 160px; margin-bottom: 8px; }
.result-item p { font-size: 12px; color: var(--text-muted); word-break: break-all; }
</style>
