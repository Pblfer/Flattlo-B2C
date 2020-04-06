<template>
  <div class="mt-8">
    <h5>👩‍💼👨‍💼💼 Asesor asignado:</h5>
    <vs-divider></vs-divider>
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-avatar size="98px" :src="getDeveloper.sellers_team[usr].pic"></vs-avatar>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="mt-2">
          <h5>{{getDeveloper.sellers_team[usr].first_name}} {{getDeveloper.sellers_team[usr].last_name}}</h5>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="mt-2">
          <vs-button @click.native="switchSeller" icon-pack="feather" size="small" icon="icon-refresh-cw">Rotar</vs-button>
        </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    data (){
        return{
            getDeveloper:[],
            usr:0
        }
    },
    apollo:{
        getDeveloper: {
      query: gql`
        query getDeveloperData($id: ID!) {
          getDeveloper(id: $id) {
            name
            phone
            email
            website
            address
            sellers_team{
              first_name
              last_name
              phone
              email
              pic
            }
          }
        }
      `,
      variables () {
        return {
          id: '5e7ab6acafe9ae00247ccef1'
        }
      },
      pollInterval: 500
    }
    },
    methods:{
        switchSeller() {
           let num = Math.floor (Math.random () * this.getDeveloper.sellers_team.length) + 1
           this.usr = num
           const payload = num
           this.$store.dispatch('vendedor_seleccionado', payload)
        }
    },
    mounted(){
        let num = Math.floor (Math.random () * this.getDeveloper.sellers_team.length) + 1
        this.usr = num
        const payload = num
        this.$store.dispatch('vendedor_seleccionado', payload)
    }
};
</script>

<style lang="scss" scoped>
</style>