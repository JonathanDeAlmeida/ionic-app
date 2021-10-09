<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Usuário</ion-title>
          <ion-button class="ion-padding-end" slot="end" router-link="/tabs/tab1">Voltar</ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-item>
          <ion-label position="stacked">Nome</ion-label>
          <ion-input v-model="form.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input v-model="form.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Senha</ion-label>
          <ion-input v-model="form.password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Confirmar Senha</ion-label>
          <ion-input v-model="form.confirmPassword"></ion-input>
        </ion-item>
        <ion-item>
          <ion-button slot="end" @click="formSubmit()">Cadastrar</ion-button>
          <ion-button slot="start" router-link="/login">Login</ion-button>
        </ion-item>
      </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem } from '@ionic/vue'
import axios from 'axios';
import { getHeader, apiUrl } from './config'

export default {
    name: 'CadastrarPerfil',
    components: {
      IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem 
    },
    data: () => ({
      form: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    }),
    methods: {
      formSubmit () {
        // this.$store.dispatch('getSpinner', true)
        axios({url: apiUrl + 'user-create', method: 'post', data: this.form}).then(response => {
          if (response.data.user_enabled) {
            window.localStorage.setItem('userId', response.data.userId)
            window.localStorage.setItem('authUser', response.data.authUser)
            // this.$store.dispatch('getSpinner', false)
            this.$router.push('/cadastrar-imovel')
          } else {
            // this.$store.dispatch('getAlertDanger', response.body.message)
          }
        })
      },
      getUser () {
        const userId = window.localStorage.getItem('userId')
        if (userId) {
            this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                this.$store.dispatch('getUser', response.body)
                this.$router.push('/')
                this.$store.dispatch('getSpinner', false)
            }, error => {
                console.log(error)
                this.$store.dispatch('getUser', null)
                window.localStorage.clear();
            })
        } else {
            this.$store.dispatch('getSpinner', false)
        }
      }
    },
    created () {
        // this.$store.dispatch('getSpinner', true)
        // this.getUser()
    }
}

</script>

<style scoped>
</style>
