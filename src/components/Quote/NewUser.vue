<template>
  <div class="w-full sm:w-full p-3 mt-4 mb-6">
    <div>
      <h4 class="mb-3">Estas muy cerca de liberar <strong>todos los precios. 😱📋🎉</strong></h4>
      <h5>Pero antes {{getFirstName}}, necesitamos tus datos actualizados para que puedas generar las cotizaciones que quieras y de una forma fácil. Te toma 30seg. ⏱😉📧</h5>
      <vs-divider></vs-divider>
      <div>
        <form>
        <div class="w-full sm:w-full mt-4">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-user"
            label="Nombre"
            color="primary"
            v-model="first_name"
            type="text"
            v-validate="'required|min:3|max:20|alpha'"
            required="true"
            name="Primer Nombre"
            autocomplete="false"
          />
          <div class="mt-2">
            <span
              class="text-danger text-sm"
              v-show="errors.has('Primer Nombre')"
              >{{ errors.first("Primer Nombre") }}</span
            >
          </div>
        </div>
        <div class="w-full sm:w-full mt-3">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-users"
            label="Apellido"
            color="primary"
            v-model="last_name"
            type="text"
            v-validate="'required|min:3|max:20|alpha'"
            required="true"
            name="Apellido"
            autocomplete="false"
          />
          <div class="mt-2">
            <span class="text-danger text-sm" v-show="errors.has('Apellido')">{{
              errors.first("Apellido")
            }}</span>
          </div>
        </div>
        <div class="w-full sm:w-full mt-3">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-mail"
            label="E-mail"
            color="primary"
            v-model="user_email"
            type="email"
            v-validate="'required|email'"
            required="true"
            name="Correo"
            autocomplete="false"
          />
        </div>
        <div class="mt-2">
          <span class="text-danger text-sm" v-show="errors.has('Correo')">{{
            errors.first("Correo")
          }}</span>
        </div>
        <div class="w-full sm:w-full mt-3">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-phone"
            label="Teléfono"
            color="primary"
            v-model="user_phone"
            type="tel"
            v-validate="'required|min:8|max:8'"
            required="true"
            name="Teléfono"
            autocomplete="false"
          />
        </div>
        <div class="mt-2">
          <span class="text-danger text-sm" v-show="errors.has('Teléfono')">{{
            errors.first("Teléfono")
          }}</span>
        </div>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <vs-button @click.prevent="submitForm" ref="loadableButton" id="button-with-loading" v-if="!emailSend" class="mt-8 mb-8 quoteBtn vs-con-loading__container" :to="{name: 'quote-generator'}" icon-pack="feather" icon="icon-mail" size="large"  text-color="#000" color="#fbdc11" >Enviar confirmación</vs-button>
   <vs-button  v-if="emailSend" disabled class="mt-8 mb-8 quoteBtnReady" :to="{name: 'quote-generator'}"  size="large"   text-color="#000" color="#fbdc11" >¡Listo!</vs-button>
  </vs-col> 
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
   <vs-alert
        color="primary"
        v-if="emailSend"
      >
        📭👍 Revisa tu bandeja de entrada, hemos enviado el correo de confirmación. 
      </vs-alert>
  </vs-col> 
  </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import gql from 'graphql-tag'
import router from '@/router'
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      user_email: '',
      user_phone: '',
      emailSend: false,
      dataNewUser: false
    }
  },
  computed:{
    getFirstName () {
      return localStorage.firstNameUser
    }
  },
  methods:{
    openLoadingContained () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading',
        scale: 0.45
      })
      setTimeout(() => {
        this.$vs.loading.close('#button-with-loading > .con-vs-loading')
      }, 3000)
    },
    submitForm () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.changeUserProfile()
        }
      })
    },
    changeUserProfile () {
      const user = firebase.auth().currentUser
      this.createFlattloClient(user.uid)
    },
    createFlattloClient (uid) {
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation(
                      $email: String!
                      $first_name: String!
                      $last_name: String!
                      $phone: String!
                      $UID: String!
                      
                      ){
                        newClientFlattlo(
                          email: $email,
                          first_name: $first_name,
                          last_name: $last_name,
                          phone: $phone,
                          UID: $UID
                        ){
                        _id
                      }
                    }`,
        // Parameters
        variables: {
          email: this.user_email,
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.user_phone,
          UID: uid
        }
                    
      }).then(() => {
        const user = firebase.auth().currentUser
        user.sendEmailVerification()
        this.emailSend = true
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 2500)
        this.$vs.notify({
          time:8000,
          title:'Revisa tu bandeja de entrada. 📭',
          text:`Hemos enviado un correo a ${user.email}`,
          color:'success'})
      })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}


</script>

<style lang="scss">

.vs-input--label {
  font-size: 0.9rem !important;
  color: #000;
}
.vs-input--icon {
  color: #000 !important;
}
.quoteBtn{
    border-radius: 30px;
    width: 90%;
    font-weight: 400;
    -webkit-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
-moz-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
}
.quoteBtnReady{
    border-radius: 30px;
    width: 90%;
    font-weight: 400;
}
</style>