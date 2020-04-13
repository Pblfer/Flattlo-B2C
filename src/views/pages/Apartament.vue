<template>
    <div>
        
        <apartamentShowCase/>
    </div>
</template>

<script>
import apartamentShowCase from '@/components/Apartament/ApartamentShowComponent'
export default {
  data () {
    return {
      showLoading: true
    }
            
  },
  components:{
    apartamentShowCase
  
  }
}
</script>
