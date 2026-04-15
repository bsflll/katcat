import { defineStore } from 'pinia'
import { ref } from 'vue'

export type HotKey = 'visibleCat' | 'visibleChat' | 'mirrorMode' | 'penetrable' | 'alwaysOnTop'

export const useShortcutStore = defineStore('shortcut', () => {
  const visibleCat = ref('')
  const visibleChat = ref('CommandOrControl+Shift+K')
  const visiblePreference = ref('')
  const mirrorMode = ref('')
  const penetrable = ref('')
  const alwaysOnTop = ref('')

  return {
    visibleCat,
    visibleChat,
    visiblePreference,
    mirrorMode,
    penetrable,
    alwaysOnTop,
  }
})
