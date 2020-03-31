<template>
<div>
  <div>
<div class="p-4 mb-4">
                <h4>🚪Apartamento: {{getApartament.number}}</h4>
                <h5 class="mt-3">En esta sección encontraras todos los detalles de tu proximo apartamento.</h5>
                <vs-divider></vs-divider>
            </div>
            <Hero class="mb-4" />
            <vx-card class="mb-4">
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                        <img class="ApartamentPlantImg" :src="getApartament.plane_img" >
                    </vs-col>
                    </vs-row>
            </vx-card>

            <vx-card>
          <div class="p-2">
            <h4>Detalles</h4>
            <vs-divider class="mb-4"></vs-divider>
            <vs-list-item
              
              icon="texture"
              :title="`Área: ${getApartament.living_square_mts} m2`"
            ></vs-list-item>
            <vs-list-item
              
              icon="local_hotel"
              :title="`Habitaciones: ${getApartament.bedrooms}`"
            ></vs-list-item>
            <vs-list-item
              
              icon="bathtub"
              :title="`Baños: ${getApartament.bathrooms}`"
            ></vs-list-item>
            <vs-list-item
            
              icon="local_laundry_service"
              :title="`Lavandería: ${getApartament.loundry}`"
            ></vs-list-item>
            <vs-list-item
              
              icon="view_carousel"
              :title="`Closets: ${getApartament.closets}`"
            ></vs-list-item>
            <vs-list-item
              
              icon="view_column"
              :title="`Muebles de cocína: ${getApartament.kitchen_furniture}`"
            ></vs-list-item>
            <vs-list-item
              
              icon="kitchen"
              :title="`Electrodomésticos: ${getApartament.kitchen_appliances}`"
            ></vs-list-item>
            <vs-list-item
             
              icon="local_florist"
              :title="`Jadín: ${getApartament.garden}`"
            ></vs-list-item>
            <vs-list-item
              
              icon="terrain"
              :title="`Balcón: ${getApartament.balcony}`"
            ></vs-list-item>
            <vs-list-item
       
              icon="monetization_on"
              :title="`Precio sin IVA: Q.${getApartament.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
            ></vs-list-item>
          </div>
        </vx-card>
         <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
   <vs-button class="mt-8 mb-8 quoteBtn" :to="{name: 'quote-generator'}" icon-pack="feather" size="large"  text-color="#000" color="#fbdc11" >Cotizar</vs-button>
  </vs-col> 
  <br/> 
  <br/> 
  <br/> 
  <br/> 
  <br/> 
  <br/> 

  </div>
    
</div>
    
</template>

<script>

import gql from "graphql-tag";
import Hero from "@/components/Apartament/HeroApartamentComponent"    
    export default {
        data(){
            return{
                getApartament: []
            }
        },
        apollo: {
    getApartament: {
      query: gql`
        query($apartamentID: String!) {
          getApartament(apartamentID: $apartamentID) {
            number
            living_square_mts
            bedrooms
            bathrooms
            loundry
            closets
            kitchen_furniture
            kitchen_appliances
            garden
            balcony
            price
            plane_img
          }
        }
      `,
      variables() {
          return{
            apartamentID: localStorage.selectedApartament
          }
      },
      pollInterval: 850
    }
  },
  components:{
      Hero
  },
  computed:{
    saveApartamentToQuote(apt) {
      localStorage.selectedApartament = apt;
    },
  }
    }
</script>

<style lang="scss" scoped>
.ApartamentPlantImg{
    height: 560px;
}

.quoteBtn{
    border-radius: 30px;
    width: 90%;
    font-weight: 400;
    -webkit-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
-moz-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
}

@media (min-width: 320px) and (max-width: 480px) {
  .ApartamentPlantImg{
    width: 100%;
    height: auto;
}
}
</style>