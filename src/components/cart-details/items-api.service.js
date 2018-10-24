import firebaseApp from '../../firebase/config';
const fireStoreApp = firebaseApp.firestore();

export default class ItemsApiService {

    constructor() { };

    updateCategoryItem(cart, categoryItem, action) {
        
            fireStoreApp.collection('Shopping').doc(`${cart.categoryID}`).get().then(snapshot => {

                if (snapshot.data().Products !== undefined && snapshot.data().Products[0] !== '') {

                    const isItemExists = snapshot.data().Products.some(item => item.Name.toLowerCase() === categoryItem.Name.toLowerCase());

                    if (isItemExists === true) {
                        // add existing item
                        if (action === 'add') {
                            this.addExisting(cart, snapshot.data().Products, categoryItem);
                            // resolve(true);
                        }
                        // update existing 
                        else if (action === 'update') {
                            this.update(cart, snapshot.data().Products, categoryItem);
                            // resolve(true);
                        }
                        else if (action === 'delete') {
                            this.deleteHandler(cart, snapshot.data().Products, categoryItem);
                            // resolve(true);
                        }
                    } else {
                        // add new item
                        this.add(cart, snapshot.data().Products, categoryItem)
                    }
                    return snapshot;
                }
        });
    };

    update(cart, snapshot, categoryItem) {
        let list = Array.from(snapshot);
        list = list.filter(item => {
            if (item.Name === categoryItem.Name) {
                return item = Object.assign(item, categoryItem);
            } else {
                return item;
            }
        });
        fireStoreApp.collection('Shopping').doc(cart.categoryID).update({ Name: cart.Name, Products: [...list] });
    };

    add(cart, snapshot, categoryItem) {
        const list = Array.from(snapshot);
        list.push(categoryItem);
        fireStoreApp.collection('Shopping').doc(cart.categoryID).set({ Name: cart.Name, Products: [...list] });
    };

    addExisting(cart, snapshot, categoryItem) {
        let list = Array.from(snapshot);
        list = list.filter(item => {
            if (item.Name === categoryItem.Name) {
                item = Object.assign(item, categoryItem, {
                    Quantity: (categoryItem.Quantity === 0) ? parseInt(++item.Quantity) : parseInt(item.Quantity) + parseInt(categoryItem.Quantity)
                });
                return item;
            } else {
                return item;
            }
        });
        fireStoreApp.collection('Shopping').doc(cart.categoryID).update({ Name: cart.Name, Products: [...list] });
    };

    deleteHandler(cart, snapshot, categoryItem) {
        let list = Array.from(snapshot);
        list = list.filter(item => {
            if (item.Name !== categoryItem.Name) {
                return item;
            }
        });
        fireStoreApp.collection('Shopping').doc(cart.categoryID).update({ Name: cart.Name, Products: [...list] });
    }

}