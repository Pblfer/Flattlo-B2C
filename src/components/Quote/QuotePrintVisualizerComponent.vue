
<template>
  <div>
    <vx-card class="mt-2 mb-6" v-if="this.getFlattloAppUser.phone === '0000-0000'">
      <h4>👈😮{{this.getFlattloAppUser.first_name}} necesitamos que confirmes tu número telefónico.</h4>
    </vx-card>

  <div id="pdf" v-if="this.getFlattloAppUser.phone !== '0000-0000'">
    <vx-card>
      <!-- INVOICE METADATA -->
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/2 mt-base">
          <img class="LogoProyectQuote" :src="getProyect.quote_logo" />
        </div>
        <div class="vx-col w-full md:w-1/2 text-right">
          <div class="invoice__invoice-detail mt-6">
            <h6>Cotización No.</h6>
            <p>#{{getRandomNumber}}</p>

            <h6 class="mt-4">Fecha de solicitud:</h6>
            <p>{{getRequestDate}}</p>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 mt-12">
          <h5>Att.</h5>
          <div class="invoice__recipient-info my-2">
            <h6>{{getFlattloAppUser.first_name}} {{getFlattloAppUser.last_name}}</h6>
          </div>
          <div class="invoice__recipient-contact">
            <p class="flex items-center">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloAppUser.phone}}</span>
            </p>
            <p class="flex items-center">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloAppUser.email}}</span>
            </p>
            <img class="planeOnQuote" :src="getApartament.plane_img" />
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 mt-base text-right mt-12">
          <h5>{{getDeveloper.name}}</h5>
          <div class="invoice__company-info my-2">
            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getDeveloper.phone}}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="GlobeIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getDeveloper.website}}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getDeveloper.address}}</span>
            </p>
          </div>
          <br />
          <div class="invoice__company-contact">
            <vs-avatar size="96px" :src="getDeveloper.sellers_team[ObtenerVendedorEstablecido].pic"></vs-avatar>
            <h6>Asesor personal:</h6>
            <h5 class="mt-1">{{getDeveloper.sellers_team[ObtenerVendedorEstablecido].first_name}} {{getDeveloper.sellers_team[ObtenerVendedorEstablecido].last_name}}</h5>
            <p class="flex items-center justify-end my-1">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getDeveloper.sellers_team[ObtenerVendedorEstablecido].email}}</span>
            </p>

            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getDeveloper.sellers_team[ObtenerVendedorEstablecido].phone}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- INVOICE CONTENT -->
      <div class="p-base">
     
        <vs-table data="getApartament">
        
          <template slot="thead">
            <vs-th>OPCIÓN:</vs-th>
            <vs-th>M2</vs-th>
            <vs-th>HAB.</vs-th>
            <vs-th>BAÑ.</vs-th>
            <vs-th v-show="!(ObtenerParqueos.length == 0)">PARQUEOS</vs-th>
            <vs-th v-show="!(ObtenerBodegas.length == 0)">BODEGAS</vs-th>
          </template>

          <template>
            <vs-tr>
              <vs-td>{{getApartament.number}}</vs-td>
              <vs-td>{{getApartament.living_square_mts}}m2</vs-td>
              <vs-td>{{getApartament.bedrooms}}</vs-td>
              <vs-td>{{getApartament.bathrooms}}</vs-td>
              <vs-td v-show="!(ObtenerParqueos.length == 0)">{{ObtenerParqueos.length}}</vs-td>
              <vs-td v-show="!(ObtenerBodegas.length == 0)">{{ObtenerBodegas.length}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <vs-table  data="getApartament">
          <vs-tr>
            <vs-th>VALOR PROPIEDAD</vs-th>
            <vs-td>Q. {{ getApartament.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</vs-td>
          </vs-tr>
          <vs-tr v-show="!(ObtenerParqueos.length == 0)">
            <th>PARQUEOS</th>
            <td>Q. {{ sumP.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr v-show="!(ObtenerBodegas.length == 0)">
            <th>BODEGAS</th>
            <td>Q. {{ sumW.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr>
            <th>IMPUESTOS</th>
            <td>Q. {{ getImpuestos.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr v-show="!(ObtenerDescuento == 0)">
            <vs-th>DESCUENTO</vs-th>
            <vs-td>Q.{{ ObtenerDescuento.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</vs-td>
          </vs-tr>
          <vs-tr>
            <th>TOTAL</th>
            <td>
              <strong>Q. {{ totalValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</strong>
            </td>
          </vs-tr>
        </vs-table>
      </div>

      <!-- INVOICE FOOTER -->
      <div class="invoice__footer text-center">
        <svg id="barcode" />
        <p class="mt-4">
          Esta cotización es válida
          <strong>{{getProyect.max_days_limit_for_quote}} días</strong> hábiles despues de ser emitida.
        </p>
      </div>
    </vx-card>
    <br />
    <vx-card>
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/2 mt-base">
          <img class="LogoProyectQuote" :src="getProyect.quote_logo" /> 
        </div>
        <div class="vx-col w-full md:w-1/2 text-right">
          <div class="invoice__invoice-detail mt-6">
            <h6>Cotización No.</h6>
            <p>#{{getRandomNumber}}</p>

            <h6 class="mt-4">Fecha de solicitud:</h6>
            <p>{{getRequestDate}}</p>
          </div>
        </div>
      </div>

         <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full">
          <vs-chip color="success" class="m-1">Paso 1</vs-chip>
          <h6 class="mt-2">Reserva la unidad:</h6>
          <vs-divider></vs-divider>
        </div>
        <vs-table class="w-full mt-2" data="getApartament">
          <vs-tr>
            <vs-th>Monto ingresado:</vs-th>
            <vs-td>Q. {{ObtenerEngacheEstablecido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}.00</vs-td>
          </vs-tr>
        </vs-table>
        <div class="vx-col w-full mt-base">
          <vs-chip color="success" class="m-1">Paso 2</vs-chip>
          <h6 class="mt-2">Firma de contra promesa:</h6>
          <vs-divider></vs-divider>
        </div>
        <vs-table class="w-full mt-2" data="getApartament">
          <vs-tr v-show="!firmaPromesaCubierta">
            <vs-th>Monto establecido:</vs-th>
            <vs-td>Q. {{firmaPromesa.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
          <vs-tr v-show="firmaPromesaCubierta">
            <vs-th>Saldo pendiente:</vs-th>
            <vs-td>Q. 0.00</vs-td>
          </vs-tr>
          <vs-tr v-show="firmaPromesaCubierta">
            <vs-th>Restante:</vs-th>
            <vs-td>Q. {{saldoFavorFirmaPromesa.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
        </vs-table>
        <div class="vx-col w-full mt-base">
          <vs-chip color="success" class="m-1">Paso 3</vs-chip>
          <h6 class="mt-2">Inicia enganche fraccionado:</h6>
          <vs-divider></vs-divider>
        </div>
        <vs-table class="w-full mt-2" data="getApartament">
          <vs-tr v-show="engancheCubierto">
            <vs-th>Saldo pendiente:</vs-th>
            <vs-td>Q. 0.00</vs-td>
          </vs-tr>
          <vs-tr v-show="engancheCubierto">
            <vs-th>Restante:</vs-th>
            <vs-td>Q. {{saldoFavorEngancheFraccionado.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
          <vs-tr v-show="!engancheCubierto">
            <vs-th>Enganche:</vs-th>
            <vs-td>Q. {{obtenerResultadoEnganche.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
          <vs-tr v-show="!engancheCubierto">
            <vs-th>Fraccionamiento:</vs-th>
            <vs-td>{{obtenerMesesEnganche}} Meses</vs-td>
          </vs-tr>
          <vs-tr v-show="!engancheCubierto">
            <vs-th>Cuota nivelada:</vs-th>
            <vs-td>
              <strong>Q. {{ObtenerCuotaEnganche.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</strong>
            </vs-td>
          </vs-tr>
        </vs-table>


        <div class="vx-col w-full mt-base">
          <vs-chip color="success" class="m-1">Paso 4</vs-chip>
          <h6 class="mt-2">Inicia financiamiento:</h6>
          <vs-divider></vs-divider>
        </div>
        <vs-table class="w-full mt-2" data="getApartament">
          <vs-tr>
            <vs-th>Monto a financiar:</vs-th>
            <vs-td>Q. {{totalFinanciamiento.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Entidad seleccionada:</vs-th>
            <vs-td>{{obtenerValoreFinanciamiento.entity}}</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Tasa de interés:</vs-th>
            <vs-td>{{obtenerValoreFinanciamiento.interestEntity}}%</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Fraccionamiento:</vs-th>
            <vs-td>{{obtenerValoreFinanciamiento.yearsFinancingSelected}} Años</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Cuota nivelada:</vs-th>
            <vs-td>
              <strong>Q. {{ObtenerCuotaNivelada.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</strong>
            </vs-td>
          </vs-tr> 
        </vs-table>
      </div>

      <!-- INVOICE FOOTER -->
      <div class="invoice__footer text-center">
        <svg id="barcode" />
        <p class="mt-4">
          Esta cotización es válida
          <strong>{{getProyect.max_days_limit_for_quote}} días</strong> hábiles despues de ser emitida.
        </p>
      </div>
    </vx-card>
    <br />
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="mt-4">
        🧐 Fecha límite de aceptación: 
        <strong> {{ getLimitDate}}</strong>
      </vs-col>
    </vs-row>
  </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import JsBarcode from 'jsbarcode'
export default {
  data () {
    return {
      getProyect:[],
      getApartament:[],
      getFlattloAppUser: [],
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
  apollo: {
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            max_days_limit_for_quote
            fraction_reserved
            quote_logo
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
            _id
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
  computed:{
    
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
    ObtenerVendedorEstablecido () {
      return this.$store.state.quote_data.sellerSected
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
    sumP () {
      return this.ObtenerParqueos.reduce((a, i) => a + i.price, 0)
    },
    sumW () {
      return this.ObtenerBodegas.reduce((a, i) => a + i.price, 0)
    },
    ObtenerParqueos () {
      return this.$store.state.quote_data.parkings
    },
    ObtenerBodegas () {
      return this.$store.state.quote_data.warehouses
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
</style>
