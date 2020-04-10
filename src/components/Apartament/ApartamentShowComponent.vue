<template>
  <div>
    <div class="p-4">
      <h4>🥳 Estas en el nivel: {{getLevel.number_of_level}}</h4>
      <h5
        class="mt-3"
      >Si deseas conocer más detalle de cada apartamento pulsa en <strong>más detalles</strong>.</h5>
      <vs-divider></vs-divider>
    </div>

    <div class="contained-example-container" v-if="!checkData">
      <div id="div-with-loading" class="vs-con-loading__container mt-4"></div>
    </div>

    <div class="flex flex-wrap sm:full lg:w-full mt-4" v-if="checkData">
      <div
        class="w-full sm:w-1/2 md:w-1/4 lg:w-3/2 xl:w-3/2 mt-3 p-2"
        v-for="apartament in mostrarDisponibles"
        :key="apartament._id"
      >
        <vx-card class="mb-base mb-6">
          <div>
            <img :src="apartament.plane_img" alt="content-img" class="responsive rounded-lg" />
          </div>
          <vs-list-header
            class="mt-2"
            icon-pack="feather"
            icon="icon-codepen"
            :title="`Apartamento: ${apartament.number}`"
            color="primary"
          ></vs-list-header>
          <vs-list-item icon="texture" :title="`Metraje: ${apartament.living_square_mts} m2`"></vs-list-item>
          <vs-list-item icon="local_hotel" :title="`Dormitorios: ${apartament.bedrooms}`"></vs-list-item>
          <vs-list-item icon="bathtub" :title="`Baños: ${apartament.bathrooms}`"></vs-list-item>
          <vs-list-item icon="monetization_on" :title="`Precio sin IVA: Q. ${apartament.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"></vs-list-item>
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
              <vs-button
                @click.native="saveApartament(apartament._id)"
                :to="{name: 'quote-generator'}"
                class="mt-8 mb-8 quoteBtn"
                icon-pack="feather"
                size="large"
                text-color="#000"
                color="#fbdc11"
              >Cotizar</vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="mb-2">
              <vs-button
                @click.native="saveApartament(apartament._id)"
                :to="{name: 'selected-apartament'}"
                type="line"
                line-origin="left"
                color="primary"
                line-position="top"
              >Más detalles</vs-button>
            </vs-col>
          </vs-row>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import vSelect from 'vue-select'
import router from '../../router'

export default {
  data () {
    return {
      getProyect: [],
      selectedLevel: '5e7abad0afe9ae00247ccefb',
      numberOfLevel: 1,
      selected: []
    }
  },
  components: {
    'v-select': vSelect
  },
  apollo: {
    getLevel: {
      query: gql`
        query($levelID: String!) {
          getLevel(levelID: $levelID) {
            number_of_level
            inventory {
              _id
              plane_img
              loundry
              closets
              kitchen_furniture
              kitchen_appliances
              actual_state
              living_square_mts
              bedrooms
              bathrooms
              balcony
              garden
              number
              price
            }
          }
        }
      `,
      variables () {
        return {
          levelID: localStorage.selectedLevel
        }
      },
      pollInterval: 350
    }
  },

  methods: {
    saveApartament (apt) {
      localStorage.selectedApartament = apt
    },
    openLoadingInDiv () {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 1,
        type: 'sound',
        background: 'transparent',
        color: 'success',
        text: 'Cargando...'
      })
    },
    getFirstLevel () {
      this.selectedLevel = this.getProyect.levels[0]._id
    },
    getSecondLevel () {
      this.selectedLevel = this.getProyect.levels[1]._id
    },
    selectedColor (level) {
      if (this.selectedLevel == level) {
        return 'success'
      }
      return '#10173b'
    },
    LevelInfo (ID, number) {
      localStorage.selectedLevel = ID
      localStorage.level = number
    },
    statusColor (status) {
      if (status == 'disponible') return 'success'
      if (status == 'reservado') return 'danger'
      if (status == 'bloqueado') return 'grey'
    },
    sendToCompare (data) {
      this.$store.dispatch('enviar_a_comparador', data)
      this.$vs.notify({
        time: 8000,
        title: `${this.selected.length} enviado al Comparador.`,
        text: '☝ Puede visitar el comparador pulsando aquí.',
        color: 'success',
        iconPack: 'feather',
        icon: 'icon-copy',
        click: () => {
          router.push('/comparador')
        }
      })
      this.selected = []
    },
    selectApartament (aptID, aptNumber) {
      localStorage.apartamentID = aptID
      localStorage.apartamentNumber = aptNumber
    }
  },
  computed: {
    levelNumber () {
      return this.$store.state.ui.level
    },
    checkData () {
      if (this.getLevel == undefined) {
        return false
      } else {
        return true
      }
    },
    disponibles () {
      const apartamentosDisponibles = this.getLevel.inventory.filter(
        item => item.actual_state == 'Disponible'
      )
      return apartamentosDisponibles.length
    },
    reservados () {
      const apartamentosReservados = this.getLevel.inventory.filter(
        item => item.actual_state == 'Reservado'
      )
      return apartamentosReservados.length
    },
    bloqueados () {
      const apartamentosBloqueados = this.getLevel.inventory.filter(
        item => item.actual_state == 'Bloqueado'
      )
      return apartamentosBloqueados.length
    },
    mostrarDisponibles () {
      const apartamentosDisponibles = this.getLevel.inventory.filter(
        item => item.actual_state == 'Disponible'
      )
      return apartamentosDisponibles
    }
  },
  mounted () {
    this.openLoadingInDiv()
    setTimeout(() => {
      this.getFirstLevel()
      this.$vs.loading.close('#div-with-loading > .con-vs-loading')
    }, 1000)
  }
}
</script>

<style lang="scss">
.vs-list--title {
    font-weight: 500 !important;
}
.imgPlane {
  display: block;
  margin: 0 auto;
  margin-top: 5vh;
  margin-bottom: 6vh;
  height: 470px;
}

.quoteBtn {
  border-radius: 30px;
  width: 90%;
  font-weight: 400;
  -webkit-box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
  box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
}

@media (min-width: 320px) and (max-width: 480px) {
  .imgPlane {
    height: 300px;
  }
}
</style>