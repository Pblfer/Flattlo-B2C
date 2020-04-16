<template>
  <div class="flex flex-wrap sm:full lg:w-full mt-4">
    <div
      class="p-4 sm:w-1/2 md:w-1/4 lg:w-3/2 xl:w-3/2 mt-3 p-2"
      :key="index"
      v-for="(q, index) in getFlattloAppUser.quotes"
    >
      <vx-card>
        <vs-chip :color="getColor(q.apartaments[0].actual_state)">{{q.apartaments[0].actual_state}}</vs-chip>
        <vs-row>
          <vs-col vs-offset="10">
            <vs-button
              v-if="q.favorite_quote === 'false' & q.apartaments[0].actual_state === 'Disponible' "
              size="large"
              class="flatHeartBtn pulseHearth"
              radius
              color="danger"
              type="flat"
              icon-pack="feather"
              icon="icon-heart"
              @click.native="popupActive3 = true, selectedCard = q._id"
            ></vs-button>
            <vs-button
              v-if="q.apartaments[0].actual_state === 'Reservado'"
              size="large"
              disabled
              class="flatHeartBtn"
              radius
              color="danger"
              type="flat"
              icon-pack="feather"
              icon="icon-heart"
              @click.native="popupActive3 = true"
            ></vs-button>
            <vs-button
              v-if="q.favorite_quote === 'true' "
              size="large"
              class="flatHeartBtn"
              radius
              color="danger"
              icon-pack="feather"
              icon="icon-heart"
              @click.native="popupActive4 = true, selectedCard = q._id"
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
          >Apartamento reservado 😮</vs-button>
        </div>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-button
              class="mt-8"
              type="line"
              line-position="top"
              icon-pack="feather"
              icon="icon-trash"
              line-origin="right"
              color="danger"
              @click.native="popupActive2 = true, selectedToDelete = q._id"
            >Eliminar</vs-button>
          </vs-col>
        </vs-row>
      </vx-card>
      <vs-popup classContent="popup-example" title="¿Deseas eliminar tu cotización?" :active.sync="popupActive2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button @click.native="deleteQuote()"  color="danger" icon-pack="feather" icon="icon-trash">Sí, eliminar</vs-button>
      </vs-col>
    </vs-popup>
    <vs-popup classContent="popup-example" title="¿Deseas enviar tu apartamento a favoritos? 👍👩‍💼👨‍💼" :active.sync="popupActive3">
       <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
       <h5 class="mb-4">{{getFirstName}}, deseas enviar tus datos para ser contactado por tu asesor.</h5>
       </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button @click.native="postToPipedrive(q.proyect_name, q.apartaments[0].number, q.bedrooms, q.living_square_mts, q.bathrooms, q._id, q.seller[0].pipedrive_id, q.seller[0]._id)" color="success" icon-pack="feather" icon="icon-check-circle">Enviar datos</vs-button>
      </vs-col>
    </vs-popup>
    <vs-popup classContent="popup-example" title="¿Deseas quitar esta cotización de favoritos?" :active.sync="popupActive4">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button @click="removeFromFavorites()"  color="danger" icon-pack="feather" icon="icon-heart">Sí, quitar</vs-button>
      </vs-col>
    </vs-popup>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import router from "../../router";
export default {
  data () {
    return {
      getFlattloAppUser: [],
      selectedCard: '',
      selectedToDelete: '',
      popupActive2: false,
      popupActive3: false,
      popupActive4: false
    }
  },
  apollo: {
    getFlattloAppUser: {
      query: gql`
        query($userUID: String!) {
          getFlattloAppUser(userUID: $userUID) {
            userUID
            first_name
            last_name
            email
            phone
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
                _id
                pipedrive_id
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
    postToPipedrive (proyect_name, number, bedrooms, sqm, bathrooms, q_id, pipedrive_id, seller_id) {   
      const formData = new FormData()
      const url = 'https://dev.flattlo.com/webhook-test/35/webhook/cuarzo'
      formData.append('first_name', this.getFlattloAppUser.first_name)
      formData.append('last_name', this.getFlattloAppUser.last_name)
      formData.append('phone', this.getFlattloAppUser.phone)
      formData.append('email', this.getFlattloAppUser.email)
      formData.append('quotes_before', (this.getFlattloAppUser.quotes.length - 1))
      formData.append('apartament_number', number)
      formData.append('bedrooms', bedrooms)
      formData.append('living_sqm', sqm)
      formData.append('bathrooms', bathrooms)
      formData.append('quote_flattlo_id', q_id)
      formData.append('proyect_name', proyect_name)
      formData.append('seller_pipedrive_id', pipedrive_id)

      fetch(url, {
        method: 'POST', 
        body: formData,
        mode: 'no-cors',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(
        this.popupActive3 = false,
        this.changeStatusFavoriteQuote(q_id),
        this.showHiddenQuoteToSeller(q_id, seller_id)
      )
    },
    deleteQuote () {
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
          quoteID: this.selectedToDelete
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
    changeStatusFavoriteQuote (quoteID) {
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
          favorite_quote: 'true',
          quoteID: this.selectedCard
        }
      })
        .then(() => {
          this.$vs.notify({
            title: 'Cotización en favoritos 🙌',
            text: 'Tu asesor te contratara pronto, para brindarte todos los detalles que necesites.',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })
         
        })
    },
    removeFromFavorites (){
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
          quoteID: this.selectedCard
        }
      })
        .then(() => {
          this.$vs.notify({
            title: 'Cotización removida de favoritos.',
            text: 'Tu cotizacion se ha eliminado de favoritos.',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })
          this.popupActive4 = false
        })
    },
    showHiddenQuoteToSeller (quoteID, seller_id) {
      this.$apollo.mutate({
        mutation: gql`mutation(
            $quoteID: String!,
            $sellerID: String!
          ){
            showHiddenQuoteToSeller(
                quoteID: $quoteID,
                sellerID: $sellerID
            ){
              _id
            }
          }
        `,
        variables:{
          sellerID: seller_id,
          quoteID
        }
      })
    },
    selectedQuote (id) {
      localStorage.selectedQuoteID = id;
      router.push(`/quote/${id}`);
    },
    getColor (status) {
      if (status == "Disponible") return "success";
      if (status == "Reservado") return "danger";
      if (status == "Bloqueado") return "dark";
    },
    fechaFormateada (fecha) {
      const nuevaFecha = new Date(fecha);
      let dd = nuevaFecha.getDate();
      let mm = nuevaFecha.getMonth() + 1;
      const yyy = nuevaFecha.getFullYear();

      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }

      const datefull = `${dd}/${mm}/${yyy}`;

      return datefull
    },
    getShortDate (value) {
      const d = new Date(value);
      const n = d.toLocaleDateString("en-US");
      return n;
    }
  },
  computed:{
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
.pulseHearth{
  animation: pulse 2s infinite;
  
}
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(250, 26, 26, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 10px rgba(204, 44, 44, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204, 44, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 44, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 44, 44, 0.6);
  }
  70% {
      -moz-box-shadow: 0 0 0 10px rgba(204, 44, 44, 0);
      box-shadow: 0 0 0 10px rgba(204, 44, 44, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204, 44, 44, 0);
      box-shadow: 0 0 0 0 rgba(204, 44, 44, 0);
  }
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
