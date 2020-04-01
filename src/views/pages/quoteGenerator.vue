<template>
  <div>
    <h4 class="p-2">🎉 Buena elección {{getFirstName}},</h4>
    <vs-row vs-w="12" class="p-2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12">
        <h5>Cotiza cuantas veces necesites, ningún vendedor te contactara por el momento, 😉🕵️‍♂️ hasta que tú envíes la cotización a favoritos. 👆❤.</h5>
        <br />
      </vs-col>
    </vs-row>
    <ClientSection />
    <ProperySection />
    <Resume />
  </div>
</template>

<script>
import ClientSection from '@/components/Quote/ClientComponent'
import ProperySection from '@/components/Quote/PropertyComponent'
import Resume from '@/components/Quote/ResumeQuote'

export default {
  data () {
    return {}
  },
  computed: {
    getFirstName () {
      return localStorage.firstNameUser
    }
  },
  components: {
    ClientSection,
    ProperySection,
    Resume
  }
}
</script>

<style lang="scss" scoped>
</style>