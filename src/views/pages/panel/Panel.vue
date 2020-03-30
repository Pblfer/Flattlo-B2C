<template>
    <div>
        <HeroComponent/>
    </div>
</template>

<script>
import HeroComponent from '@/components/LevelSelect/HeroComponent'
export default {
  data () {
    return {
      colorx:'#1877f2'
    }
  },
  components:{
    HeroComponent
  }
}
</script>

<style lang="scss" scoped>

</style>