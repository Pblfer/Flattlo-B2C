<template>
  <div class="h-screen flex w-full items-center justify-center" id="page-login">
    <div class="sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-1/2 xxl:w-3/4 sm:m-0 m-4">
      <vx-card class="CardLogin" card-background="#fff">
        <div slot="no-body">
          <div class="vx-row">
            <div class="hidden vx-col-1 lg:block lg:w-1/2">
              <swiper :options="swiperOption">
                <swiper-slide>
                  <img class="sideImgLogin" src="@/assets/images/pages/login/2.jpg" />
                </swiper-slide>
                <swiper-slide>
                  <img class="sideImgLogin" src="@/assets/images/pages/login/3.jpg" />
                </swiper-slide>
                <swiper-slide>
                  <img class="sideImgLogin" src="@/assets/images/pages/login/1.jpg" />
                </swiper-slide>
                <swiper-slide>
                  <img class="sideImgLogin" src="@/assets/images/pages/login/4.jpg" />
                </swiper-slide>

                <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
              </swiper>
            </div>
            <div class="vx-col-1 sm:w-full lg:block md:w-full lg:w-1/2">
              <img class="logoDeveloper" src="@/assets/images/cuarzo.jpg" />
              <div class="loginText">
                <p>Porque cotizar tu nueva etapa en la vida, nunca fue tan fácil.</p>
              </div>

              <vs-button
                :color="colorx"
                icon-pack="fab"
                icon="fa-facebook"
                @click="loginWithFacebook"
                ref="loadableButton" 
                id="button-with-loading" 
                class="vs-con-loading__container fbCustom"
              >Continuar con Facebook</vs-button>

              <div class="termsPlatform mt-6 mb-6">
                <span>Nuestra plataforma no almacena datos de tu perfil, unicamente datos básicos para mejorar tu experiencia.</span>
              </div>
              <vs-divider class="footerDivider"></vs-divider>
              <div class="poweredBy mt-2">
                <span>🚀 Powered by Flattlo.</span>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data () {
    return {
      colorx: "#1877f2",
      login: "Continuar con Facebook",
      FB: {},
      model: {},
      scope: {},
      uMail: "",
      uPass: "",
      recoverPass: true,
      v_uMail: false,
      v_uPass: false,
      rMail: "",
      v_rMail: false,
      emailVerificationMsg: false,
      checkbox_remember_me: false,
      checkBox1: null,
      backgroundLoading: "primary",
      colorLoading: "#ffffff",
      swiperOption: {
        centeredSlides: true,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    openLoadingContained(){
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      })
      setTimeout( ()=> {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
      }, 3000);
    },
    // Facebook login
    loginWithFacebook() {
      this.$store.dispatch("auth/loginWithFacebook", {
        notify: this.$vs.notify
      });
      this.openLoadingContained()
    },

    openLoadingContained() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      });
      this.ingresarUsuario();
      setTimeout(() => {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading");
      }, 3000);
    },
    validarCorreoRecuperacion() {
      if (this.uMail === "") {
        this.v_rMail = false;
      } else {
        this.v_rMail = true;
      }
    },
    openLoadingContainedRestorePass() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading2",
        scale: 0.45
      });
      setTimeout(() => {
        this.$vs.loading.close("#button-with-loading2 > .con-vs-loading");
      }, 4000);
      this.restablecerContraseña();
    }
  },
  watch: {
    uMail() {
      this.$validator.validate("mail").then(result => {
        if (result) {
          this.v_uMail = true;
        } else {
          this.v_uMail = false;
        }
      });
    },
    uPass() {
      this.$validator.validate("pass").then(result => {
        if (result) {
          this.v_uPass = true;
        } else {
          this.v_uPass = false;
        }
      });
    },
    rMail() {
      this.$validator.validate("correo").then(result => {
        if (result) {
          this.v_rMail = true;
        } else {
          this.v_rMail = false;
        }
      });
    }
  },
  computed: {
    desabilitar() {
      return this.v_uMail === true, this.v_uPass === true;
    },
    desabilitarRecuperacion() {
      return this.v_rMail === true;
    }
  }
};
</script>

<style lang="scss">
.loginText {
  margin: 35px;
  text-align: center;
  margin-top: 2px;
  font-size: 18px;
  font-weight: 500;
}

.termsPlatform {
  margin: 40px;
  text-align: center;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 400;
}

.poweredBy {
  padding: 14px;
  text-align: center;
  margin-top: 0px;
  font-size: 14px;
  font-weight: 500;
}

.logoDeveloper {
  display: block;
  margin: 0 auto;
  width: 70%;
  margin-top: 68px;
}

.fa-facebook {
  font-size: 18px;
  padding: 4px;
}

.fbCustom {
  margin: 0 auto;
  height: 60px;
  width: 300px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 40px;
  -webkit-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
}

.footerDivider {
  width: 82%;
  margin: 0 auto;
}

.CardLogin {
  -webkit-box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 1);
  -moz-box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 1);
  box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 1);
  border-radius: 6px;
}
[dir] .swiper-pagination-bullet-active {
  background: #fff !important;
}

#page-login {
  .btnCustom {
    width: 100%;
    margin-top: 36px;
    color: #000;
    font-weight: 500;
    border-radius: 22px;
  }
  .logoCustomLogin {
    display: block;
    margin: 0 auto;
    width: 80%;
    margin-top: 4vh;
  }
  .customLink {
    color: #b8b8b8 !important;
    font-size: 16px;
    cursor: pointer;
  }
  .customLink:hover {
    color: #fbdc11 !important;
    animation-delay: 1s;
  }
  .customWidthRestoreLink {
    font-weight: 500;
  }

  .sideImgLogin {
    object-fit: fill;
    width: 100%;
    min-height: 455px;
  }
  .cMargin {
    display: block;
    margin: 0 auto;
    width: 85%;
  }
  .carousel-example .swiper-container .swiper-slide {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 400px;
  }
  .vs-button:disabled {
    opacity: 0.2;
  }
  .vs-input--placeholder {
    color: #c1c1c1;
    font-weight: 600;
    font-size: 11px;
  }
}
#page-login {
  background: -moz-linear-gradient(
    296deg,
    #53fdc3 0%,
    #51ceec 100%
  ); /* ff3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #53fdc3),
    color-stop(100%, #51ceec)
  ); /* safari4+,chrome */
  background: -webkit-linear-gradient(
    296deg,
    #53fdc3 0%,
    #51ceec 100%
  ); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(
    296deg,
    #53fdc3 0%,
    #51ceec 100%
  ); /* opera 11.10+ */
  background: -ms-linear-gradient(296deg, #53fdc3 0%, #51ceec 100%); /* ie10+ */
  background: linear-gradient(154deg, #53fdc3 0%, #51ceec 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#53FDC3', endColorstr='#51CEEC',GradientType=0 ); /* ie6-9 */
}
</style>