<template>
    <div>
        <div>
    <h4>😎🙌 Tus cotizaciones favoritas</h4>
    <vs-row vs-w="12" class="p-2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12">
        <h5>En esta sección encontraras las cotizaciones que fueron enviadas a nuestro equipo de ventas para seguimiento.</h5>
        <br />
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <favorites/>
  </div>
    </div>
</template>

<script>
import favorites from '@/components/Quote/FavoritesQuotesComponent'
export default {
        data(){
          return{

          }
        },
        components:{
          favorites
        }
}
</script>

<style lang="scss" scoped>

</style>