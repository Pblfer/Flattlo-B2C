<template>
  <div class="w-full sm:w-full p-2 mt-4 mb-6">
    <div>
      <h5>🏢 Detalles de propiedad:</h5>
      <vs-divider></vs-divider>
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
      <h5>📦 Selección de inventario:</h5>
      <vs-divider></vs-divider>
      <vs-row class="p-2 mb-8">
        <vs-col vs-type="flex flex-wrap" vs-w="12">
          <p>Seleccione un parqueo:</p>
          <v-select multiple label="number" v-model="selectedP" :options="getProyect.parkings"></v-select>
        </vs-col>
        <vs-col class="mt-6" vs-type="flex flex-wrap" vs-w="12" v-show="true">
          <p>Seleccione una bodega:</p>
          <v-select multiple label="number"></v-select>
        </vs-col>
      </vs-row>
      <br/>
      <h5>📌 Monto de reserva:</h5>
      <vs-divider></vs-divider>
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
          label="Reserva establecido por cliente:"
          class="fZise"
          v-model="rClient"
          type="number"
        />
      </div>
      <br/>
      <h5>🙌 Enganche fraccionado:</h5>
      <vs-divider></vs-divider>

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
      <div class="mb-8" v-if="monthMax > 0">
        <h6>🤓👉Tu cuota queda en Q. {{((minPorcent - getApartament.reserve_price) / monthMax).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</h6>
      </div>
      <br/>
      <div class="mb-8">
        <h5>🧾 Financiamiento:</h5>
      <vs-divider></vs-divider>
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
      
      </div>
      <br/>
      <h5>🤯 Te dejamos un resumen:</h5>
      <vs-divider></vs-divider>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import vSelect from "vue-select";

export default {
  data() {
    return {
      sale: "0",
      finType: "",
      depositClient: null,
      rClient: null,
      familyRev: null,
      entity: "",
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
      yearsFinancing: 0
    };
  },
  components: {
    "v-select": vSelect
  },
  computed: {
    getFirstName () {
      return localStorage.firstNameUser
    },
    totalValue() {
      return (
        parseInt(this.getApartament.price) +
        this.getValueStamps +
        this.getIva -
        parseInt(this.sale) +
        parseInt(this.sumP) +
        parseInt(this.sumW)
      );
    },
    sumP() {
      return this.selectedP.reduce((a, i) => a + i.price, 0);
    },
    sumW() {
      return this.selectedW.reduce((a, i) => a + i.price, 0);
    },
    minPorcent() {
      return (
        (this.getApartament.price + this.sumW + this.sumP) *
        (this.getProyect.deposit_percent / 100)
      );
    },
    checkData() {
      if (this.depositClient >= this.minPorcent) {
        return false;
      } else {
        return true;
      }
    },
    getValueStamps() {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.3 * 0.03;
    },
    getIva() {
      return (this.getApartament.price + this.sumP + this.sumW) * 0.7 * 0.12;
    }
  },
  watch: {
    rClient() {
      if (this.rClient >= this.getApartament.reserve_price) {
        const payload = this.rClient;
        this.confirmReserve = true;
        this.rClientFixed = this.rClient;
        this.$store.dispatch("reserva_establecida", payload);
        const engancheFraccionado =
          this.minPorcent - this.getApartament.reserve_price;
        this.depositClient = engancheFraccionado;
      } else {
        this.confirmReserve = false;
      }
    },
    yearMax() {
      const payload = {
        yearsFinancingSelected: this.yearMax
      };
      this.$store.dispatch("Años_Financiamiento_Bancario", payload);
    },
    entity() {
      const payload = {
        entity: this.entity,
        interestEntity: this.finType,
        yearsFinancingSelected: this.yearsFinancing
      };
      this.$store.dispatch("Financiamiento_Bancario", payload);
    },
    monthMax() {
      const payload = this.monthMax;
      this.$store.dispatch("Meses_Enganche", payload);
    },
    familyRev() {
      if (parseInt(this.familyRev) <= this.minFamilyRev) {
        this.confirmRev = false;
      } else {
        this.confirmRev = true;
      }
    },
    sale() {
      const payload = {
        discount_amount: this.sale
      };
      this.$store.dispatch("Descuento_seleccionado", payload);
    },
    selectedP() {
      const payload = this.selectedP;
      this.$store.dispatch("Parqueo_Seleccionado", payload);
    },
    selectedW() {
      const payload = this.selectedW;
      this.$store.dispatch("Bodega_Seleccionada", payload);
    },
    depositClient() {
      if (
        parseInt(this.depositClient) >=
        this.minPorcent - this.getApartament.reserve_price
      ) {
        this.confirmDeposit = true;
        const payload = {
          depositClient: this.depositClient,
          minDeposit: this.minPorcent
        };
        this.$store.dispatch("Enganche_Cliente", payload);
      } else {
        this.confirmDeposit = false;
      }
    }
  },
  apollo: {
    getProyect: {
      query: gql`
        query($proyectID: String!) {
          getProyect(proyectID: $proyectID) {
            fraction_reserved
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
      variables() {
        return {
          proyectID: "5e7aba5eafe9ae00247ccefa"
        };
      },
      pollInterval: 300
    },
    getApartament: {
      query: gql`
        query($apartamentID: String!) {
          getApartament(apartamentID: $apartamentID) {
            price
            reserve_price
          }
        }
      `,
      variables() {
        return {
          apartamentID: localStorage.selectedApartament
        };
      },
      pollInterval: 700
    }
  }
};
</script>

<style lang="scss">
.vs-input-number button {
  min-width: 32px;
  min-height: 32px;
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
</style>