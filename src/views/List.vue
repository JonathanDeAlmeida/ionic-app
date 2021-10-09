<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Locais</ion-title>
        <ion-button class="ion-padding-end" slot="end" router-link="/tabs/tab1">Voltar</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="(place, index) of places" :key="index">
          {{place.name}}
          <ion-button class="ion-margin-start" @click="showModal(place)">Ver Endereço</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonList, IonItem, IonButton, modalController } from '@ionic/vue'
import axios from 'axios';
import Modal from '../views/Modal.vue'
export default {
  components: {
    IonPage,
    IonHeader, 
    IonTitle, 
    IonContent,
    IonToolbar,
    IonItem,
    IonList,
    IonButton
  },
  data: () => ({
    places: [
      {name: 'Restaurante', cep: 88310631}, 
      {name: 'Padaria', cep: 18630039}
    ]
  }),
  methods: {
    showModal (place) {
      axios({url: 'https://viacep.com.br/ws/' + place.cep + '/json/', method: 'get'})
      .then(response => {
        this.teste(place, response)
      })
    },
    async teste (place, response) {
      const modal = await modalController.create({
        component: Modal,
        componentProps: {
          name: place.name,
          address: response.data
        }
      })
      modal.present()
    }
  }
}
</script>