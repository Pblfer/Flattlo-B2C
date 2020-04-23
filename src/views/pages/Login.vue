
<template>
<div>
  <div id="particles-js">
  <div class="flex w-full items-center justify-center" id="page-login">
    <div class="sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-1/2 xxl:w-3/4 sm:m-0 m-4">
      <vx-card class="CardLogin">
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
                icon="fa-google"
                @click="loginWithGoogle"
                ref="loadableButton" 
                id="button-with-loading" 
                class="vs-con-loading__container fbCustom"
              >Iniciar con Google</vs-button>

              <vs-button
                :color="colory"
                icon-pack="fab"
                icon="fa-apple"
                
                ref="loadableButton" 
                id="button-with-loading" 
                class="vs-con-loading__container msCustom"
              >Iniciar con Apple</vs-button>

              <div class="termsPlatform mt-6 mb-6">
                <span>Nuestra plataforma no almacena datos de tu perfil, unicamente datos básicos para mejorar tu experiencia.</span>
              </div>
              <vs-divider class="footerDivider"></vs-divider>
              <div class="poweredBy mt-2">
                <span>🚀 Powered by flattlo.</span>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  data () {
    return {
      colorx: '#4285f4',
      colory: '#000000',
      login: 'Continuar con Facebook',
      FB: {},
      model: {},
      scope: {},
      uMail: '',
      uPass: '',
      recoverPass: true,
      v_uMail: false,
      v_uPass: false,
      rMail: '',
      v_rMail: false,
      emailVerificationMsg: false,
      checkbox_remember_me: false,
      checkBox1: null,
      backgroundLoading: 'primary',
      colorLoading: '#ffffff',
      swiperOption: {
        centeredSlides: true,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    initParticlesJS () {
      /* eslint-disable */
      particlesJS('particles-js', {
        'particles': {
          'number': {
            'value': 90,
            'density': {
              'enable': true,
              'value_area': 500
            }
          },
          'color': {
            'value': '#ffffff'
          },
          'shape': {
            'type': 'circle',
            'stroke': {
              'width': 0,
              'color': '#000000'
            },
            'polygon': {
              'nb_sides': 5
            },
            'image': {
              'src': 'img/github.svg',
              'width': 100,
              'height': 100
            }
          },
          'opacity': {
            'value': 0.4,
            'random': false,
            'anim': {
              'enable': false,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': 8,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 20,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': true,
            'distance': 150,
            'color': '#ffffff',
            'opacity': 0.5,
            'width': 2
          },
          'move': {
            'enable': true,
            'speed': 2,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {
              'enable': false,
              'mode': 'grab'
            },
            'onclick': {
              'enable': true,
              'mode': 'push'
            },
            'resize': true
          },
          'modes': {
            'grab': {
              'distance': 800,
              'line_linked': {
                'opacity': 1
              }
            },
            'bubble': {
              'distance': 800,
              'size': 80,
              'duration': 2,
              'opacity': 0.8,
              'speed': 2
            },
            'repulse': {
              'distance': 400,
              'duration': 0.4
            },
            'push': {
              'particles_nb': 4
            },
            'remove': {
              'particles_nb': 2
            }
          }
        },
        'retina_detect': true
      })
    },
    openLoadingContained () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading',
        scale: 0.45
      })
      setTimeout(() => {
        this.$vs.loading.close('#button-with-loading > .con-vs-loading')
      }, 3000)
    },
    // Facebook login
    loginWithFacebook () {
      this.$store.dispatch('auth/loginWithFacebook', {
        notify: this.$vs.notify
      })
      this.openLoadingContained()
    },

    loginWithGoogle () {
      this.$store.dispatch('auth/loginWithGoogle', {
        notify: this.$vs.notify
      })
      this.openLoadingContained()
    },

    
    validarCorreoRecuperacion () {
      if (this.uMail === '') {
        this.v_rMail = false
      } else {
        this.v_rMail = true
      }
    },
    openLoadingContainedRestorePass () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading2',
        scale: 0.45
      })
      setTimeout(() => {
        this.$vs.loading.close('#button-with-loading2 > .con-vs-loading')
      }, 4000)
      this.restablecerContraseña()
    }
  },
  watch: {
    uMail () {
      this.$validator.validate('mail').then(result => {
        if (result) {
          this.v_uMail = true
        } else {
          this.v_uMail = false
        }
      })
    },
    uPass () {
      this.$validator.validate('pass').then(result => {
        if (result) {
          this.v_uPass = true
        } else {
          this.v_uPass = false
        }
      })
    },
    rMail () {
      this.$validator.validate('correo').then(result => {
        if (result) {
          this.v_rMail = true
        } else {
          this.v_rMail = false
        }
      })
    }
  },
  computed: {
    desabilitar () {
      return this.v_uMail === true, this.v_uPass === true
    },
    desabilitarRecuperacion () {
      return this.v_rMail === true
    }
  },
  mounted () {
    require('particles.js')
    this.$nextTick(() => {
      this.initParticlesJS()
    })
  }
}
</script>

<style lang="scss">
.particles-js-canvas-el{
  margin-top: -60.3333vh;
}
#particles-js{
  z-index: -1;
  background: -ms-linear-gradient(296deg, #53fdc3 0%, #51ceec 100%); /* ie10+ */
  background: linear-gradient(154deg, #53fdc3 0%, #51ceec 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#53FDC3', endColorstr='#51CEEC',GradientType=0 ); /* ie6-9 */
}
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
  width: 60%;
  margin-top: 50px;
}

.fa-google, .fa-apple {
  font-size: 18px;
  padding: 4px;
}

.fbCustom {
  margin: 0 auto;
  height: 48px;
  width: 80%;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 26px;
  -webkit-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
}

.msCustom {
  margin: 0 auto;
  height: 48px;
  width: 80%;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 10px;
  -webkit-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
  box-shadow: -1px 10px 48px -12px rgba(0, 0, 0, 0.42);
}

.footerDivider {
  width: 82%;
  margin: 0 auto;
}

.CardLogin {
  margin-top: 18vh;
  margin-bottom: -15vh;
  -webkit-box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 0.4);
  -moz-box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 0.4);
  box-shadow: 10px 10px 52px -18px rgba(36, 36, 36, 0.8);
  border-radius: 6px;
  z-index: 5;
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
    z-index: 5;
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

@media (min-width: 320px) and (max-width: 480px) {
    .particles-js-canvas-el{
      margin-top: -10vh;
    }
    .CardLogin {
      display: block;
      margin: 0 auto;
      margin-top: 16.777vh;
      width: 93.4%;
    }
    .fbCustom {
      width: 78%;
    }
    .loginText {
      font-size: 16px;
    }
    .fbCustom{
      margin-top: -10.333px;
    }
    .poweredBy {
    padding: 12px;
    font-size: 12px;
  }
 
  }

</style>