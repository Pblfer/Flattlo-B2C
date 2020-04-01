<template>
  <div class="w-full sm:w-full p-3 mt-4 mb-6">
    <div>
      <h5>📩 Datos de cotización:</h5>
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
      user_email: ''
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
</style>
