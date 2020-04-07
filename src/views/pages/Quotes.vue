<template>
    <div>
        <div>
    <h4>📑 Cotizaciones genedas</h4>
    <vs-row vs-w="12" class="p-3">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12">
        <h5>En esta sección encontraras todas tus cotizaciones generadas.</h5>
        <br />
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <userQuotes/>
  </div>
    </div>
</template>

<script>
import userQuotes from '@/components/Quote/userQuotesComponent'
export default {
        data(){
          
        },
        components:{
          userQuotes
        }
}
</script>

<style lang="scss" scoped>

</style>