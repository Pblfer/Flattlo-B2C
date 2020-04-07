<template>
    <div>
        <div>
    <h4>📑 Cotizaciones genedas</h4>
    <vs-row vs-w="12" class="p-3">
    <h5>En esta sección encontraras todas tus cotizaciones generadas.</h5>
    </vs-row>
    <vs-divider></vs-divider>
  </div>
  <userQuotes/>
    </div>
</template>

<script>
import userQuotes from '@/components/Quote/userQuotesComponent'
export default {
        data(){
          return{
            
          }
        },
        components:{
          userQuotes
        }
}
</script>

<style lang="scss" scoped>

</style>