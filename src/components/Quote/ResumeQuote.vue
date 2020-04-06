
<template>
  <div class="showResumeOnQuote">
    <h5>🤯 Te dejamos un resumen:</h5>
      <vs-divider></vs-divider>
      <vx-card>
          <!-- <h5 class="mt-2 mb-1">
            <strong>No. Cotización:</strong>
          </h5>
          <p
            class="valueText"
          ># {{getRandomNumber}}</p> -->
          <h5 class="mt-4 mb-1">
            <strong>Fecha de Solicitud:</strong>
          </h5>
          <p
            class="valueText"
          >{{getRequestDate}}</p>
          <h5 class="mt-4 mb-1">
            <strong>Fecha máxima de aceptación:</strong>
          </h5>
          <p
            class="valueText"
          >{{getLimitDate}}</p>
          <!-- <h5 class="mt-4 mb-1">
            <strong>Tus Datos:</strong>
          </h5>
          <p class="valueText">{{ObtenerCliente.first_name}}</p>
          <p class="valueText">{{ObtenerCliente.last_name}}</p>
          <p class="valueText">{{ObtenerCliente.email}}</p>
          <p class="valueText">{{ObtenerCliente.phone}}</p> -->
          <h5 class="mt-4 mb-1">
            <strong>Detalles de la propiedad:</strong>
          </h5>
          <p class="valueText">Apartamento: {{getApartament.number}}</p>
          <p class="valueText">Area: {{getApartament.living_square_mts}} m2</p>
          <p class="valueText">Habitaciones: {{getApartament.bedrooms}}</p>
          <p v-show="!(ObtenerParqueos.length == 0)" class="valueText">Parqueos: {{ObtenerParqueos.length}}</p>
          <p v-show="!(ObtenerBodegas.length == 0)" class="valueText">Bodegas: {{ObtenerBodegas.length}}</p>
            <h5 class="mt-4 mb-1">
           <strong>Valor propiedad:</strong>
          </h5>
          <p class="valueText">Apartamento: Q. {{ getApartament.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
          <p v-show="!(ObtenerParqueos.length == 0)" class="valueText">Parqueos: Q.{{sumP.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
          <p v-show="!(ObtenerBodegas.length == 0)" class="valueText">Bodegas: Q. {{sumW.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
          <p class="valueText">Impuestos: Q. {{ getImpuestos.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p> 
          <p class="valueText"><strong>Total: Q. {{ totalValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</strong></p>   
           
           <h5 class="mt-6">🤓🧾📊Conoce el desgloce de pagos, generado tu cotización.</h5>
             <!-- <h5 class="mt-5 mb-1">
           <strong>Reserva:</strong>
          </h5>
          <p class="valueText">Monto ingresado: Q. {{ ObtenerEngacheEstablecido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}.00</p>
          <h5 class="mt-5 mb-1" >
           <strong>Firma promesa:</strong>
          </h5>
          <p v-show="!firmaPromesaCubierta" class="valueText">Monto establecido: Q. {{ firmaPromesa.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p> 
          <p v-show="firmaPromesaCubierta" class="valueText">Saldo pendiente: Q. 0.00</p>
          <p v-show="firmaPromesaCubierta" class="valueText">Saldo pendiente: Q. {{saldoFavorFirmaPromesa.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>  
          <h5 class="mt-5 mb-1" >
           <strong>Enganche fraccionado:</strong>
          </h5>
          <p v-show="engancheCubierto" class="valueText">Saldo pendiente: Q. 0.00</p> 
          <p v-show="engancheCubierto" class="valueText">Restante: {{saldoFavorEngancheFraccionado.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
          <p v-show="!engancheCubierto" class="valueText">Enganche: {{obtenerResultadoEnganche.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p> 
          <p v-show="!engancheCubierto" class="valueText">Fraccionamiento: {{obtenerMesesEnganche}} Meses</p>
          <p v-show="!engancheCubierto" class="valueText">Cuota Nivelada: {{ObtenerCuotaEnganche.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>                                                
            <h5 class="mt-5 mb-1" >
           <strong>Financiamiento:</strong>
          </h5>
          <p class="valueText">Monto a financiar: Q. {{totalFinanciamiento.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p> 
          <p class="valueText">Entidad: {{obtenerValoreFinanciamiento.entity}}</p>   
          <p class="valueText">Tasa de interés: {{obtenerValoreFinanciamiento.interestEntity}}%</p>
          <p class="valueText">Años: {{obtenerValoreFinanciamiento.yearsFinancingSelected}}</p>
          <p class="valueText">Cuota Nivelada: Q. {{ObtenerCuotaNivelada.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>     -->
            
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          ref="loadableButton"
          id="button-with-loading"
          class="vs-con-loading__container mt-8 mb-8 quoteBtn"
          @click="openLoadingContained"
                size="large"
                text-color="#000"
                color="#fbdc11"
        >Generar Cotización</vs-button>
      </vs-col>
    </vs-row>
        </vx-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import JsBarcode from 'jsbarcode'
import router from '../../router'

export default {
  data () {
    return {
      getProyect: [],
      getUser: [],
      getApartament: [],
      date: '',
      randomNum: '',
      propDataReady: false,
      setMonth: 0,
      firmaPromesaCubierta: false,
      engancheCubierto: false,
      saldoFavorFirmaPromesa: 0,
      saldoFavorEngancheFraccionado: 0,
      backgroundLoading: 'success',
      colorLoading: '#fff'
    }
  },
  apollo: {
    getDeveloper: {
      query: gql`
        query getDeveloperData($id: ID!) {
          getDeveloper(id: $id) {
            name
            phone
            email
            website
            address
          }
        }
      `,
      variables () {
        return {
          id: '5e7ab6acafe9ae00247ccef1'
        }
      },
      pollInterval: 500
    },

    getUser: {
      query: gql`
        query($userID: ID!) {
          getUser(id: $userID) {
            email
            phone
            first_name
            last_name
            pic
          }
        }
      `,
      variables () {
        return {
          userID: '5e7ab76bafe9ae00247ccef4'
        }
      },
      pollInterval: 500
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
      pollInterval: 500
    },
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            quote_logo
            max_days_limit_for_quote
            deposit_percent
          }
        }
      `,
      variables () {
        return {
          proyectID: '5e7aba5eafe9ae00247ccefa'
        }
      },
      pollInterval: 300
    }
  },
  computed: {
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
    ObtenerCuotaEnganche () {
      const valorCuotaFixed =
        this.obtenerResultadoEnganche / this.obtenerMesesEnganche
      return valorCuotaFixed
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
    getDate () {
      const time = new Date()
      return time
    },
    getRandomNumber () {
      const d = new Date().getDate().toString()
      const s = new Date().getSeconds()
      const ms = new Date().getMilliseconds()
      const pID = '5e7ab76bafe9ae00247ccef4'
      return d + s + ms + pID.slice(0, 4)
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
    ObtenerEngacheEstablecido () {
      return this.$store.state.quote_data.financingValues.reservePrice
    },
    ObtenerCliente () {
      return this.$store.state.quote_data
    },
    ObtenerDescuento () {
      return this.$store.state.quote_data.discount_amount
    },
    ObtenerParqueos () {
      return this.$store.state.quote_data.parkings
    },
    ObtenerBodegas () {
      return this.$store.state.quote_data.warehouses
    },
    sumP () {
      return this.ObtenerParqueos.reduce((a, i) => a + i.price, 0)
    },
    sumW () {
      return this.ObtenerBodegas.reduce((a, i) => a + i.price, 0)
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
    totalValue () {
      return (
        parseInt(this.getApartament.price) +
        this.getValueStamps +
        this.getIva -
        this.ObtenerDescuento +
        this.sumP +
        this.sumW
      )
    },
    obtenerEngancheMinimo () {
      return (
        this.$store.state.quote_data.depositValues.minDeposit -
        this.firmaPromesa -
        this.getApartament.reserve_price
      )
    },
    obtenerEngancheCliente () {
      return this.$store.state.quote_data.depositValues.depositClient
    },
    obtenerMesesEnganche () {
      return this.$store.state.quote_data.depositValues.monthDeposit
    },
    equalDataDeposit () {
      if (this.obtenerEngancheMinimo == this.obtenerEngancheCliente) {
        return false
      } else {
        return true
      }
    },
    firmaPromesa () {
      const value =
        (this.getApartament.price + this.sumP + this.sumW) * 0.03 -
        this.ObtenerEngacheEstablecido
      this.valorFirmaSaldo(value)
      return value
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
  methods: {
    createQuote () {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $userID: String!
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
            ) {
              newQuotetoSeller(
                userID: $userID
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
              ) {
                _id
              }
            }
          `,
          variables: {
            userID: localStorage.user_id,
            developerCompanyName: localStorage.company,
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
            financing_interest_rate: this.obtenerValoreFinanciamiento
              .interestEntity,
            financing_years_selected: this.obtenerValoreFinanciamiento
              .yearsFinancingSelected,
            financing_fee_mount: this.ObtenerCuotaNivelada,
            proyect_name: this.getApartament.proyect_name,
            living_square_mts: this.getApartament.living_square_mts,
            bedrooms: this.getApartament.bedrooms,
            bathrooms: this.getApartament.bathrooms,
            lat: localStorage.proyectLat,
            long: localStorage.proyectLong,
            logo_quote_proyect: this.getProyect.quote_logo
          }
        })
        .then(data => {
          this.addClientToQuote(data.data.newQuotetoSeller._id)
          this.addApartamentToQuote(data.data.newQuotetoSeller._id)
          this.addParkingToQuote(data.data.newQuotetoSeller._id)
          this.addWarehouseToQuote(data.data.newQuotetoSeller._id)
          this.$vs.loading.close('#button-with-loading > .con-vs-loading')
          this.$vs.notify({
            title: '¡Cotización creada!',
            text: '"La cotización fue almacenada"',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })

          router.push('/cotizaciones')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addClientToQuote (quoteID) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($clientID: String!, $quoteID: String!) {
              addClientToQuote(clientID: $clientID, quoteID: $quoteID) {
                _id
              }
            }
          `,
          variables: {
            clientID: this.ObtenerCliente.id,
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
    valorFirmaSaldo (value) {
      if (value <= 0) {
        this.firmaPromesaCubierta = true
        const saldo = value * -1
        this.saldoFavorFirmaPromesa = saldo
      } else {
        this.firmaPromesaCubierta = false
        this.saldoFavorFirmaPromesa = 0
      }
    },
    saldoFavorEnganche (value) {
      if (value <= 0) {
        this.engancheCubierto = true
        this.saldoFavorEngancheFraccionado = value * -1
      } else {
        this.engancheCubierto = false
        this.saldoFavorEngancheFraccionado = 0
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
.planeOnQuote {
  display: block;
  width: 100%;
}

.LogoProyectQuote {
  display: block;
  width: 60%;
}
.specialDivider{
    width: 40%;
}
.quoteBtn {
  border-radius: 30px;
  width: 90%;
  font-weight: 400;
  -webkit-box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
  box-shadow: -1px 10px 33px -4px rgba(0, 0, 0, 0.18);
}
@media (min-width: 766px) {
.showResumeOnQuote{
  display: none;
  }
}
</style>
