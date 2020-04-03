<template>
  <div>
    <div v-show="showModules">
      <h4 class="p-2">🎉 Buena elección {{getFirstName}},</h4>
      <vs-row vs-w="12" class="p-2">
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="5"
          vs-sm="12"
          vs-xs="12"
        >
          <h5>Cotiza cuantas veces necesites, ningún vendedor te contactara por el momento, 😉🕵️‍♂️ hasta que tú envíes la cotización a favoritos. 👆❤.</h5>
          <br />
        </vs-col>
      </vs-row>
    </div>
    <ProperySection v-show="showModules" />
    <Resume v-show="showModules" />
    <NewClient v-show="!showModules" />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import ProperySection from '@/components/Quote/PropertyComponent'
import Resume from '@/components/Quote/ResumeQuote'
import NewClient from '@/components/Quote/NewUser'

export default {
  data () {
    return {
      showModules: false
    }
  },
  computed: {
    getFirstName () {
      return localStorage.firstNameUser
    }
  },
  components: {
    ProperySection,
    Resume,
    NewClient
  },
  methods: {
    checkIfUserIsNew () {
      const user = firebase.auth().currentUser
      console.log(user)
      if (user.emailVerified === false) {
        this.showModules = false
      } else {
        this.showModules = true
      }
    }
  },
  mounted () {
    this.checkIfUserIsNew()
  }
}
</script>

<style lang="scss" scoped>
</style>