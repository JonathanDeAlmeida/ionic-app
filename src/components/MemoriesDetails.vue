<template>
  <main-layout title="Detalhes">
    <ion-back-button></ion-back-button>
    <span>Detalhes</span>
  </main-layout>
</template>
<script>
import { IonBackButton } from '@ionic/vue'
import MainLayout from './MainLayout.vue'
export default {
  components: {
    MainLayout,
    IonBackButton
  }
}
</script>