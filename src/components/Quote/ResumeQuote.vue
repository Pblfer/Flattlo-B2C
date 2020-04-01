
<template>
  <div id="pdf">
      <vx-card>
          <h5 class="mt-2 mb-1">
            <strong>No. Cotización:</strong>
          </h5>
          <p
            class="valueText"
          ># {{getRandomNumber}}</p>
          <h5 class="mt-4 mb-1">
            <strong>Fecha de Solicitud:</strong>
          </h5>
          <p
            class="valueText"
          >{{getRequestDate}}</p>
          <h5 class="mt-4 mb-1">
            <strong>Tus Datos:</strong>
          </h5>
          <p class="valueText">{{ObtenerCliente.first_name}}</p>
          <p class="valueText">{{ObtenerCliente.last_name}}</p>
          <p class="valueText">{{ObtenerCliente.email}}</p>
          <p class="valueText">{{ObtenerCliente.phone}}</p>
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
          <vs-divider class="specialDivider"></vs-divider>
          <p class="valueText"><strong>Total: Q. {{ totalValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</strong></p>   

        </vx-card>
    <vx-card>
      <!-- INVOICE METADATA -->
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/2 mt-base">
          <img class="LogoProyectQuote" :src="getProyect.quote_logo" />
        </div>
        <div class="vx-col w-full md:w-1/2 text-right">
          <div class="invoice__invoice-detail mt-6">
            <h6>Cotización No.</h6>
            <p>#{{ getRandomNumber }}</p>

            <h6 class="mt-4">Fecha de solicitud:</h6>
            <p>{{getRequestDate}}</p>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 mt-12">
          <h5>Att.</h5>
          <div class="invoice__recipient-info my-2">
            <h6>{{ObtenerCliente.first_name}} {{ObtenerCliente.last_name}}</h6>
          </div>
          <div class="invoice__recipient-contact">
            <p class="flex items-center">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ObtenerCliente.phone}}</span>
            </p>
            <p class="flex items-center">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ObtenerCliente.email}}</span>
            </p>
            <img class="planeOnQuote" :src="getApartament.plane_img" />
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 mt-base text-right mt-12">
          <h5>{{ getDeveloper.name }}</h5>
          <div class="invoice__company-info my-2">
            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ getDeveloper.phone }}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="GlobeIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ getDeveloper.website }}</span>
            </p>
            <p class="flex items-center justify-end">
              <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ getDeveloper.address }}</span>
            </p>
          </div>
          <br />
          <div class="invoice__company-contact">
            <vs-avatar size="96px" :src="getUser.pic"></vs-avatar>
            <h6>Asesor personal:</h6>
            <h5 class="mt-1">{{getUser.first_name}} {{getUser.last_name}}</h5>
            <p class="flex items-center justify-end my-1">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ getUser.email }}</span>
            </p>

            <p class="flex items-center justify-end">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{ getUser.phone }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- INVOICE CONTENT -->
      <div class="p-base">
        <!-- INVOICE TASKS TABLE -->
        <vs-table hoverFlat :data="getApartament">
          <!-- HEADER -->
          <template slot="thead">
            <vs-th>OPCIÓN:</vs-th>
            <vs-th>M2</vs-th>
            <vs-th>HAB.</vs-th>
            <vs-th>BAÑ.</vs-th>
            <vs-th v-show="!(ObtenerParqueos.length == 0)">PARQUEOS</vs-th>
            <vs-th v-show="!(ObtenerBodegas.length == 0)">BODEGAS</vs-th>
          </template>

          <!-- DATA -->
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

        <!-- INVOICE SUMMARY TABLE -->
        <vs-table class="w-full ml-auto mt-4" :data="getApartament">
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
            <p>#{{ getRandomNumber }}</p>

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
        <vs-table class="w-full mt-2" :data="getApartament">
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
        <vs-table class="w-full mt-2" :data="getApartament">
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
        <vs-table class="w-full mt-2" :data="getApartament">
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
        <vs-table class="w-full mt-2" :data="getApartament">
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
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          ref="loadableButton"
          id="button-with-loading"
          class="vs-con-loading__container"
          @click="openLoadingContained"
          color="success"
          icon-pack="fas"
          icon="fa-save"
        >Almacenar Cotización</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="mt-4">
        🧐 Fecha límite de aceptación:
        <strong>{{getLimitDate}}</strong>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import JsBarcode from "jsbarcode";
import router from "../../router";

export default {
  data() {
    return {
      getDeveloper: [],
      getProyect: [],
      getUser: [],
      getApartament: [],
      date: "",
      randomNum: "",
      propDataReady: false,
      setMonth: 0,
      firmaPromesaCubierta: false,
      engancheCubierto: false,
      saldoFavorFirmaPromesa: 0,
      saldoFavorEngancheFraccionado: 0,
      backgroundLoading: "success",
      colorLoading: "#fff"
    };
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
      variables() {
        return {
          id: '5e7ab6acafe9ae00247ccef1'
        };
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
      variables() {
        return {
          userID: '5e7ab76bafe9ae00247ccef4'
        };
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
      variables() {
        return {
          apartamentID: localStorage.selectedApartament
        };
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
      variables() {
        return {
          proyectID: '5e7aba5eafe9ae00247ccefa'
        };
      },
      pollInterval: 300
    }
  },
  computed: {
    getLimitDate() {
      let date = this.getDate.getDate();
      let newdate = new Date(date);

      newdate.setDate(
        this.getDate.getDate() + this.getProyect.max_days_limit_for_quote
      );

      let dd = newdate.getDate();
      let mm = newdate.getMonth() + 1;
      let y = this.getDate.getFullYear();

      const someFormattedDate = dd + "/" + mm + "/" + y;
      return someFormattedDate;
    },
    getRequestDate() {
      let date = this.getDate.getDate();
      let newdate = new Date(date);
      newdate.setDate(this.getDate.getDate());
      let dd = newdate.getDate();
      let mm = newdate.getMonth();
      let y = this.getDate.getFullYear();
      const requestDate = dd + "/" + mm + "/" + y;
      return requestDate;
    },
    ObtenerCuotaEnganche() {
      let valorCuotaFixed =
        this.obtenerResultadoEnganche / this.obtenerMesesEnganche;
      return valorCuotaFixed;
    },
    ObtenerCuotaNivelada() {
      const cuotaNivelada =
        (this.totalFinanciamiento *
          (this.obtenerValoreFinanciamiento.interestEntity / 1200)) /
        (1 -
          Math.pow(
            1 + this.obtenerValoreFinanciamiento.interestEntity / 1200,
            -(this.obtenerValoreFinanciamiento.yearsFinancingSelected * 12)
          ));
      return cuotaNivelada;
    },
    getDate() {
      let time = new Date();
      return time;
    },
    getRandomNumber() {
      const d = new Date().getDate().toString();
      const s = new Date().getSeconds();
      const ms = new Date().getMilliseconds();
      const pID = '5e7ab76bafe9ae00247ccef4';
      return d + s + ms + pID.slice(0, 4);
    },
    obtenerResultadoEnganche() {
      const vt =
        ((this.getApartament.price + (this.sumP + this.sumW)) *
          this.getProyect.deposit_percent) /
        100;
      const r = this.ObtenerEngacheEstablecido;
      const fp = this.firmaPromesa;
      const sf = this.saldoFavorFirmaPromesa;
      const total = vt - r - fp - sf;
      this.saldoFavorEnganche(total);
      return total;
    },
    ObtenerEngacheEstablecido() {
      return this.$store.state.quote_data.financingValues.reservePrice;
    },
    ObtenerCliente() {
      return this.$store.state.quote_data;
    },
    ObtenerDescuento() {
      return this.$store.state.quote_data.discount_amount;
    },
    ObtenerParqueos() {
      return this.$store.state.quote_data.parkings;
    },
    ObtenerBodegas() {
      return this.$store.state.quote_data.warehouses;
    },
    sumP() {
      return this.ObtenerParqueos.reduce((a, i) => a + i.price, 0);
    },
    sumW() {
      return this.ObtenerBodegas.reduce((a, i) => a + i.price, 0);
    },
    getValueStamps() {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.3 * 0.03;
    },
    getIva() {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.7 * 0.12;
    },
    getImpuestos() {
      return this.getValueStamps + this.getIva;
    },
    totalValue() {
      return (
        parseInt(this.getApartament.price) +
        this.getValueStamps +
        this.getIva -
        this.ObtenerDescuento +
        this.sumP +
        this.sumW
      );
    },
    obtenerEngancheMinimo() {
      return (
        this.$store.state.quote_data.depositValues.minDeposit -
        this.firmaPromesa -
        this.getApartament.reserve_price
      );
    },
    obtenerEngancheCliente() {
      return this.$store.state.quote_data.depositValues.depositClient;
    },
    obtenerMesesEnganche() {
      return this.$store.state.quote_data.depositValues.monthDeposit;
    },
    equalDataDeposit() {
      if (this.obtenerEngancheMinimo == this.obtenerEngancheCliente) {
        return false;
      } else {
        return true;
      }
    },
    firmaPromesa() {
      const value =
        (this.getApartament.price + this.sumP + this.sumW) * 0.03 -
        this.ObtenerEngacheEstablecido;
      this.valorFirmaSaldo(value);
      return value;
    },
    totalFinanciamiento() {
      const vt =
        ((this.getApartament.price + this.sumW + this.sumP) *
          this.getProyect.deposit_percent) /
        100;
      const r = this.saldoFavorEngancheFraccionado;
      return this.totalValue - vt - r;
    },
    obtenerRestante() {
      return (this.obtenerEngancheCliente - this.obtenerEngancheMinimo)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    obtenerValoreFinanciamiento() {
      return this.$store.state.quote_data.financingValues;
    }
  },
  methods: {
    createQuote() {
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
          this.addClientToQuote(data.data.newQuotetoSeller._id);
          this.addApartamentToQuote(data.data.newQuotetoSeller._id);
          this.addParkingToQuote(data.data.newQuotetoSeller._id);
          this.addWarehouseToQuote(data.data.newQuotetoSeller._id);
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
          this.$vs.notify({
            title: "¡Cotización creada!",
            text: `"La cotización fue almacenada"`,
            color: "success",
            iconPack: "feather",
            icon: "icon-check"
          });

          router.push("/cotizaciones");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addClientToQuote(quoteID) {
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
            quoteID: quoteID
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addApartamentToQuote(quoteID) {
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
          quoteID: quoteID,
          apartamentID: localStorage.selectedApartament
        }
      });
    },
    addParkingToQuote(quoteID) {
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
            quoteID: quoteID,
            parkingID: element._id
          }
        });
      });
    },
    addWarehouseToQuote(quoteID) {
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
            quoteID: quoteID,
            warehouseID: element._id
          }
        });
      });
    },
    openLoadingContained() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      });
      this.createQuote();
    },
    valorFirmaSaldo(value) {
      if (value <= 0) {
        this.firmaPromesaCubierta = true;
        const saldo = value * -1;
        this.saldoFavorFirmaPromesa = saldo;
      } else {
        this.firmaPromesaCubierta = false;
        this.saldoFavorFirmaPromesa = 0;
      }
    },
    saldoFavorEnganche(value) {
      if (value <= 0) {
        this.engancheCubierto = true;
        this.saldoFavorEngancheFraccionado = value * -1;
      } else {
        this.engancheCubierto = false;
        this.saldoFavorEngancheFraccionado = 0;
      }
    },

  },
  mounted() {
    setTimeout(() => {
      JsBarcode("#barcode", this.getRandomNumber, {
        lineColor: "#000000",
        height: 26,
        displayValue: false
      });
    }, 800);
  }
};
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
</style>
