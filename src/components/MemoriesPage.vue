<template>
  <main-layout title="Todas as Memórias">
    <ion-list>
      <ion-item router-link="/memories/1">Max</ion-item>
      <ion-item>Planck</ion-item>
    </ion-list>
  </main-layout>
</template>
<script>
import { IonList, IonItem } from '@ionic/vue'
import MainLayout from './MainLayout.vue'
export default {
  components: {
    IonItem,
    IonList,
    MainLayout
  }
}
</script>