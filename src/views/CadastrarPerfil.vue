<template>
    <ion-page>
      <div v-if="alert.status" :class="'alert-general ' + alert.type">
        <div>
          <span class="pl-1">{{alert.message}}</span>
        </div>
      </div>
      <ion-header>
          <ion-toolbar>
              <ion-tabs>
                  <ion-tab-bar slot="top">
                      <ion-tab-button tab="Haluga" @click="goTo('/pesquisar-imovel')">
                          <img height="40" src="../../public/static/logo-color.svg">
                      </ion-tab-button>
                        <ion-tab-button tab="Anunciar Imovel" @click="goTo('/login')">
                          <ion-label>Anúnciar Imóvel</ion-label>
                        </ion-tab-button>
                  </ion-tab-bar>
              </ion-tabs>
          </ion-toolbar>
      </ion-header>
      <ion-content>
        <div style="margin: 15px; text-align: center">
          <p style="font-size: 35px; color: #e63946">Cadastro</p>
        </div>
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
          <ion-input type="password" v-model="form.password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-button slot="end" @click="formSubmit()">Cadastrar</ion-button>
          <ion-button slot="start" router-link="/login">Login</ion-button>
        </ion-item>
      </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem } from '@ionic/vue'
import axios from 'axios';
import { getHeader, apiUrl } from './config'

export default {
    name: 'CadastrarPerfil',
    components: {
      IonPage, IonHeader, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem 
    },
    data: () => ({
      form: {
        name: null,
        email: null,
        password: null
      },
      user: null,
      alert: {
        status: false,
        type: "",
        message: ""
      }
    }),
    methods: {
      validateForm () {
        if (!this.form.name) {
          return false
        } 
        if (!this.form.email) {
          return false
        }
        if (!this.form.password) {
          return false
        }
        return true
      },
      showAlert (type, message) {
        this.alert.status = true
        this.alert.type = type
        this.alert.message = message
        setTimeout(() => {
          this.alert.status = false
          this.alert.type = ''
          this.alert.message = ''
        }, 7000)
      },
      formSubmit () {
        if (!this.validateForm()) {
          this.showAlert('danger', 'Insira os dados corretamente')
          return false
        }
        axios({url: apiUrl + 'user-create', method: 'post', data: this.form}).then(response => {
          if (response.data.user_enabled) {
            window.localStorage.setItem('userId', response.data.userId)
            window.localStorage.setItem('authUser', response.data.authUser)
            this.$router.push('/meus-imoveis')
          } else {
            this.showAlert('danger', response.data.message)
          }
        })
      },
      goTo (path) {
        this.$router.push(path)
      },
      getUser () {
        const userId = window.localStorage.getItem('userId')
        if (userId) {
          const params = {}
          params.user_id = userId
          axios({url: apiUrl + 'get-user', method: 'post', params, headers: getHeader()}).then(response => {
            this.user = response.data
            this.$router.push('/pesquisar-imovel')
          }).catch(error => {
            console.log(error)  
            this.user = null
            window.localStorage.clear()
          })
        }
      }
    },
    created () {
      this.getUser()
    }
}

</script>

<style scoped>
</style>
