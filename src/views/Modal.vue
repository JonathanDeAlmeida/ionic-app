<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{name}}</ion-title>
        <ion-button class="ion-padding-end" slot="end" @click="closeModal">Fechar</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>{{address.logradouro}}</ion-item>
        <ion-item>{{address.bairro}}</ion-item>
        <ion-item>{{address.localidade}}</ion-item>
        <ion-item>{{address.uf}}</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButton, modalController } from '@ionic/vue'

export default {
  name: 'Modal',
  props: ['name', 'address'],
  methods: {
    closeModal () {
      modalController.dismiss()
    }
  },
  components: {
    IonPage,
    IonHeader, 
    IonTitle, 
    IonContent,
    IonToolbar,
    IonButton
  }
}
</script> 