import cpNavBar from '@/components/cpNavBar.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
  }
}
