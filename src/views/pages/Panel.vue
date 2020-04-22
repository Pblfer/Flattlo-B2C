<template>
    <div>
      <div>
        <HeroComponent class="mb-8"/>
        <LevelSelector/>
      </div>
    </div>
</template>

<script>
import HeroComponent from '@/components/LevelSelect/HeroComponent'
import LevelSelector from '@/components/LevelSelect/LevelSelectorComponent'
import gql from 'graphql-tag'
export default {
  data () {
    return {
      colorx:'#1877f2'
    }
  },
  components:{
    HeroComponent,
    LevelSelector
  },
  methods: {
    checkIfUserIsNew () {
      if (localStorage.isUserNew === 'true') {
        this.createFlattloClient()
      } 
    },
    createFlattloClient () {
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation(
                      $email: String!
                      $first_name: String!
                      $last_name: String!
                      $phone: String!
                      $userUID: String!
                      
                      ){
                        newClientFlattlo(
                          email: $email,
                          first_name: $first_name,
                          last_name: $last_name,
                          phone: $phone,
                          userUID: $userUID
                        ){
                        _id
                      }
                    }`,
        // Parameters
        variables: {
          email: localStorage.emailUser,
          first_name: localStorage.firstNameUser,
          last_name: localStorage.lastNameUser,
          phone: '0000-0000',
          userUID: localStorage.userID
        }
                    
      }).then(() => {
        this.$vs.notify({
          time:4000,
          title:`Haz ingresado por primera vez ${localStorage.firstNameUser}`,
          text:'Te damos la bienvenida al mejor lugar para vivir. 🙌👏🎉',
          color:'primary'})
      })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  mounted () {
    this.checkIfUserIsNew()
  }
}
</script>

<style lang="scss" scoped>

</style>