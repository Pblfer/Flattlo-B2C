<template>
    <div>
              <div class="vx-col w-full mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                    <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="175" >
                    <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="180">
          <vs-avatar class="mt-8 clientAvatar" :src="activeUserInfo.photoURL" size="70px" ></vs-avatar>
          <h2 class="mt-4 mb-6 text-white">{{activeUserInfo.displayName}}</h2>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.</p>
        </vx-card>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
 
}
</script>

<style lang="scss" scoped>
.greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
</style>