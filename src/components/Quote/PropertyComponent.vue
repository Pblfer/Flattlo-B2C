<template>
    <div class="flex mb-4">
      <div class="w-full p-2 mt-4 mb-6">
    <div class="mb-8">
      <h5>Datos de cotización:</h5>
      <vs-divider color="dark"></vs-divider>
      <div>
        <div class="w-full sm:w-full p-1 mt-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-user"
            label="Nombre"
            color="primary"
            v-model="getFlattloAppUser.first_name"
            type="text"
            disabled
          />
        </div>
        <div class="w-full sm:w-full p-1 mt-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-users"
            label="Apellido"
            color="primary"
            v-model="getFlattloAppUser.last_name"
            type="text"
            disabled
          />
        </div>
        <div class="w-full sm:w-full p-1 mt-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-mail"
            label="E-mail"
            color="primary"
            v-model="getFlattloAppUser.email"
            type="email"
            disabled
          />
        </div>
        
              <div class="w-full sm:w-full p-1 mt-1">
          <vs-input
            size="large"
            icon-pack="feather"
            class="w-full"
            icon="icon-phone"
            label="Teléfono"
            color="primary"
            v-model="getFlattloAppUser.phone"
            type="tel"
            disabled
          />
        </div>
      </div>
      
      <br/>  
    </div>
    <div>
      <div v-show="!getProyect.parkings.length == 0">
        <h5>Selección de parqueos:</h5>
      <vs-divider color="dark"></vs-divider>
      <vs-row class="p-2 mb-8">
        <vs-col v-show="!getProyect.parkings.length == 0" vs-type="flex flex-wrap" vs-w="12">
          <p>Selecciona un parqueo:</p>
          <v-select multiple label="number" v-model="selectedP" :options="getProyect.parkings"></v-select>
        </vs-col>
      </vs-row>
      </div>

      <div v-show="!getProyect.warehouses.length == 0">
        <h5>Selección de bodega:</h5>
      <vs-divider></vs-divider>
      <vs-row class="p-2 mb-8">
        <vs-col vs-type="flex flex-wrap" vs-w="12" >
          <p>Selecciona una bodega:</p>
          <v-select multiple label="number" v-model="selectedW" :options="getProyect.warehouses"></v-select>
        </vs-col>
      </vs-row>
      </div>


      <br/>
      <h5>Detalles de propiedad:</h5>
      <vs-divider color="dark"></vs-divider>
      <div class="p-2 mb-8">
        <vx-card>
          <h5 class="mt-2 mb-1">
            <strong>Valor de la propiedad:</strong>
          </h5>
          <p
            class="valueText"
          >Q. {{getApartament.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}.00</p>
        </vx-card>
        <br />
        <vx-card>
          <h5 class="mt-4 mb-1">
            <strong>Impuestos:</strong>
          </h5>
          <p class="valueText">
            Q.{{getValueStamps.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}-
            <strong>Valor de Timbres</strong>
          </p>
          <p class="valueText">
            Q.{{getIva.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} -
            <strong>Valor de IVA</strong>
          </p>
        </vx-card>
      </div>
      <br/>
      <h5>Monto de reserva:</h5>
      <vs-divider color="dark"></vs-divider>
      <vs-alert
        v-if="false"
        icon-pack="feather"
        color="success"
        icon="icon-star"
        class="mt-2"
      >Excelente, el valor cubre la firma promesa y el restante es restado del enganche fraccionado.</vs-alert>

      <h6>
        {{getFirstName}}, te dejamos un
        <strong>típ</strong>. ✌ Si tu presupueso lo permite, puedes ingresar un valor más grande al valor mínimo de reserva, esto te ayudara a reducir tu total de enganche ó cubrir parte de tu firma promesa y lo veras reflejado en la cotización generada. 😉
      </h6>
      <div class="mt-3 mb-8">
        <vs-input
          :success="confirmReserve"
          :danger="!confirmReserve"
          :danger-text="`Monto mínimo para reserva es de: Q. ${getApartament.reserve_price}`"
          :success-text="`El monto ingresado de: Q. ${rClientFixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00 es correcto.`"
          placeholder="Valor sín decimales"
          val-icon-danger="clear"
          val-icon-success="check"
          label="Ingresa el monto de reserva:"
          class="fZise"
          v-model="rClient"
          type="number"
        />
      </div>
      <br/>
      <h5>Enganche fraccionado:</h5>
      <vs-divider color="dark"></vs-divider>

      <vs-input
        :success="reserveField"
        :success-text="`El enganche establecido es de: Q.${(minPorcent - getApartament.reserve_price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
        val-icon-danger="clear"
        val-icon-success="check"
        disabled="true"
        label="Enganche establecido:"
        aria-placeholder
        class="fZise p-2 mb-6"
        v-model="depositClient"
      />
      <vs-alert icon-pack="feather" color="primary" icon="icon-calendar" class="mt-2 mb-4">
        La cantidad máxima de meses de enganche fraccionado es de:
        <strong>{{getProyect.fraction_reserved}} meses</strong>.
      </vs-alert>
      <h6>{{getFirstName}}, ¿En cuantos meses deseas fraccionar tu enganche?</h6>

      <vs-row class="p-4 mb-2">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-input-number
            class="selectorMonth"
            min="0"
            :max="getProyect.fraction_reserved"
            v-model="monthMax"
          />
        </vs-col>
      </vs-row>
     
      <br/>
      <div class="mb-8">
        <h5>Financiamiento:</h5>
      <vs-divider color="dark"></vs-divider>
      <ul class="centerx flex flex-wrap">
      <li>
          <vs-radio
            color="success"
            v-model="finType"
            @click.native="yearsFinancing= 0"
            class="m-4 mb-4"
            vs-value
          >Ninguno</vs-radio>
        </li>
        <li>
          <vs-radio
            color="success"
            v-model="finType"
            v-for="f in getProyect.financing_types"
            :key="f._id"
            @click.native="yearsFinancing= 0 , yearsFinancing = f.years_max, entity= '', entity = f.name, finType= 0, finType = f.interest_rate "
            class="m-4 mb-4"
            :vs-value="f.interest_rate"
          >{{f.name}}</vs-radio>
        </li>
      </ul>
      <vs-alert
        icon-pack="feather"
        color="success"
        v-if="!(finType === '')"
        icon="icon-info"
        class="mt-4"
      >
        La tasa de interes de la entidad seleccionada es de:
        <strong>{{finType}}%</strong>.
      </vs-alert>
      <vs-alert
        icon-pack="feather"
        color="primary"
        v-if="!(yearsFinancing === 0)"
        icon="icon-calendar"
        class="mt-4 mb-8"
      >
        Los cantidad máxima de años en financiamiento es de:
        <strong>{{yearsFinancing}} años</strong>.
      </vs-alert>
       <h6>{{getFirstName}}, ¿A cuantos años deseas tu financiamiento?</h6>

      <vs-row class="p-4 mb-2">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-input-number
            class="selectorMonth"
            min="0"
            :max="yearsFinancing"
            v-model="yearMax"
          />
        </vs-col>
      </vs-row>
        <sellerSwitcher/>
      </div>
        <Resume  v-if="isReadyToShowResume"/>
    </div>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          v-if="isReadyToShowResume"
          ref="loadableButton"
          id="button-with-loading"
          class="vs-con-loading__container mb-8 quoteBtn"
          @click.native="openLoadingContained"
                size="large"
                text-color="#000"
                color="#fbdc11"
                icon-pack="feather"
                icon="icon-check-circle"
        >Guardar Cotización</vs-button>
      </vs-col>

           
            <!-- {{getDeveloper.name}}
            {{getRandomNumber}}
            {{getRequestDate}}
            {{getLimitDate}}
            {{ObtenerDescuento}}
            {{ObtenerEngacheEstablecido}}
            {{firmaPromesa}}
            {{obtenerResultadoEnganche}}
            {{obtenerMesesEnganche}}
            {{ObtenerCuotaEnganche}}
            {{getApartament.price}}
            {{sumP}}
            {{sumW}}
            {{getImpuestos}}
            {{totalValue}}
            {{obtenerValoreFinanciamiento.entity}}
            {{totalFinanciamiento}}
            {{obtenerValoreFinanciamiento.interestEntity}}
            {{obtenerValoreFinanciamiento.yearsFinancingSelected}}
            {{ObtenerCuotaNivelada}}
            {{getApartament.proyect_name}}
            {{getApartament.living_square_mts}}
            {{getApartament.bedrooms}}
            {{getApartament.bathrooms}}
            {{getProyect.lat}}
            {{getProyect.long}}
            {{getProyect.deposit_percent}}
            {{getProyect.quote_logo}}
            {{getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].pic}} -->
  </div>
    </div>
  
</template>

<script>
import gql from 'graphql-tag'
import vSelect from 'vue-select'
import Resume from '@/components/Quote/ResumeQuote'
import sellerSwitcher from '@/components/Quote/SelerTeamSwitcherComponent'
import JsBarcode from 'jsbarcode'
import router from '@/router'
export default {
  data () {
    return {
      sale: '0',
      finType: '',
      depositClient: null,
      rClient: null,
      familyRev: null,
      entity: '',
      financingID: null,
      minFamilyRev: 30000,
      confirmDeposit: false,
      confirmReserve: false,
      confirmRev: true,
      reserveField: true,
      rClientFixed: 0,
      selectedW: [],
      selectedP: [],
      yearMax: 0,
      monthMax: 0,
      yearsFinancing: 0,
      first_name: '',
      last_name: '',
      user_email: '',
      user_phone: '',
      getFlattloAppUser: [],
      getProyect:[],
      getApartament:[],
      getDeveloper: [],
      engancheCubierto: false,
      date: '',
      randomNum: '',
      propDataReady: false,
      setMonth: 0,
      firmaPromesaCubierta: false,
      saldoFavorFirmaPromesa: 0,
      saldoFavorEngancheFraccionado: 0,
      backgroundLoading: 'success',
      colorLoading: '#fff'
    }
  },
  components: {
    'v-select': vSelect,
    Resume,
    sellerSwitcher
  },
  computed: {
    ObtenerVendedorEstablecido () {
      return this.$store.state.quote_data.sellerSected
    },
    isReadyToShowResume () {
      
      if (this.confirmReserve === true) {
        return true
      } else {
        return false  
      }
      
    },
    getFirstName () {
      return localStorage.firstNameUser
    },
    totalValue () {
      return (
        parseInt(this.getApartament.price) +
        this.getValueStamps +
        this.getIva -
        parseInt(this.sale) +
        parseInt(this.sumP) +
        parseInt(this.sumW)
      )
    },
    sumP () {
      return this.selectedP.reduce((a, i) => a + i.price, 0)
    },
    sumW () {
      return this.selectedW.reduce((a, i) => a + i.price, 0)
    },
    minPorcent () {
      return (
        (this.getApartament.price + this.sumW + this.sumP) *
        (this.getProyect.deposit_percent / 100)
      )
    },
    checkData () {
      if (this.depositClient >= this.minPorcent) {
        return false
      } else {
        return true
      }
    },
    getValueStamps () {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.3 * 0.03
    },
    getIva () {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.7 * 0.12
    },
    getImpuestos () {
      return this.getValueStamps + this.getIva
    },
    getDate () {
      const time = new Date()
      return time
    },
    getLimitDate () {
      const newdate = new Date()

      newdate.setDate(
        this.getDate.getDate() + this.getProyect.max_days_limit_for_quote
      )

      const dd = newdate.getDate()
      const mm = newdate.getMonth() + 1
      const y = this.getDate.getFullYear()

      const someFormattedDate = `${dd  }/${  mm  }/${  y}`
      return someFormattedDate
    },
    getRequestDate () {
      let today = new Date()
      const dd = today.getDate()
      const mm = today.getMonth() + 1 
      const yyyy = today.getFullYear()
      
      today = `${dd}/${mm}/${yyyy}`
      return today
    },
    ObtenerEngacheEstablecido () {
      return this.$store.state.quote_data.financingValues.reservePrice
    },
    
    firmaPromesa () {
      const value =
        (this.getApartament.price + this.sumP + this.sumW) * 0.03 -
        this.ObtenerEngacheEstablecido
      this.valorFirmaSaldo(value)
      return value
    },
    obtenerResultadoEnganche () {
      const vt =
        ((this.getApartament.price + (this.sumP + this.sumW)) *
          this.getProyect.deposit_percent) /
        100
      const r = this.ObtenerEngacheEstablecido
      const fp = this.firmaPromesa
      const sf = this.saldoFavorFirmaPromesa
      const total = vt - r - fp - sf
      this.saldoFavorEnganche(total)
      return total
    },

    ObtenerDescuento () {
      return this.$store.state.quote_data.discount_amount
    },
    obtenerEngancheMinimo () {
      return (
        this.$store.state.quote_data.depositValues.minDeposit -
        this.firmaPromesa -
        this.getApartament.reserve_price
      )
    },
    ObtenerParqueos () {
      return this.$store.state.quote_data.parkings
    },
    ObtenerBodegas () {
      return this.$store.state.quote_data.warehouses
    },
    getRandomNumber () {
      const d = new Date().getDate().toString()
      const s = new Date().getSeconds()
      const ms = new Date().getMilliseconds()
      const pID = '5e7ab76bafe9ae00247ccef4'
      return d + s + ms + pID.slice(0, 4)
    },
    ObtenerCuotaEnganche () {
      const valorCuotaFixed =
        this.obtenerResultadoEnganche / this.obtenerMesesEnganche
      return valorCuotaFixed
    },
    obtenerMesesEnganche () {
      return this.$store.state.quote_data.depositValues.monthDeposit
    },
    ObtenerCuotaNivelada () {
      const cuotaNivelada =
        (this.totalFinanciamiento *
          (this.obtenerValoreFinanciamiento.interestEntity / 1200)) /
        (1 -
          Math.pow(
            1 + this.obtenerValoreFinanciamiento.interestEntity / 1200,
            -(this.obtenerValoreFinanciamiento.yearsFinancingSelected * 12)
          ))
      return cuotaNivelada
    },
    equalDataDeposit () {
      if (this.obtenerEngancheMinimo == this.obtenerEngancheCliente) {
        return false
      } else {
        return true
      }
    },
    totalFinanciamiento () {
      const vt =
        ((this.getApartament.price + this.sumW + this.sumP) *
          this.getProyect.deposit_percent) /
        100
      const r = this.saldoFavorEngancheFraccionado
      return this.totalValue - vt - r
    },
    obtenerRestante () {
      return (this.obtenerEngancheCliente - this.obtenerEngancheMinimo)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    obtenerValoreFinanciamiento () {
      return this.$store.state.quote_data.financingValues
    }
  },
  watch: {
    rClient () {
      if (this.rClient >= this.getApartament.reserve_price) {
        const payload = this.rClient
        this.confirmReserve = true
        this.rClientFixed = this.rClient
        this.$store.dispatch('reserva_establecida', payload)
        const engancheFraccionado =
          this.minPorcent - this.getApartament.reserve_price
        this.depositClient = engancheFraccionado
      } else {
        this.confirmReserve = false
      }
    },
    yearMax () {
      const payload = {
        yearsFinancingSelected: this.yearMax
      }
      this.$store.dispatch('Años_Financiamiento_Bancario', payload)
    },
    entity () {
      const payload = {
        entity: this.entity,
        interestEntity: this.finType,
        yearsFinancingSelected: this.yearsFinancing
      }
      this.$store.dispatch('Financiamiento_Bancario', payload)
    },
    monthMax () {
      const payload = this.monthMax
      this.$store.dispatch('Meses_Enganche', payload)
    },
    familyRev () {
      if (parseInt(this.familyRev) <= this.minFamilyRev) {
        this.confirmRev = false
      } else {
        this.confirmRev = true
      }
    },
    sale () {
      const payload = {
        discount_amount: this.sale
      }
      this.$store.dispatch('Descuento_seleccionado', payload)
    },
    selectedP () {
      const payload = this.selectedP
      this.$store.dispatch('Parqueo_Seleccionado', payload)
    },
    selectedW () {
      const payload = this.selectedW
      this.$store.dispatch('Bodega_Seleccionada', payload)
    },
    depositClient () {
      if (
        parseInt(this.depositClient) >=
        this.minPorcent - this.getApartament.reserve_price
      ) {
        this.confirmDeposit = true
        const payload = {
          depositClient: this.depositClient,
          minDeposit: this.minPorcent
        }
        this.$store.dispatch('Enganche_Cliente', payload)
      } else {
        this.confirmDeposit = false
      }
    }
    
  },
  apollo: {
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            fraction_reserved
            lat
            long
            quote_logo
            max_days_limit_for_quote
            deposit_percent
            parkings {
              _id
              number
              price
            }
            warehouses {
              _id
              number
              price
            }
            discounts {
              _id
              name
              discount_amount
            }
            financing_types {
              _id
              name
              interest_rate
              years_max
            }
            
          }
        }
      `,
      variables () {
        return {
          proyectID: '5e7aba5eafe9ae00247ccefa'
        }
      },
      pollInterval: 300
    },
    getApartament: {
      query: gql`
        query($apartamentID: String!) {
          getApartament(apartamentID: $apartamentID) {
           living_square_mts
            bedrooms
            number
            bathrooms
            plane_img
            price
            reserve_price
            proyect_name

          }
        }
      `,
      variables () {
        return {
          apartamentID: localStorage.selectedApartament
        }
      },
      pollInterval: 700
    },
    getFlattloAppUser: {
      query: gql`
        query($userUID: String!) {
          getFlattloAppUser(userUID: $userUID) {
            first_name
            last_name
            phone
            email
          }
        }
      `,
      variables () {
        return {
          userUID: localStorage.userID
        }
      },
      pollInterval: 350
    },
    getDeveloper: {
      query: gql`
        query getDeveloperData($id: ID!) {
          getDeveloper(id: $id) {
            name
            phone
            email
            website
            address
            sellers_team{
              first_name
              last_name
              phone
              email
              pic
            }
          }
        }
      `,
      variables () {
        return {
          id: '5e7ab6acafe9ae00247ccef1'
        }
      },
      pollInterval: 500
    }
  },
  methods:{
    createQuote () {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $userUID: String!
              $developerCompanyName: String!
              $barCode: String!
              $quote_date_created: String
              $quote_date_limit: String
              $discount_mount: Int
              $reserve_mount: Int
              $promise_sign_mount: Float
              $fraction_total_mount: Float
              $fraction_month_selected: Int
              $fraction_fee_mount: Float
              $property_value: Int
              $parkings_mount: Int
              $warehouses_mount: Int
              $taxes_mount: Float
              $total_mount: Float
              $financing_name: String
              $financing_total_mount: Float
              $financing_interest_rate: Float
              $financing_years_selected: Int
              $financing_fee_mount: Float
              $proyect_name: String
              $living_square_mts: Float
              $bedrooms: Int
              $bathrooms: Int
              $lat: Float
              $long: Float
              $logo_quote_proyect: String
              $deposit_percent: Int!
              $developer_name: String
              $developer_phone: String
              $developer_email: String
              $developer_website: String
              $developer_address: String
              $seller_first_name: String
              $seller_last_name: String
              $seller_phone: String
              $seller_email: String
              $seller_pic: String
            ) {
              newQuotetoFlattloUser(
                userUID: $userUID
                developerCompanyName: $developerCompanyName
                barCode: $barCode
                quote_date_created: $quote_date_created
                quote_date_limit: $quote_date_limit
                discount_mount: $discount_mount
                reserve_mount: $reserve_mount
                promise_sign_mount: $promise_sign_mount
                fraction_total_mount: $fraction_total_mount
                fraction_month_selected: $fraction_month_selected
                fraction_fee_mount: $fraction_fee_mount
                property_value: $property_value
                parkings_mount: $parkings_mount
                warehouses_mount: $warehouses_mount
                taxes_mount: $taxes_mount
                total_mount: $total_mount
                financing_name: $financing_name
                financing_total_mount: $financing_total_mount
                financing_interest_rate: $financing_interest_rate
                financing_years_selected: $financing_years_selected
                financing_fee_mount: $financing_fee_mount
                proyect_name: $proyect_name
                living_square_mts: $living_square_mts
                bedrooms: $bedrooms
                bathrooms: $bathrooms
                lat: $lat
                long: $long
                logo_quote_proyect: $logo_quote_proyect
                deposit_percent: $deposit_percent
                developer_name: $developer_name
                developer_phone: $developer_phone
                developer_email: $developer_email
                developer_website: $developer_website
                developer_address: $developer_address
                seller_first_name: $seller_first_name
                seller_last_name: $seller_last_name
                seller_phone: $seller_phone
                seller_email: $seller_email
                seller_pic: $seller_pic
              ) {
                _id
              }
            }
          `,
          variables: {
            userUID: localStorage.userID,
            developerCompanyName: this.getDeveloper.name,
            barCode: this.getRandomNumber,
            quote_date_created: this.getRequestDate,
            quote_date_limit: this.getLimitDate,
            discount_mount: this.ObtenerDescuento,
            reserve_mount: this.ObtenerEngacheEstablecido,
            promise_sign_mount: this.firmaPromesa,
            fraction_total_mount: this.obtenerResultadoEnganche,
            fraction_month_selected: this.obtenerMesesEnganche,
            fraction_fee_mount: this.ObtenerCuotaEnganche,
            property_value: this.getApartament.price,
            parkings_mount: this.sumP,
            warehouses_mount: this.sumW,
            taxes_mount: this.getImpuestos,
            total_mount: this.totalValue,
            financing_name: this.obtenerValoreFinanciamiento.entity,
            financing_total_mount: this.totalFinanciamiento,
            financing_interest_rate: this.obtenerValoreFinanciamiento.interestEntity,
            financing_years_selected: this.obtenerValoreFinanciamiento.yearsFinancingSelected,
            financing_fee_mount: this.ObtenerCuotaNivelada,
            proyect_name: this.getApartament.proyect_name,
            living_square_mts: this.getApartament.living_square_mts,
            bedrooms: this.getApartament.bedrooms,
            bathrooms: this.getApartament.bathrooms,
            lat: this.getProyect.lat,
            long: this.getProyect.long,
            logo_quote_proyect: this.getProyect.quote_logo,
            deposit_percent: this.getProyect.deposit_percent,
            developer_name: this.getDeveloper.name,
            developer_phone: this.getDeveloper.phone,
            developer_email: this.getDeveloper.email,
            developer_website: this.getDeveloper.website,
            developer_address: this.getDeveloper.address,
            seller_first_name: this.getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].first_name,
            seller_last_name: this.getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].last_name,
            seller_phone: this.getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].phone,
            seller_email: this.getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].email,
            seller_pic: this.getDeveloper.sellers_team[this.ObtenerVendedorEstablecido].pic
          }
        })
        .then(data => {
          this.addClientToQuote(data.data.newQuotetoFlattloUser._id)
          this.addApartamentToQuote(data.data.newQuotetoFlattloUser._id)
          this.addParkingToQuote(data.data.newQuotetoFlattloUser._id)
          this.addWarehouseToQuote(data.data.newQuotetoFlattloUser._id)
          this.$vs.loading.close('#button-with-loading > .con-vs-loading')
          this.$vs.notify({
            title: '¡Cotización guardada!',
            text: '"La cotización fue almacenada en tus cotizaciones"',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })

          router.push('/quotes')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addClientToQuote (quoteID) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($userUID: String!, $quoteID: String!) {
              addQuoteToFlattloUser(userUID: $userUID, quoteID: $quoteID) {
                _id
              }
            }
          `,
          variables: {
            userUID: localStorage.userID,
            quoteID
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addApartamentToQuote (quoteID) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($quoteID: String!, $apartamentID: String!) {
            addApartamentToQuote(
              quoteID: $quoteID
              apartamentID: $apartamentID
            ) {
              _id
            }
          }
        `,
        variables: {
          quoteID,
          apartamentID: localStorage.selectedApartament
        }
      })
    },
    addParkingToQuote (quoteID) {
      this.ObtenerParqueos.forEach(element => {
        this.$apollo.mutate({
          mutation: gql`
            mutation($quoteID: String!, $parkingID: String!) {
              addParkingToQuote(quoteID: $quoteID, parkingID: $parkingID) {
                _id
              }
            }
          `,
          variables: {
            quoteID,
            parkingID: element._id
          }
        })
      })
    },
    addWarehouseToQuote (quoteID) {
      this.ObtenerBodegas.forEach(element => {
        this.$apollo.mutate({
          mutation: gql`
            mutation($quoteID: String!, $warehouseID: String!) {
              addWarehouseToQuote(
                quoteID: $quoteID
                warehouseID: $warehouseID
              ) {
                _id
              }
            }
          `,
          variables: {
            quoteID,
            warehouseID: element._id
          }
        })
      })
    },
    openLoadingContained () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading',
        scale: 0.45
      })
      this.createQuote()
    },
    saldoFavorEnganche (value) {
      if (value <= 0) {
        this.engancheCubierto = true
        this.saldoFavorEngancheFraccionado = value * -1
      } else {
        this.engancheCubierto = false
        this.saldoFavorEngancheFraccionado = 0
      }
    },
    valorFirmaSaldo (value) {
      if (value <= 0) {
        this.firmaPromesaCubierta = true
        const saldo = value * -1
        this.saldoFavorFirmaPromesa = saldo
      } else {
        this.firmaPromesaCubierta = false
        this.saldoFavorFirmaPromesa = 0
      }
    }
  },
  mounted () {
    setTimeout(() => {
      JsBarcode('#barcode', this.getRandomNumber, {
        lineColor: '#000000',
        height: 26,
        displayValue: false
      })
    }, 800)
  }
}
</script>

<style lang="scss">
.vs-input-number button {
  min-width: 32px;
  min-height: 32px;
}

.vs__selected {
    background-color: #fbdc11;
    font-weight: 500;
}

.vs-input-number .vs-input-number--input {
  min-width: 100%;
}

.con-text-validation .span-text-validation {
  font-size: 14px;
}
.valueText {
  font-size: 15px;
}
.fZise {
  width: 100%;
}
.selectorMonth {
  width: 80%;
}
.vs-input--label {
  font-size: 0.9rem !important;
  color: #000;
}

.vs-input--icon {
  color: #000 !important;
}

.continueButton{
  border-radius: 30px;
}
</style>