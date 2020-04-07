<template>
     <div v-show="true" id="data-list-thumb-view" class="data-list-container">
      <div class="vx-row">
      </div>
       <vs-table
        ref="table"
        single
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        :data="getFlattloAppUser.quotes"
        stripe
        noDataText="🤦‍♂️📃No hay cotizaciones creadas..."
      >
        <template slot="thead">
          <vs-th>ID / Estado</vs-th>
          <vs-th>Proyecto</vs-th>
          <vs-th>Apt.</vs-th>
          <vs-th>Dorm.</vs-th>
          <vs-th>Baños</vs-th>
          <vs-th>m2</vs-th>
          <vs-th sort-key="q.quote_date_created">Fecha</vs-th>
          <vs-th>Ver</vs-th>
        </template>

        <template>
          <tbody>
           <vs-tr :data="q" :key="index" v-for="(q, index) in getFlattloAppUser.quotes">
              <vs-td>
                <vs-chip :color="statusColor(q.quote_date_limit)"></vs-chip>
              </vs-td>

              <vs-td>
                <p class="product-category">{{q.proyect_name}}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{q.apartaments[0].number}}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{q.bedrooms}}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{q.bathrooms}}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{q.living_square_mts}}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-small">{{fechaFormateada(q.quote_date_created)}}</p>
              </vs-td>
              <vs-td>
                <vs-row>
                  <vx-tooltip color="primary" text="Visualizar" position="bottom">
                    <vs-button
                      @click="viewQuote(q._id)"
                      color="primary"
                      type="flat"
                      icon-pack="feather"
                      icon="icon-eye"
                      class="p-1"
                      :to="{ name: 'Visualizador de Cotización'}"
                    ></vs-button>
                  </vx-tooltip>
                </vs-row>
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
</template>

<script>
import gql from 'graphql-tag'
    export default {
        data(){
            return{
                getFlattloAppUser:[],
                selected:[]
            }
        },
        apollo:{
            getFlattloAppUser: {
      query: gql`
        query($userUID:String!){
                getFlattloAppUser(userUID:$userUID){
                        userUID
                        quotes{
                            _id
                            proyect_name
                            quote_date_limit
                            barCode
                            bedrooms
                            bathrooms
                            living_square_mts
                            quote_date_created
                                apartaments{
                                    number
                                }
                            }
                    }
                }
      `,
      variables () {
        return {
          userUID: localStorage.userID
        }
      },
      pollInterval: 300
    },
        },
        methods:{
            statusColor (l) {
            let newdate = new Date();
            let d = newdate.getDate();
            let m = newdate.getMonth()+1;
            let y = newdate.getFullYear();
            let datefull = y + "-" + m + "-" + d;

            let fecha1 = l;
            let fecha2 = datefull;
                
                

            let f1 = new Date(fecha1);
            let f2 = new Date(fecha2);

            

            if (f1 < f2) {
                return "danger";
            } else {
                return "success";
            }
    },
    fechaFormateada(fecha) {
      let nuevaFecha = new Date(fecha);
      let dd = nuevaFecha.getDate();
      let mm = nuevaFecha.getMonth() + 1;
      let yyy = nuevaFecha.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      let datefull = dd + "/" + mm + "/" + yyy;

      return datefull;
    },
        }
    }
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 0px;
      margin-right: 0px;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: left;
            }

            .proyect_Thumbnail {
              height: 110px;
            }
          }
        }
        td.td-check {
          padding: 10px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
    .dropdown-button-container {
      display: flex;
      align-items: center;

      .btnx {
        border-radius: 5px 0px 0px 5px;
      }

      .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
    .vs-checkbox-small .vs-checkbox--input:checked + .vs-checkbox .vs-icon {
      margin-top: 0vh !important;
    }
  }
}
</style>
