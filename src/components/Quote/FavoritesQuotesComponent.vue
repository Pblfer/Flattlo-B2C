<template>
  <div class="flex flex-wrap sm:full lg:w-full mt-4" v-if="dataReady">
    <div
      class="p-4 sm:w-1/2 md:w-1/4 lg:w-3/2 xl:w-3/2 mt-3 p-2"
      :key="index"
      v-for="(q, index) in favorites"
    >
      <vx-card>
        <vs-chip :color="getColor(q.apartaments[0].actual_state)">{{q.apartaments[0].actual_state}}</vs-chip>
        <vs-row>
          <vs-col vs-offset="10">
            
            <vs-button
              v-if="q.favorite_quote === 'true'"
              size="large"
              class="flatHeartBtn"
              radius
              color="danger"
              icon-pack="feather"
              icon="icon-flag"
            ></vs-button>
          </vs-col>
        </vs-row>
        <img
          class="m-2 w-full"
          :src="q.apartaments[0].plane_img"
          :alt="`Apartamento de ${q.bedrooms} habitación y ${q.bathrooms} baños.`"
        />
        <div class="text-center">
          <h4>{{q.apartaments[0].number}}</h4>
          <p class="text-grey">{{q.proyect_name}}</p>
        </div>
        <div class="mb-4 mt-base"></div>
        <div class="flex justify-between flex-wrap">
          <vs-button
            v-if="q.apartaments[0].actual_state === 'Disponible'"
            class="mt-4 w-full"
            icon-pack="feather"
            icon="icon-file"
            type="border"
            color="primary"
            @click.native="selectedQuote(q._id)"
          >Ver mi cotización</vs-button>

          <vs-button
            v-if="q.apartaments[0].actual_state === 'Reservado'"
            class="mt-4 w-full"
            icon-pack="feather"
            icon="icon-alert-triangle"
            color="danger"
            disabled
            @click.native="selectedQuote(q._id)"
          >Apartamento reservado 🤔</vs-button>
        </div>
        <vs-divider class="mt-6"></vs-divider>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <h6 class="p-1">{{getFirstName}}, tu asesor te contactara pronto, no dudes en preguntarle todo lo que necesites. 😉📞✌☕☕⌚</h6>
          </vs-col>
        </vs-row>
        <vs-card class="mt-4">
         <div class="flex mt-2 mb-8">
  <div class="w-1/4 h-12">
  <vs-avatar size="58px" :src="q.seller[0].pic"></vs-avatar>
  </div>
   <div class="w-3/4 h-12">
   <h6 class="mt-4 m-1">{{q.seller[0].first_name}} {{q.seller[0].last_name}}</h6>
   <p class="mt-0 m-1">{{q.seller[0].email}}</p>
   </div>
</div>
</vs-card>
     
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-button
              class="mt-2"
              type="line"
              line-position="top"
              icon-pack="feather"
              icon="icon-x"
              line-origin="right"
              color="danger"
              @click.native="popupActive2 = true, selectedToRemove = q._id"
            >Eliminar</vs-button>
          </vs-col>
        </vs-row>
      </vx-card>
      <vs-popup classContent="popup-example" title="¿Deseas quitar esta cotización del listado de solicitud?" :active.sync="popupActive2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button @click.native="changeStatusFavoriteQuote()"  color="danger" icon-pack="feather" icon="icon-heart">Sí, quitar</vs-button>
      </vs-col>
    </vs-popup>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import router from '../../router'
export default {
  data () {
    return {
      getFlattloAppUser: [],
      selected: [],
      popupActive2: false,
      selectedToRemove: ''
    }
  },
  apollo: {
    getFlattloAppUser: {
      query: gql`
        query($userUID: String!) {
          getFlattloAppUser(userUID: $userUID) {
            _id
            userUID
            quotes {
              _id
              proyect_name
              quote_date_limit
              barCode
              bedrooms
              bathrooms
              living_square_mts
              favorite_quote
              quote_date_created
              apartaments {
                actual_state
                number
                plane_img
                actual_state
              }
              seller{
                first_name
                last_name
                pic
                email
              }
            }
          }
        }
      `,
      variables () {
        return {
          userUID: localStorage.userID
        }
      },
      pollInterval: 300
    }
  },
  methods: {
    changeStatusFavoriteQuote () {
      this.$apollo.mutate({
        mutation: gql`
          mutation($quoteID: ID!, $favorite_quote: String!){
          changeStatusFavoriteQuote(
              favorite_quote: $favorite_quote,
              quoteID: $quoteID
            ){
              _id
              apartaments{
                number
              }
            } 
            }
        `,
        variables:{
          favorite_quote: 'false',
          quoteID: this.selectedToRemove
        }
      })
        .then(() => {
          this.$vs.notify({
            title: 'Cotización eliminada de favoritos',
            text: 'Sigue cotizado para encontrar tu vivienda. 🤓',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-trash'
          })
          this.popupActive2 = false
        })
    },
    deleteQuote (quoteID) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($userUID: String!, $quoteID: ID!) {
            deleteFlattloUserQuote(userUID: $userUID, quoteID: $quoteID) {
              apartaments {
                number
              }
            }
          }
        `,
        variables:{
          userUID: localStorage.userID,
          quoteID
        }
      })
        .then(() => {
          this.$vs.notify({
            title: 'Cotización eliminada',
            text: '"La cotización fue eliminada de tus cotizaciones"',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-trash'
          })
          this.popupActive2 = false
        })
    },
    selectedQuote (id) {
      localStorage.selectedQuoteID = id
      router.push(`/quote/${id}`)
    },
    getColor (status) {
      if (status == 'Disponible') return 'success'
      if (status == 'Reservado') return 'danger'
      if (status == 'Bloqueado') return 'dark'
    },
    fechaFormateada (fecha) {
      const nuevaFecha = new Date(fecha)
      let dd = nuevaFecha.getDate()
      let mm = nuevaFecha.getMonth() + 1
      const yyy = nuevaFecha.getFullYear()

      if (dd < 10) {
        dd = `0${dd}`
      }

      if (mm < 10) {
        mm = `0${mm}`
      }

      const datefull = `${dd}/${mm}/${yyy}`

      return datefull
    },
    getShortDate (value) {
      const d = new Date(value)
      const n = d.toLocaleDateString('en-US')
      return n
    }
  },
  computed:{
    dataReady () {
      if (this.getFlattloAppUser.quotes === undefined) {
        return false
      } else {
        return true
      }
    },
    favorites () {
      const favoritesQuotes = this.getFlattloAppUser.quotes.filter(
        item => item.favorite_quote == 'true'
      )
      return favoritesQuotes
    },
    getFirstName () {
      return localStorage.firstNameUser
    }
  }
}
</script>

<style lang="scss">
.miniText {
  font-size: 10px;
}
.flatHeartBtn {
  height: 36px;
}

#data-list-thumb-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 0px;
      margin-right: 0px;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: left;
            }

            .proyect_Thumbnail {
              height: 110px;
            }
          }
        }
        td.td-check {
          padding: 10px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
    .dropdown-button-container {
      display: flex;
      align-items: center;

      .btnx {
        border-radius: 5px 0px 0px 5px;
      }

      .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
    .vs-checkbox-small .vs-checkbox--input:checked + .vs-checkbox .vs-icon {
      margin-top: 0vh !important;
    }
  }
}


</style>
