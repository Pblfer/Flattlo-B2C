<template>
  <div>
    
   
    <div v-if="checkData">
      <vs-row>
      <vs-col vs-lg="6" vs-sm="12">
        <vx-card>
          <div class="p-8">
            <h5>🤩Estás en el nivel: {{numberOfLevel}}</h5>
            <vs-divider></vs-divider>
            <vs-chip class="m-1" color="danger">{{reservados}}</vs-chip>
            <vs-chip class="m-1" color="grey">{{bloqueados}}</vs-chip>
            <vs-chip class="m-1" color="success">Disponibles: {{disponibles}}</vs-chip>
            <vs-row class="w-full">
              <img class="imgPlane" :src="getLevel.plane_img_url" alt />
            </vs-row>
          </div>
        </vx-card>
      
      </vs-col>

      <vs-col vs-lg="6" vs-sm="12" >
        <vs-row vs-type="flex">
          <vs-col vs-lg="7" class="mt-6">
            <h5>👇😉 Selecciona tu apartamento:</h5>
          </vs-col>
          <vs-col vs-lg="2" vs-justify="flex-end" v-if="false">
            <vs-button
              icon-pack="feather"
              icon="icon-copy"
              v-if="!(selected == '')"
              color="success"
              @click="sendToCompare(selected)"
            >Comparar</vs-button>
          </vs-col>
        </vs-row>
        <vs-divider></vs-divider>
        <div class="vx-col w-full sm:w-full lg:w-2/4 mb-base">
                <vx-card class="mb-4" v-for="apartament in getLevel.inventory" :key="apartament._id">
                    <div>
                        <img  :src="apartament.plane_img" alt="content-img" class="responsive rounded-lg">
                    </div>
                    <vs-list-header icon-pack="feather" icon="icon-codepen" :title="`Apartamento: ${apartament.number}`" color="primary"></vs-list-header>
    <vs-list-item  icon="texture" :title="`Metraje: ${apartament.living_square_mts} m2`"></vs-list-item>
    <vs-list-item  icon="local_hotel" :title="`Dormitorios: ${apartament.bedrooms}`"></vs-list-item>
    <vs-list-item  icon="bathtub" :title="`Baños: ${apartament.bathrooms}`"></vs-list-item>

    <vs-row>
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
   <vs-button class="mt-8 mb-8 nextStepButton" icon-pack="feather"  text-color="#000" color="#fbdc11" >Cotizar</vs-button>
  </vs-col>
</vs-row>
                    
                </vx-card>
        </div>
      </vs-col>
    </vs-row>
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
            plane_img_url
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
          levelID: this.selectedLevel
        }
      },
      pollInterval: 350
    }
  },

  methods: {
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
        time:8000,
        title:`${this.selected.length} enviado al Comparador.`,
        text:'☝ Puede visitar el comparador pulsando aquí.',
        color:'success',
        iconPack: 'feather',
        icon:'icon-copy',
        click:() => {
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
.imgPlane {
  display: block;
  margin: 0 auto;
  margin-top: 5vh;
  margin-bottom: 6vh;
  height: 470px;
}


@media (min-width: 320px) and (max-width: 480px) {
  .imgPlane {
    height: 300px;
  }
}
</style>