<template>
  <div id="invoice-page">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex items-center">
        <vs-button
          class="mb-base mr-3"
          icon-pack="fas"
          color="danger"
          icon="fa-file-pdf"
          type="border"
          @click="printInvoice"
        >PDF ó Impresión</vs-button>
      </div>
    </div>

    <vx-card id="invoice-container">
      <div>
        <!-- INVOICE METADATA -->
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/2 mt-12 mb-12">
          <img id="LogoProyectQuote" :src="getFlattloQuoteByID.logo_quote_proyect" />
        </div>
        <div class="vx-col w-full md:w-1/2 text-right">
          <div id="QuoteNumber" class="invoice__invoice-detail mt-2">
            <h6>Cotización No.</h6>
            <p>#{{getFlattloQuoteByID.barCode}}</p>

            <h6 class="mt-4">Fecha de solicitud:</h6>
            <p>{{getShortDate}}</p>
          </div>
        </div>
        <div id="ClientDetail" class="vx-col w-full md:w-1/2 mt-30">
          <h5>Att.</h5>
          <div class="invoice__recipient-info my-2">
            <h6>{{getFlattloQuoteByID.client[0].first_name}} {{getFlattloQuoteByID.client[0].last_name}}</h6>
          </div>
          <div class="invoice__recipient-contact">
            <p class="flex items-center">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.client[0].phone}}</span>
            </p>
            <p class="flex items-center">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.client[0].email}}</span>
            </p>
            <img id="planeOnQuote" :src="getFlattloQuoteByID.apartaments[0].plane_img" />
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 mt-base text-right mt-12">
          <h5>{{getFlattloQuoteByID.developer_name}}</h5>
          <div class="invoice__company-info my-2">
            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.developer_phone}}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="GlobeIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.developer_website}}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.developer_address}}</span>
            </p>
          </div>
          <br />
          <div class="invoice__company-contact">
            <vs-avatar size="96px" :src="getFlattloQuoteByID.seller_pic"></vs-avatar>
            <h6>Asesor personal:</h6>
            <h5 class="mt-1">{{getFlattloQuoteByID.seller_first_name}} {{getFlattloQuoteByID.seller_last_name}}</h5>
            <p class="flex items-center justify-end my-1">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.seller_email}}</span>
            </p>

            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{getFlattloQuoteByID.seller_phone}}</span>
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
            <vs-th v-show="!(getFlattloQuoteByID.parkings.length == 0)">PARQUEOS</vs-th>
            <vs-th v-show="!(getFlattloQuoteByID.warehouses.length == 0)">BODEGAS</vs-th>
          </template>

          <template>
            <vs-tr>
              <vs-td>{{getFlattloQuoteByID.apartaments[0].number}}</vs-td>
              <vs-td>{{getFlattloQuoteByID.apartaments[0].living_square_mts}}m2</vs-td>
              <vs-td>{{getFlattloQuoteByID.apartaments[0].bedrooms}}</vs-td>
              <vs-td>{{getFlattloQuoteByID.apartaments[0].bathrooms}}</vs-td>
              <vs-td
                v-show="!(getFlattloQuoteByID.parkings.length == 0)"
              >{{getFlattloQuoteByID.parkings.length}}</vs-td>
              <vs-td
                v-show="!(getFlattloQuoteByID.warehouses.length == 0)"
              >{{getFlattloQuoteByID.warehouses.length}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <vs-table data="getApartament">
          <vs-tr>
            <vs-th>VALOR PROPIEDAD</vs-th>
            <vs-td>Q. {{ getFlattloQuoteByID.property_value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</vs-td>
          </vs-tr>
          <vs-tr v-show="!(getFlattloQuoteByID.parkings.length == 0)">
            <th>PARQUEOS</th>
            <td>Q. {{ getFlattloQuoteByID.parkings_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr v-show="!(getFlattloQuoteByID.warehouses.length == 0)">
            <th>BODEGAS</th>
            <td>Q. {{ getFlattloQuoteByID.warehouses_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr>
            <th>IMPUESTOS</th>
            <td>Q. {{ getFlattloQuoteByID.taxes_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          </vs-tr>
          <vs-tr v-show="!(getFlattloQuoteByID.discount_mount == 0)">
            <vs-th>DESCUENTO</vs-th>
            <vs-td>Q.{{ getFlattloQuoteByID.discount_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</vs-td>
          </vs-tr>
          <vs-tr>
            <th>TOTAL</th>
            <td>
              <strong>Q. {{ getFlattloQuoteByID.total_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</strong>
            </td>
          </vs-tr>
        </vs-table>
      </div>

      <!-- INVOICE FOOTER -->
      <div class="invoice__footer text-center">
        <svg id="barcode" />
        <p class="mt-4">
          Fecha máxima para aceptación:
          <strong>{{getFlattloQuoteByID.quote_date_limit}}</strong>
        </p>
      </div>
    

    <!---SECOND PAGE--->
    <br />
    <br />
    <br />
   
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/2 mt-base">
          <img id="LogoProyectQuote2" :src="getFlattloQuoteByID.logo_quote_proyect" />
        </div>
        <div id="QuoteNumber2" class="vx-col w-full md:w-1/2 text-right">
          <div class="invoice__invoice-detail mt-6">
            <h6>Cotización No.</h6>
            <p>#{{getFlattloQuoteByID.barCode}}</p>

            <h6 class="mt-4">Fecha de solicitud:</h6>
            <p>{{getShortDate}}</p>
          </div>
        </div>
      </div>

      <div id="QuoteTableSteps" class="vx-row leading-loose p-base">
        <div class="vx-col w-full">
          <vs-chip color="success" class="m-1">Paso 1</vs-chip>
          <h6 class="mt-2">Reserva la unidad:</h6>
          <vs-divider></vs-divider>
        </div>
        <vs-table class="w-full mt-2" data="getApartament">
          <vs-tr>
            <vs-th>Monto ingresado:</vs-th>
            <vs-td>Q. {{getFlattloQuoteByID.reserve_mount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}.00</vs-td>
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
            <vs-td>{{getFlattloQuoteByID.fraction_month_selected}} Meses</vs-td>
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
            <vs-td>Q. {{getFlattloQuoteByID.financing_total_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Entidad seleccionada:</vs-th>
            <vs-td>{{getFlattloQuoteByID.financing_name}}</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Tasa de interés:</vs-th>
            <vs-td>{{getFlattloQuoteByID.financing_interest_rate}}%</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Fraccionamiento:</vs-th>
            <vs-td>{{getFlattloQuoteByID.financing_years_selected}} Años</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>Cuota nivelada:</vs-th>
            <vs-td>
              <strong>Q. {{getFlattloQuoteByID.financing_fee_mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</strong>
            </vs-td>
          </vs-tr>
        </vs-table>
      </div>
       <div class="invoice__footer text-center">
        <svg id="barcode" />
        <p class="mt-4">
          Fecha máxima para aceptación:
          <strong>{{getFlattloQuoteByID.quote_date_limit}}</strong>
        </p>
      </div>
      <!-- INVOICE FOOTER -->
      </div>
    </vx-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import JsBarcode from 'jsbarcode'
export default {
  data () {
    return {
      getFlattloQuoteByID: [],
      getDeveloper: [],
      firmaPromesaCubierta: false,
      saldoFavorFirmaPromesa: 0,
      engancheCubierto: false,
      saldoFavorEngancheFraccionado: 0
    }
  },
  apollo: {
    getFlattloQuoteByID: {
      query: gql`
        query($quoteID: ID!) {
          getFlattloQuoteByID(quoteID: $quoteID) {
            developerCompanyName
            barCode
            quote_date_created
            quote_date_limit
            discount_mount
            reserve_mount
            promise_sign_mount
            fraction_total_mount
            fraction_month_selected
            fraction_fee_mount
            property_value
            parkings_mount
            warehouses_mount
            taxes_mount
            total_mount
            financing_name
            financing_total_mount
            financing_interest_rate
            financing_years_selected
            financing_fee_mount
            proyect_name
            logo_quote_proyect
            deposit_percent
            developer_name
            developer_phone
            developer_email
            developer_website
            developer_address
            seller_first_name
            seller_last_name
            seller_phone
            seller_email
            seller_pic

            client {
              first_name
              last_name
              email
              phone
            }
            apartaments {
              price
              number
              living_square_mts
              bedrooms
              bathrooms
              plane_img
              proyect_name
            }
            parkings {
              price
            }
            warehouses {
              price
            }
          }
        }
      `,
      variables () {
        return {
          quoteID: localStorage.selectedQuoteID
        }
      },
      pollInterval: 700
    },
    getDeveloper: {
      query: gql`
        query getDeveloper($id: ID!) {
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
    }
  },
  computed:{
    ObtenerCuotaEnganche () {
      const valorCuotaFixed =
        this.obtenerResultadoEnganche / this.getFlattloQuoteByID.fraction_month_selected
      return valorCuotaFixed
    },
    ObtenerDescuento () {
      return this.getFlattloQuoteByID.discount_mount
    },
    getValueStamps () {
      return (this.getFlattloQuoteByID.property_value + this.getFlattloQuoteByID.parkings_mount + this.getFlattloQuoteByID.warehouses_mount) * 0.3 * 0.03
    },
    getIva () {
      return (this.getFlattloQuoteByID.property_value + this.getFlattloQuoteByID.parkings_mount + this.getFlattloQuoteByID.warehouses_mount) * 0.7 * 0.12
    },
    getImpuestos () {
      return this.getValueStamps + this.getIva
    },
    totalValue () {
      return (
        parseInt(this.getFlattloQuoteByID.property_value) +
        this.getValueStamps +
        this.getIva -
        this.ObtenerDescuento +
        this.getFlattloQuoteByID.parkings_mount +
        this.getFlattloQuoteByID.warehouses_mount
      )
    },
    totalFinanciamiento () {
      const vt =
        ((this.getFlattloQuoteByID.property_value + this.getFlattloQuoteByID.warehouses_mount + this.getFlattloQuoteByID.parkings_mount) *
          this.getFlattloQuoteByID.deposit_percent) /
        100
      const r = this.saldoFavorEngancheFraccionado
      return this.totalValue - vt - r
    },
    obtenerResultadoEnganche () {
      const vt =
        ((this.getFlattloQuoteByID.property_value + (this.getFlattloQuoteByID.parkings_mount + this.getFlattloQuoteByID.warehouses_mount)) *
          this.getFlattloQuoteByID.deposit_percent) /
        100
      const r = this.getFlattloQuoteByID.reserve_mount
      const fp = this.firmaPromesa
      const sf = this.saldoFavorFirmaPromesa
      const total = vt - r - fp - sf
      this.saldoFavorEnganche(total)
      return total
    },
    firmaPromesa () {
      const value =
        (this.getFlattloQuoteByID.property_value + this.getFlattloQuoteByID.parkings_mount + this.getFlattloQuoteByID.warehouses_mount) * 0.03 -
        this.getFlattloQuoteByID.reserve_mount
      this.valorFirmaSaldo(value)
      return value
    },
    getShortDate () {
      const d = new Date(this.getFlattloQuoteByID.quote_date_created)
      const n = d.toLocaleDateString('en-US')
      return n
    }
  },
  methods: {
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
    },
    printInvoice () {
      document.title = `${`${this.getFlattloQuoteByID.barCode 
      }-${ 
        this.getFlattloQuoteByID.client[0].first_name 
      }-${ 
        this.getFlattloQuoteByID.client[0].last_name}`}`
      window.print()
      window.onafterprint = function (event) {
        console.log(event)
      }
    },
    fechaFormateada (fecha) {
      const fechaFormateada = new Date(fecha)
      let dd = fechaFormateada.getDate()
      let mm = fechaFormateada.getMonth() + 1
      const y = fechaFormateada.getFullYear()

      if (dd < 10) {
        dd = `0${  dd}`
      }
      if (mm < 10) {
        mm = `0${  mm}`
      }

      const fechaFull = `${dd  }/${  mm  }/${  y}`

      return fechaFull
    }
  },
  mounted () {
    this.$emit('setAppClasses', 'invoice-page')
    setTimeout(() => {
      JsBarcode('#barcode', this.getFlattloQuoteByID.barCode, {
        lineColor: '#000000',
        height: 26,
        displayValue: false
      })
    }, 800)
  }
}
</script>

<style lang="scss">
#planeOnQuote {
  display: block;
  width: 90%;
}

#LogoProyectQuote {
  display: block;
  width: 50%;
  margin-bottom: 25px;
}
#LogoProyectQuote2 {
  display: block;
  width: 50%;
  margin-bottom: 25px;
}
@page {
  size: A4; 
  margin: 0; 
}
@media print {
  
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
      background-repeat: no-repeat;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }

    #planeOnQuote {
      display: block;
      position: absolute;
      width: 60%;
      margin-top: 0vh;
      z-index: 1;
    }

    #QuoteNumber {
      margin-top: -6vh;
      display: block;
    }

    #QuoteNumber2 {
      margin-top: -10vh;
      display: block;
    }

    #LogoProyectQuote {
      display: block;
      position: relative;
      width: 35%;
      margin-top: -50px;
    }

    #LogoProyectQuote2 {
      display: block;
      position: relative;
      width: 35%;
      margin-top: -30px;
    }
    #CompanyDetail {
      margin-top: 0vh;
    }
    #ClientDetail {
      position: absolute;
      display: block;
      margin-top: 9vh;
      background-repeat: no-repeat;
    }
    #QuoteTableSteps {
      position: relative;
      display: block;
      z-index: 999999;
      margin-top: -6vh;
    }
    .chipColor {
      background-color: #000;
    }
  }
}
</style>

