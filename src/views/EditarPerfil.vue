<template>
    <div class="container mt-container mb-container">
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
                        <template v-if="user">
                            <ion-tab-button tab="Meus Imoveis" @click="goTo('/meus-imoveis')">
                                <ion-label>Meus Imoveis</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="Sair" @click="exit">
                                <ion-label>Sair</ion-label>
                            </ion-tab-button>
                        </template>
                        <template v-else>
                            <ion-tab-button tab="Anunciar Imovel" @click="goTo('/login')">
                                <ion-label>Anúnciar Imóvel</ion-label>
                            </ion-tab-button>
                        </template>
                    </ion-tab-bar>
                </ion-tabs>
            </ion-toolbar>
        </ion-header>
        <ion-content>
          <div style="margin: 15px; text-align: center">
            <p style="font-size: 35px; color: #e63946">Editar Perfil</p>
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
            <ion-label position="stacked">Confirmar Senha</ion-label>
            <ion-input type="password" v-model="form.confirmPassword"></ion-input>
          </ion-item>
          <ion-item>
            <ion-button slot="start" @click="formSubmit()">Salvar</ion-button>
          </ion-item>
        </ion-content>
      </ion-page>

    </div>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem } from '@ionic/vue'
import axios from 'axios'
import { logout, getHeader, apiUrl } from './config'

export default {
    name: 'EditarPerfil',
    components: {
      IonPage, IonHeader, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem
    },
    data: () => ({
      user: null,
      alert: {
        status: false,
        type: "",
        message: ""
      },
      form: {
          name: null,
          email: null,
          password: null,
          confirmPassword: null
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
          if (this.form.password && this.form.password !== this.form.confirmPassword) {
              return false
          }
          if (this.form.confirmPassword && this.form.confirmPassword !== this.form.password) {
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
          this.form.id = window.localStorage.getItem('userId')
          let params = this.form
          axios({url: apiUrl + 'user-edit', method: 'post', params, headers: getHeader()}).then(response => {
            if (response.data.user_enabled) {
              this.showAlert('success', 'Usuário Editado Com Sucesso')
              this.getUserEdit()
            } else {
              this.showAlert('danger', response.data.message)
            }
          }).catch(error => {
            console.log(error)
            if (error.response.status === 401) {
              this.user = null
              logout()
            }
          })
        },
        exit () {
          window.localStorage.clear()
          this.user = null
          this.$router.push('/login')
        },
        goTo (path) {
          this.$router.push(path)
        },
        getUserEdit () {
          let userId = window.localStorage.getItem('userId')
          const params = {}
          params.user_id = userId
          axios({url: apiUrl + 'get-user', method: 'post', params, headers: getHeader()}).then(response => {
            let user = response.data
            this.form = {
              name: user.name,
              email: user.email
            }
          })
        },
        getUser () {              
          const userId = window.localStorage.getItem('userId')
          if (userId) {
            const params = {}
            params.user_id = userId
            axios({url: apiUrl + 'get-user', method: 'post', params, headers: getHeader()}).then(response => {
              this.user = response.data
              this.getUserEdit()
            }).catch(error => {
              console.log(error)  
              this.user = null
              logout()
            })
          }
        }
    },
    created () {
        // this.$store.dispatch('getSpinner', true)
      this.getUser()
    }
}

</script>

<style scoped>
</style>
