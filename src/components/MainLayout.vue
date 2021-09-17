<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar } from '@ionic/vue'
export default {
  props: ['title'],
  components: {
    IonPage,
    IonHeader, 
    IonTitle, 
    IonContent,
    IonToolbar
  }
}
</script>