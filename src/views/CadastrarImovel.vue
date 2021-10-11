<template>
    <!-- <div class="container mt-container mb-container" :class="$route.params.id ? 'mt-65' : 'mt-5'">

        <div class="row">
            <div class="col-md-12">
                
                <template v-if="$route.params.id">
                    <div style="margin-bottom: 70px">
                        <vuedropzone
                            v-on:vdropzone-success="addedDropZoneProfileFile"
                            v-on:vdropzone-removed-file="removedDropZoneProfileFile"
                            :destroyDropzone="false"
                            ref="myVueDropzone"
                            id="myVueDropzone"
                            :options="dropzoneOptions">
                        </vuedropzone>
                        <div class="row" v-if="!form.active">
                            <div class="col-md-6">
                                <div class="mt-2">
                                    <div class="alert alert-success" role="alert">
                                        Para ativar o anúncio devem ser inseridas no mínimo cinco imagens
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>       
            </div>
        </div>
    </div> -->
    <section>
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Cadastro de Imóvel</ion-title>
            <ion-button class="ion-padding-end" slot="end" router-link="/tabs/tab1">Voltar</ion-button>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item>
            <ion-label position="stacked">Intenção</ion-label>
            <ion-select v-model="form.intent" @change="changeIntent()">
              <ion-select-option value="rent">Alugar</ion-select-option>
              <ion-select-option value="sell">Vender</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Condição</ion-label>
            <ion-select v-model="form.condition">
              <ion-select-option value="residencial">Residencial</ion-select-option>
              <ion-select-option value="comercial">Comercial</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Tipo</ion-label>
            <ion-select v-model="form.type">
              <!-- <ion-select-option v-for="(type, index) of types" :key="index">
                {{ type.value }}
              </ion-select-option> -->
              <ion-select-option value="Apartamento">Apartamento</ion-select-option>
              <ion-select-option value="Casa">Casa</ion-select-option>
              <ion-select-option value="Casa de condomínio">Casa de condomínio</ion-select-option>
              <ion-select-option value="Casa de Vila">Casa de Vila</ion-select-option>
              <ion-select-option value="Cobertura">Cobertura</ion-select-option>
              <ion-select-option value="Fazenda/Sítio/Chácara">Fazenda/Sítio/Chácara</ion-select-option>
              <ion-select-option value="Flat">Flat</ion-select-option>
              <ion-select-option value="Lote/Terreno">Lote/Terreno</ion-select-option>
              <ion-select-option value="Sobrado">Sobrado</ion-select-option>
              <ion-select-option value="Consultório">Consultório</ion-select-option>
              <ion-select-option value="Galpão/Depósito/Armazém">Galpão/Depósito/Armazém</ion-select-option>
              <ion-select-option value="Garagem">Garagem</ion-select-option>
              <ion-select-option value="Hotel/Motel/Pousada">Hotel/Motel/Pousada</ion-select-option>
              <ion-select-option value="Ponto comercial/Loja/Box">Ponto comercial/Loja/Box</ion-select-option>
              <ion-select-option value="Prédio/Edifício inteiro">Prédio/Edifício inteiro</ion-select-option>
              <ion-select-option value="Sala/Conjunto">Sala/Conjunto</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Contato (Obrigatório)</ion-label>
            <ion-input v-model="form.phone"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Área útil (m²) (Obrigatório)</ion-label>
            <ion-input v-model="form.area"></ion-input>
          </ion-item>
          <ion-item>
            <template v-if="form.intent === 'rent'">
              <ion-label position="stacked">Valor do Aluguel (Obrigatório)</ion-label>
            </template>
            <template v-else>
              <ion-label position="stacked">Valor de Venda (Obrigatório)</ion-label>
            </template>
            <ion-input v-model="form.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Banheiros</ion-label>
            <ion-input v-model="form.bathrooms"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Quartos</ion-label>
            <ion-input v-model="form.rooms"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Suítes</ion-label>
            <ion-input v-model="form.suites"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Valor do Condomínio</ion-label>
            <ion-input v-model="form.condominium_value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">IPTU</ion-label>
            <ion-input v-model="form.iptu"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Vagas</ion-label>
            <ion-input v-model="form.vacancies"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Cep</ion-label>
            <ion-input v-model="form.cep" @keyup="searchCep()"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Rua</ion-label>
            <ion-input v-model="form.street"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Cidade (Obrigatório)</ion-label>
            <ion-input v-model="form.city"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Bairro (Obrigatório)</ion-label>
            <ion-input v-model="form.district"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">UF (Obrigatório)</ion-label>
            <ion-input v-model="form.state"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Complemento</ion-label>
            <ion-input v-model="form.complement"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Descrição</ion-label>
            <ion-input v-model="form.description"></ion-input>
          </ion-item>
          <ion-item>
            <ion-button @click="formSubmit()" slot="start">Salvar</ion-button>
          </ion-item>
        </ion-content>
      </ion-page>
    </section>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem, IonSelect, IonSelectOption } from '@ionic/vue'
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { getHeaderFile, logout, getHeader, apiDomain, apiUrl } from './config'
// import {Money} from 'v-money'
// import MaskedInput from 'vue-masked-input'
import axios from 'axios';

export default {
    name: 'CadastrarImovel',
    components: {
      // MaskedInput,
      // 'vuedropzone': vue2Dropzone,
      // money: Money
      IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonLabel, IonInput, IonItem, IonSelect, IonSelectOption
    },
    data: () => ({
        dropzoneOptions: {
            maxFiles: 10,
            url: apiUrl + 'upload-file',
            clickable: true,
            params: {
                place_id: null
            },
            headers: getHeaderFile(),
            addRemoveLinks: true,
            methods: 'post',
            acceptedFiles: '.png, .jpg',
            autoProcessQueue: true,
            dictDefaultMessage: 'Clique aqui ou Arraste para Adicionar as Imagens',
            dictRemoveFile: 'Remover',
            dictMaxFilesExceeded: 'Máximo de 10 imagens'
        },
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        },
        form: {
            id: null,
            userId: null,
            imagePath: null,
            active: null,
            intent: 'rent',
            condition: 'residencial',
            type: 'Apartamento',
            phone: null,
            cep: null,
            street: null,
            district: null,
            city: null,
            state: null,
            number: null,
            complement: null,
            area: null,
            rooms: null,
            bathrooms: null,
            suites: null,
            vacancies: null,
            value: 0,
            rent_value: 0,
            sale_value: 0,
            condominium_value: 0,
            iptu: 0,
            description: null
        }
    }),
    methods: {
        addStorageFile: function (files) {
            for (const file of files) {
                if (file) {
                    this.mockFiles = null
                    this.mockFiles = { name: file.name, size: 12345, id: file.id }
                    if (this.$refs.myVueDropzone) {
                        this.$refs.myVueDropzone.manuallyAddFile(this.mockFiles, apiDomain + file.path)
                    }
                }
            }
        },
        searchCep () {
            if (this.form.cep && this.form.cep.length === 8) {
              axios({url: 'https://viacep.com.br/ws/' + this.form.cep + '/json/', method: 'get'})
                .then(response => {
                    if (response.data.erro === true) {
                    this.form.cep = ''
                    this.form.street = ''
                    this.form.district = ''
                    this.form.city = ''
                    this.form.state = ''
                    } else {
                        const address = response.data
                        this.form.street = address.logradouro
                        this.form.district = address.bairro
                        this.form.city = address.localidade
                        this.form.state = address.uf
                    }
                })
            } else {
                this.form.street = ''
                this.form.district = ''
                this.form.city = ''
                this.form.state = ''
            }
        },
        changeIntent () {
            this.form.value = this.form.intent === 'rent' ? this.form.rent_value : this.form.sale_value
        },
        addedDropZoneProfileFile: function (file, response) {
            file.id = response.id
            this.getPlace(response.place_id)
        },
        validateForm () {
            if (this.form.value === 0) {
                const message = this.form.intent === 'rent' ? 'Deve ser inserido o valor do aluguel' : 'Deve ser inserido o valor de venda'
                console.log('heyy')
                // this.$store.dispatch('getAlertDanger', message)
                return false
            }
            if (this.form.intent === 'rent') {
                this.form.rent_value = this.form.value
            } else {
                this.form.sale_value = this.form.value
            }
            this.form.phone = this.form.phone ? this.form.phone.replace(/[^\d]+/g,'') : null
            if (!this.form.phone || this.form.phone.length < 10) {
              console.log('oioi')
                // this.$store.dispatch('getAlertDanger', 'Deve ser inserido um contato válido')
                return false
            }
            return true
        },
        formSubmit () {
            if (!this.validateForm()) {
                return false
            }
            this.form.userId = window.localStorage.getItem('userId')
            const action = this.$route.params.id ? 'place-edit' : 'place-create'
            this.form.id = this.$route.params.id ? this.$route.params.id : null
            // this.$store.dispatch('getSpinner', true)
            axios({url: apiUrl + action, method: 'post', data: this.form, headers: getHeader()})
            .then(response => {
                if (!this.$route.params.id) {
                    // this.dropzoneOptions.params.place_id = response.body.id
                    this.$router.push('editar-imovel/' + response.data.id)
                    // this.$store.dispatch('getAlertSuccess', 'Local Cadastrado com Sucesso')
                    // window.scrollTo(0, 0)
                    this.getPlace(response.data.id)
                } else {
                    // this.$store.dispatch('getAlertSuccess', 'Local Editado com Sucesso')
                    this.getPlace(response.data.id)
                }
            })
        },
        getPlace (placeId) {
          axios({url: apiUrl + 'get-place', method: 'post', data: {place_id: placeId}})
          .then(response => {
            this.form = response.data
            this.form.id = response.data.place_id
            this.form.value = response.data.intent === 'rent' ? response.data.rent_value : response.data.sale_value
            // this.$store.dispatch('getSpinner', false)
          })
        },
        removedDropZoneProfileFile: function (file) {
            this.$http.post(apiUrl + 'remove-file', {file_id: file.id}, {headers: getHeaderFile()}).then(response => {
                this.getPlace(response.body.id)
            })
        },
        getUser () {
            const userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    if (this.$route.params.id) {
                        this.getPlaceId()
                    } else {
                        this.$store.dispatch('getSpinner', false)
                    }
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            } else {
                this.$store.dispatch('getUser', null)
                logout()
            }
        },
        getPlaceId () {
            this.dropzoneOptions.params.place_id = this.$route.params.id
            this.$http.post(apiUrl + 'get-place-images', {place_id: this.$route.params.id}, {headers: getHeader()})
            .then(response => {
                this.addStorageFile(response.body)
                this.getPlace(this.$route.params.id)
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        }
    },
    created () {
      // this.$router.push('/login')
      // this.getPlace(this.$route.params.id)
      // this.$store.dispatch('getSpinner', true)
      // this.getUser()
    }
}

</script>

<style scoped>
</style>
