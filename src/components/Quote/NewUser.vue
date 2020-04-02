<template>
  <div class="w-full sm:w-full p-3 mt-4 mb-6">
    <div>
      <h5>🤦‍♂️ {{getFirstName}}, Necesitamos tus datos actualizados para que puedas generar las cotizaciones que necesites y de una forma más facil. Te toma 30seg. ⏱😉📧</h5>
      <vs-divider></vs-divider>
      <div>
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
            v-validate="'required|tel'"
            required="true"
            name="Teléfono"
          />
        </div>
        <div class="mt-2">
          <span class="text-danger text-sm" v-show="errors.has('Teléfono')">{{
            errors.first("Teléfono")
          }}</span>
        </div>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
   <vs-button  ref="loadableButton" id="button-with-loading" v-if="!emailSend" class="mt-8 mb-8 quoteBtn vs-con-loading__container" :to="{name: 'quote-generator'}" icon-pack="feather" icon="icon-mail" size="large"  text-color="#000" color="#fbdc11" >Enviar confirmación</vs-button>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      user_email: '',
      user_phone: '',
      emailSend: false
    }
  },
  computed:{
    getFirstName () {
      return localStorage.firstNameUser
    }
  },
  methods:{
      openLoadingContained(){
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      })
      setTimeout( ()=> {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
      }, 3000);
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