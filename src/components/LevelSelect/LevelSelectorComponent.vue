<template>
  <div>
    <vx-card>
      <div class="p-4">
        <h5 class="mb-1">{{getFirstName}},</h5>
        <h5>👇Por favor selecciona un nivel:</h5>

        <div class="mt-2">
          <vs-divider class="mt-2"></vs-divider>
        </div>
        <vs-button
          :color="selectedColor(level._id)"
          @click="selectedLevel = level._id, 
          numberOfLevel = level.number_of_level, 
          LevelInfo(level._id, level.number_of_level)"
          v-for="level in getProyect.levels"
          class="m-1"
          :key="level._id"
        >{{level.number_of_level}}</vs-button>
      </div>
    </vx-card>
    <br />
    <vx-card>
      <div v-if="checkData" class="mt-4">
        <h5>🧐🏢Disponibilidad en nivel {{numberOfLevel}}</h5>
        <h6 class="mt-1">Resumen de unidades disponibles:</h6>
        <vs-divider></vs-divider>
        <div class="mb-8">
          <vs-chip class="m-1" color="danger">{{reservados}}</vs-chip>
          <vs-chip class="m-1" color="success">Disponibles: {{disponibles}}</vs-chip>
        </div>
      </div>
      <br />
    </vx-card>
    <vs-row>
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
     <vs-button @click.native="saveLevel"  :to="{name: 'apartament-showcase'}"  class="mt-8 mb-8 nextStepButton" icon-pack="feather" icon="icon-arrow-right" icon-after size="large" text-color="#000" color="#fbdc11" >Continuar</vs-button>
  </vs-col>
</vs-row>
    <br />
    <div class="contained-example-container" v-if="!checkData">
      <div id="div-with-loading" class="vs-con-loading__container mt-4"></div>
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
      selectedLevel: '5db1fe83790dc5220037f041',
      numberOfLevel: 1,
      selected: []
    }
  },
  components: {
    'v-select': vSelect
  },
  apollo: {
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            levels {
              _id
              number_of_level
            }
          }
        }
      `,
      variables () {
        return {
          proyectID: '5e7aba5eafe9ae00247ccefa'
        }
      },
      pollInterval: 350
    },
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
    saveLevel () {
      localStorage.selectedLevel = this.selectedLevel
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
    getFirstName () {
      return localStorage.firstNameUser
    },
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
        item => item.actual_state === 'Disponible'
      )
      return apartamentosDisponibles.length
    },
    reservados () {
      const apartamentosReservados = this.getLevel.inventory.filter(
        item => item.actual_state === 'Reservado'
      )
      return apartamentosReservados.length
    },
    bloqueados () {
      const apartamentosBloqueados = this.getLevel.inventory.filter(
        item => item.actual_state === 'Bloqueado'
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

.nextStepButton{
    border-radius: 30px;
    width: 90%;
    font-weight: 400;
    -webkit-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
-moz-box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
box-shadow: -1px 10px 33px -4px rgba(0,0,0,0.18);
}

.vuesax-app-is-ltr .vs-chip--text {
    margin-left: 10px;
    font-size: 12px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .imgPlane {
    height: 300px;
  }
}

@media (min-width: 760px) and (max-width: 3066px) {
  .nextStepButton{
    width: 36.666%;

}
}
</style>