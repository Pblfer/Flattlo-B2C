<template lang="html">
  <div class="demo-alignment">

  </div>
</template>

<script>
export default {
  data() {
    return {
      colorLoading: '#000',
    }
  },
  methods: {
    openLoadingColor() {
      this.$vs.loading({ 
          color: this.colorLoading,
          type: 'radius',
          background: '#52e7d6' })
    }
  },
  mounted(){
      this.openLoadingColor()
  }
}
</script>