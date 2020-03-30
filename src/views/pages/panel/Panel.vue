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
export default {
  data () {
    return {
      colorx:'#1877f2'
    }
  },
  components:{
    HeroComponent,
    LevelSelector
  }
}
</script>

<style lang="scss" scoped>

</style>