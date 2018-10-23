<template>
<v-container>
    <!-- details: -->
    {{cartId}}
    {{cart}}
    <div data-app>
        <v-toolbar flat color="white" class="elevation-1">
            <v-toolbar-title></v-toolbar-title>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Add Item</v-btn>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.Name" label="Product name"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.Price" label="Price"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.Quantity" label="Quantity"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-toolbar>

        <v-data-table :headers="headers" :items="desserts" hide-actions class="elevation-1 text-xs-center">
            <template slot="items" slot-scope="props">

                <td style="display: flex;justify-content: flex-start;align-items: center;">
                    <v-icon small class="mr-2" @click="editItem(props.item)">
                        edit
                    </v-icon>
                    <v-icon small class="mr-2" @click="addQuantity(props.item)">
                        add
                    </v-icon>
                    <v-icon small @click="removeQuantity(props.item)">
                        remove
                    </v-icon>
                </td>
                <td class="text-xs-left">{{ (props.item.Name==='') ? 'N/A':props.item.Name }}</td>
                <td class="text-xs-left">{{ (props.item.Price==='') ? 0 : props.item.Price }}</td>
                <td class="text-xs-left">{{ (props.item.Quantity==='') ? 0 : props.item.Quantity }}</td>

            </template>

            <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>

        </v-data-table>
    </div>
</v-container>
</template>

<script>
import Vue from 'vue';
import firebaseApp from './../../firebase/config.js';
const fireStoreApp = firebaseApp.firestore();
import tableModel from './table.model.js';
import ItemsApiService from './items-api.service.js';
export default Vue.component('CartDetailsComponent', {
  created() {
    this.initialize();
    this.isRouting();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    desserts: {
      handler(val) {
        console.log('$watch deserts');
      },
      deep: true
    }
  },

  data() {
    return {
      apiService: new ItemsApiService(),
      cartId: '',
      cart: {},
      dialog: false,
      headers: tableModel,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        Name: '',
        Price: 0,
        Quantity: 0
      },
      defaultItem: {
        Name: 'N/A',
        Price: 0,
        Quantity: 0
      }
    };
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          Name: 'N/A',
          Price: 0,
          Quantity: 0
        }
      ];
    },
    removeQuantity(item) {
      if (item.Quantity > 0) {
        item = Object.assign({}, item, {
          Quantity: --item.Quantity
        });
      }
    },
    addQuantity(item) {
      item = Object.assign({}, item, {
        Quantity: ++item.Quantity
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      console.log(this.cartId);
      console.log('save: ', this.desserts);
      // this.apiService.save()
      this.close();
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    isRouting() {
      const isRouting = this.$route.params.cart !== undefined ? true : false;
      this.cartId = this.$route.params.id;
      if (isRouting) {
        this.cart = this.$route.params.cart;
        this.desserts = [...this.cart.Products];
      } else {
        this.getShoppingItemByIdApi$();
      }
    },
    getShoppingItemByIdApi$() {
      fireStoreApp
        .collection('Shopping')
        .doc(this.cartId)
        .onSnapshot(snapshot => {
          if (snapshot.data() === undefined) {
            this.$router.push('/');
          } else {
            this.cart = {
              Id: this.cartId,
              ...snapshot.data()
            };
            console.log(snapshot.data());
            this.desserts = [...this.cart.Products];
          }
        });
    }
  }
});
</script>
