<template>
  <div>
    <div class="flex mb-4">
  <div class="sm:w-full md:w-1/3">
  <div v-show="showModules">
      <h4 class="p-2">🎉 Buena elección {{getFirstName}},</h4>
      <vs-row vs-w="12" class="p-2">
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
        >
          <h5>Cotiza cuantas veces necesites, ningún vendedor te contactara por el momento, hasta que tú envíes la cotización a favoritos. 👆❤.</h5>
          <br />
        </vs-col>
      </vs-row>
    </div>
    <ProperySection v-show="showModules" />
    <NewClient v-show="!showModules" />
  </div>
  <div class="w-full showMoreOnQuote">
  <h4 class="p-2">📑 Tu cotización casi lista...</h4>
  <div class="p-4">
    <PrintedVisualizer/>
  </div>
  </div>
</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import ProperySection from '@/components/Quote/PropertyComponent'
import NewClient from '@/components/Quote/NewUser'
import PrintedVisualizer from '@/components/Quote/QuotePrintVisualizerComponent'


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
    NewClient,
    PrintedVisualizer
  },
  methods: {
    checkIfUserIsNew () {
      const user = firebase.auth().currentUser
      localStorage.userID = user.uid
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

<style lang="scss" >
@media (min-width: 320px) and (max-width: 766px) {
.showMoreOnQuote{
  display: none;
  }
}

</style>