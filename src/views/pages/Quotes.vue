<template>
    <div>
        <div>
    <h4>📑 Cotizaciones genedas</h4>
    <vs-row vs-w="12" class="p-3">
    <h5>En esta sección encontraras todas tus cotizaciones generadas.</h5>
    <h5 class="mt-1">¿{{getFirstName}} deseas más información de tu apartamento? Envia las mejores opciónes a tu lista de <strong>favoritos</strong> ♥👆 para ser contactado por tu asesor 👩‍💼👨‍💼.</h5>
    </vs-row>
    <vs-divider></vs-divider>
  </div>
  <userQuotes/>
    </div>
</template>

<script>
import userQuotes from '@/components/Quote/userQuotesComponent'
export default {
  data () {
    return {
            
    }
  },
  components:{
    userQuotes
  },
  computed:{
    getFirstName () {
      return localStorage.firstNameUser
    }
  }
}
</script>

<style lang="scss" scoped>

</style>