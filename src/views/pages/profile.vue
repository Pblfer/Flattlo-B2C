<template>
  <div class="specialMargin">
    <div class="vx-col w-full mb-base">
      <vx-card slot="no-body" class="text-center bg-success-gradient greet-user">
        <img
          src="@/assets/images/elements/decore-left.png"
          class="decore-left"
          alt="Decore Left"
          width="175"
        />
        <img
          src="@/assets/images/elements/decore-right.png"
          class="decore-right"
          alt="Decore Right"
          width="180"
        />
        <vs-avatar class="mt-10 clientAvatar" :src="activeUserInfo.photoURL" size="142px"></vs-avatar>
        <h2 class="mt-4 mb-1 text-white">{{getFlattloAppUser.first_name}} {{getFlattloAppUser.last_name}}</h2>
        <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">{{getFlattloAppUser.email}}</p>

      </vx-card>

       <div class="fieldsForm">
         <h5 class="mt-12 m-2">Contacto para cotizaciónes:</h5>
      <vs-divider></vs-divider>

      <div class="flex mt-2">
        <div class="w-full m-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-user"
            label="Primer nombre"
            color="primary"
            type="text"
            :placeholder="getFlattloAppUser.first_name"
            v-model="N_first_name"
          />
        </div>
        <div class="sm:w-1/10 p-2 flex">
          <vs-button
            class="mt-6 mb-4 vs-con-loading__container"
            color="success"
            type="filled"
            icon-pack="feather"
            icon="icon-save"
            @click.native="updateUserProfile ('first_name', N_first_name, 'de primer nombre')"
            v-if="getFlattloAppUser.first_name != N_first_name & !N_first_name == ''"
          ></vs-button>
        </div>
      </div>

      <div class="flex mb-1">
        <div class="w-full m-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-users"
            label="Segundo nombre"
            color="primary"
            type="text"
            :placeholder="getFlattloAppUser.last_name"
            v-model="N_last_name"
          />
        </div>
        <div class="sm:w-1/10 p-2 flex">
          <vs-button
            class="mt-6 mb-4 vs-con-loading__container"
            color="success"
            type="filled"
            icon-pack="feather"
            icon="icon-save"
            v-if="getFlattloAppUser.last_name != N_last_name & !N_last_name == ''"
            @click.native="updateUserProfile ('last_name', N_last_name, 'de primer segundo nombre')" 
          ></vs-button>
        </div>
      </div>
      
      <div class="flex mb-1">
        <div class="w-full m-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-mail"
            label="Correo"
            color="primary"
            type="email"
            v-model="N_email"
            :placeholder="getFlattloAppUser.email"
          />
        </div>
        <div class="sm:w-1/10 p-2 flex">
          <vs-button
            class="mt-6 mb-4 vs-con-loading__container"
            color="success"
            type="filled"
            icon-pack="feather"
            icon="icon-save"
            v-if="getFlattloAppUser.email != N_email & !N_email == ''"
            @click.native="updateUserProfile ('email', N_email, 'de correo')" 
          ></vs-button>
        </div>
      </div>

      <div class="flex mb-1">
        <div class="w-full m-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-phone"
            label="Teléfono"
            type="number"
            v-model="N_phone"
            :placeholder="getFlattloAppUser.phone"
          />
        </div>
        <div class="sm:w-1/10 p-2 flex">
          <vs-button
            class="mt-6 mb-4 vs-con-loading__container"
            color="success"
            type="filled"
            icon-pack="feather"
            icon="icon-save"
            v-if="getFlattloAppUser.phone != N_phone & !N_phone == '' & N_phone.length == 8"
            @click.native="updateUserProfile ('phone', N_phone, 'de teléfono')" 
          ></vs-button>
        </div>
      </div>
      <vs-row>
      </vs-row>
       </div> 
      

    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
export default {
  data () {
    return {
      getFlattloAppUser:[],
      N_first_name: '',
      N_last_name: '',
      N_email: '',
      N_phone: ''
    }
  },
  apollo:{
    getFlattloAppUser: {
      query: gql`
        query($userUID: String!) {
          getFlattloAppUser(userUID: $userUID) {
            _id
            first_name
            last_name
            phone
            email
          }
        }
      `,
      variables: {
        userUID: localStorage.userID
      },
      pollInterval: 350
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods:{
    updateUserProfile (objectField, value, info) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $ID:ID!,
              $objectField:String!,
              $value:String!
            ){
              updateFlattloProfile(
                ID:$ID,
                objectField:$objectField,
                value:$value
              ){
                _id
              }
            }
          `,
          variables:{
            ID: this.getFlattloAppUser._id,
            objectField,
            value
          }
          
        }).then(() => {
          this.$vs.notify({
            title: '¡Edición correcta!',
            text: `El campo de ${info} fue editado correctamente.`,
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  components: {
    StatisticsCardLine
  }
};
</script>

<style lang="scss" scoped>
.vs-input--placeholder {
    color: rgba(0,0,0,1) !important;
}
.clientAvatar {
  border: solid 4px #fff;
  -webkit-box-shadow: 2px 7px 35px -13px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 7px 35px -13px rgba(0,0,0,0.75);
box-shadow: 2px 7px 35px -13px rgba(0,0,0,0.75);
}
.fieldsForm {
  width: 60%;
  display: block;
  margin: 0 auto;
}

.greet-user {
  position: relative;
  .decore-left {
    position: absolute;
    left: 0;
    top: 0;
  }
  .decore-right {
    position: absolute;
    right: 0;
    top: 0;
  }
}

@media (max-width: 576px) {
  .decore-left,
  .decore-right {
    width: 140px;
  }
  .specialMargin {
    width: 100%;
  }
}

@media (min-width: 320px) and (max-width: 480px) {

.fieldsForm {
  width: 98%;
  display: block;
  margin: 0 auto;
}
}
</style>