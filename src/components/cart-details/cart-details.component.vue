<template>
<v-container>

    <div data-app>
        <v-toolbar flat color="white" class="elevation-1">
            <v-toolbar-title></v-toolbar-title>
            <!-- DIALOG -->
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Add Item</v-btn>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>

                            <v-form ref="form" v-model="valid" lazy-validation noValidate>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field :rules="itemRules" required v-model="editedItem.Name" label="Product Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.Price" label="Price"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.Quantity" label="Quantity"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-form>

                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- DIALOG -->
        </v-toolbar>

        <v-data-table :headers="headers" :items="shoppingCartItems" hide-actions class="elevation-1 text-xs-center">
            <template slot="items" slot-scope="props">
                <!-- ACTIONS -->
                <td style="display: flex;justify-content: flex-start;align-items: center;">
                    <v-icon small class="mr-2" @click="editItemHandler(props.item)">
                        edit
                    </v-icon>
                    <v-icon small class="mr-2" @click="addQuantity(props.item)">
                        add
                    </v-icon>
                    <v-icon small @click="removeQuantity(props.item)">
                        remove
                    </v-icon>
                    <v-icon small @click="deleteHandler(props.item)">
                        delete
                    </v-icon>
                </td>
                <!-- ACTIONS -->
                <!-- RAW DATA -->
                <td class="text-xs-left">{{ props.item.Name}}</td>

                <td class="text-xs-left">{{ props.item.Price}}</td>

                <td class="text-xs-left">{{ props.item.Quantity }}</td>
                <!-- RAW DATA -->
            </template>

            <template slot="no-data">
                <v-content>No Data</v-content>
            </template>

        </v-data-table>
    </div>
</v-container>
</template>

<script>
import Vue from 'vue';
import firebaseApp from '../../firebase/config';
const fireStoreApp = firebaseApp.firestore();
import tableModel from './table.model.js';
import ItemsApiService from './items-api.service.js';
export default Vue.component('CartDetailsComponent', {
    created() {
        this.isRouting();
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        shoppingCartItems: {
            handler(val) {},
            deep: true
        }
    },

    data() {
        return {
            apiService: new ItemsApiService(),
            categoryID: '',
            cart: {},
            dialog: false,
            headers: tableModel,
            shoppingCartItems: [],
            editedIndex: -1,
            editedItem: {
                Name: undefined,
                Price: 0,
                Quantity: 0
            },
            defaultItem: {
                Name: undefined,
                Price: 0,
                Quantity: 0
            },
            valid: false,
            itemRules: [
                v =>
                (v !== null && v !== '' && v !== undefined) ||
                'Product Name is Required'
            ]
        };
    },
    methods: {
        isRouting() {
            const isRouting = this.$route.params.cart !== undefined ? true : false;
            this.categoryID = this.$route.params.categoryID;
            if (isRouting) {
                this.cart = this.$route.params.cart;
                this.shoppingCartItems = [...this.cart.Products];
            } else {
                fireStoreApp
                    .collection('Shopping')
                    .doc(this.categoryID)
                    .onSnapshot(snapshot => {
                        if (snapshot.data() === undefined) {
                            $router.push('/');
                        } else {
                            this.cart = {
                                categoryID: this.categoryID,
                                ...snapshot.data()
                            };
                            this.shoppingCartItems = [...this.cart.Products];
                        }
                    });
            }
        },

        removeQuantity(item) {
            if (item.Quantity > 0) {
                item = Object.assign({}, item, {
                    Quantity: --item.Quantity
                });
                this.apiService.updateCategoryItem(this.cart, item, 'update');
            }
        },
        addQuantity(item) {
            item = Object.assign({}, item, {
                Quantity: ++item.Quantity
            });
            this.apiService.updateCategoryItem(this.cart, item, 'update');
        },
        deleteHandler(item) {
            this.apiService.updateCategoryItem(this.cart, item, 'delete');
        },
        save() {
            if (this.$refs.form.validate()) {
                if (this.editedIndex > -1) {
                    Object.assign(
                        this.shoppingCartItems[this.editedIndex],
                        this.editedItem
                    );
                    this.apiService.updateCategoryItem(
                        this.cart,
                        this.editedItem,
                        'update'
                    );
                } else {
                    this.apiService.updateCategoryItem(this.cart, this.editedItem, 'add');
                }
                this.close();
            }
        },

        editItemHandler(item) {
            this.editedIndex = this.shoppingCartItems.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.$refs.form.reset();
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        }
    }
});
</script>
