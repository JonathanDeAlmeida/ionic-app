<template>
  <section>
    <!-- <b-navbar toggleable="lg" class="navbar-main">
      <div class="container">

        <b-navbar-brand>
          <router-link to="/" class="mr-3">
            <img height="40" src="../static/logo-white.svg">
          </router-link>
        </b-navbar-brand>

        <template v-if="$store.state.user">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>
                <span class="item-menu" @click.prevent="goTo('/meus-imoveis')">
                  Meus Imóveis
                </span>
              </b-nav-item>
              <b-nav-item>
                <span class="item-menu" @click.prevent="goTo('/cadastrar-imovel')">
                  Cadastrar Imóvel
                </span>
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown>
                <template #button-content>
                  <em class="name-user-menu">{{$store.state.user.name}}</em>
                </template>
                <b-dropdown-item @click.prevent="goTo('/editar-perfil')">              
                  <span>Editar Perfil</span>
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="exit">
                  <span>Sair</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>  
          </b-collapse>
        
        </template>
        <template v-else>
          <template v-if="$route.path !== '/login' && $route.path !== '/cadastrar-perfil'">
            <PesquisarMenu/>
            <b-navbar-nav>
              <b-nav-item right>
                <router-link class="button-menu" to="/login">Anúnciar Imóvel</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </template>
        </template>
      </div>
    </b-navbar> -->


    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-menu side="start" menu-id="custom" class="my-custom-menu" content-id="main">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Custom Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-menu side="end" type="push" content-id="main">
      <ion-header>
        <ion-toolbar color="danger">
          <ion-title>End Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main"></ion-router-outlet>
  </section>
</template>

<script>
// import PesquisarMenu from './PesquisarMenu.vue'

import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonMenu, 
  IonRouterOutlet,
  IonTitle, 
  IonToolbar,
  menuController
} from '@ionic/vue';

export default {
  name: 'Menu',
  components: {
    // PesquisarMenu
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
    IonTitle, 
    IonToolbar
  },
  data: () => ({
  }),
  methods: {
    openFirst() {
      menuController.enable(true, 'first')
      menuController.open('first')
    },
    openEnd() {
      menuController.open('end')
    },
    openCustom() {
      menuController.enable(true, 'custom')
      menuController.open('custom')
    },
    goTo (path) {
      this.$store.dispatch('getSpinner', true)
      this.$router.push(path)
      setTimeout(() => {
        this.$store.dispatch('getSpinner', false)
      }, 1000)
    },
    exit () {
      this.$store.dispatch('getSpinner', true)
      window.localStorage.clear()
      this.$store.dispatch('getUser', null)
      this.$router.push('/')
      setTimeout(() => {
        this.$store.dispatch('getSpinner', false)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.my-custom-menu {
  --width: 500px;
}

</style>
