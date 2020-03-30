<template>
 <div>
   
 </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  computed: {
    // CART DROPDOWN
    cartItems () {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    }
  },
  methods: {
    removeItemFromCart (item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    }
  }
}

</script>
