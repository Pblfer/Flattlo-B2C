<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide :key="index" v-for="(img, index) in mostrarGaleriaInterior">
        <img class="slider" :src="img.img_url" alt="banner" />
      </swiper-slide>

      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      getProyect: [],
      swiperOption: {
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  apollo: {
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            gallery {
              _id
              image_name
              gallery_type
              img_url
            }
          }
        }
      `,
      variables () {
        return {
          proyectID: '5e7aba5eafe9ae00247ccefa'
        }
      },
      pollInterval: 700
    }
  },
  computed:{
    mostrarGaleriaInterior () {
      const interiores = this.getProyect.gallery.filter(
        item => item.gallery_type === 'acabados'
      )
      return interiores
    }
  }
}
</script>


<style lang="scss">
.slider {
  display: block;
  height: 72vh;
  width: 100%;
  object-fit: cover;
}
[dir] .swiper-pagination-bullet-active {
  background: #fff !important;
}
</style>