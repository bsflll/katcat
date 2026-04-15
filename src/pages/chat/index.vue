<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { emit } from '@tauri-apps/api/event'

const chatUrl = ref('https://webchat.kafe.ai')
const iframeRef = ref<HTMLIFrameElement | null>(null)

const appWindow = getCurrentWebviewWindow()

onMounted(() => {
  // Listen for messages from webchat iframe
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://webchat.kafe.ai') return
    
    // Forward kat state to main window for cat animations
    if (event.data.type === 'kat-state') {
      emit('kat-state-change', event.data.state)
    }
  })
})

function handleMouseDown(e: MouseEvent) {
  // Allow dragging from the header area
  if ((e.target as HTMLElement).closest('.chat-header')) {
    appWindow.startDragging()
  }
}

async function handleClose() {
  await appWindow.hide()
}
</script>

<template>
  <div 
    class="chat-container"
    @mousedown="handleMouseDown"
  >
    <div class="chat-header">
      <span class="chat-title">kat</span>
      <button class="close-btn" @click="handleClose">×</button>
    </div>
    <iframe
      ref="iframeRef"
      :src="chatUrl"
      class="chat-iframe"
      allow="microphone"
    />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(40, 40, 40, 0.9);
  cursor: grab;
  user-select: none;
  -webkit-app-region: drag;
}

.chat-header:active {
  cursor: grabbing;
}

.chat-title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  -webkit-app-region: no-drag;
}

.close-btn:hover {
  color: rgba(255, 255, 255, 0.9);
}

.chat-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
}
</style>
