import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        // history: [],
        selectedProduct: null,
        users: [],
        currentUser: JSON.parse(localStorage.getItem('user')) || { id: null, name: '', role: 'user', balance: 0 },
        shopInfo: null,
        productInfo: null,
        shopName: ''
    },
    getters: {
        shopInfo: state => state.shopInfo,
        shopName: state => state.shopName,
        products: state => state.products,
        productInfo: state => state.productInfo,
        cart: state => state.cart,
        // history: state => state.history,
        cartItemCount: state => state.cart.reduce((count, product) => count + product.quantity, 0),
        cartTotal: state => state.cart.reduce((total, product) => total + (product.price * product.quantity), 0),
        selectedProduct: state => state.selectedProduct,
        user: state => userId => state.users.find(user => user.id === userId),
        currentBalance: state => state.currentUser.balance,
    },
    mutations: {
        // SET_HISTORY(state, history) {
        //     state.history = history;
        // },
        setShopInfo(state, shopInfo) {
            state.shopInfo = shopInfo;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setShopName(state, shopName) {
            state.shopName = shopName;
        },
        setProductInfo(state, productInfo) {
            state.productInfo = productInfo;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        ADD_TO_CART(state, product) {
            const item = state.cart.find(
                item => item.id === product.id
            );
            if (item) {
                item.quantity += product.quantity;
            } else {
                product.quantity = product.quantity || 1;
                state.cart.push({ ...product });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }, 
        // ADD_TO_HISTORY(state, product) {
        //     state.history.push({ ...product });
        //     localStorage.setItem('history', JSON.stringify(state.history));
        // },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_QUANTITY(state, { productId, quantity }) {
            const item = state.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        SET_SELECTED_PRODUCT(state, product) {
            state.selectedProduct = product;
        },
        LOAD_CART(state) {
            state.cart = JSON.parse(localStorage.getItem('cart')) || [];
        }, 
        // LOAD_HISTORY(state) {
        //     state.history = JSON.parse(localStorage.getItem('history')) || [];
        // },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        REMOVE_ALL_CART_ITEMS(state) {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_BALANCE(state, { userId, amount }) {
            const user = state.users.find(user => user.id === userId);
            if (user) user.balance -= amount;
        }
    },
    actions: {
        // async loadHistory({ commit }) {
        //     try {
        //         const response = await axios.get('/getHistory');
        //         commit('SET_HISTORY', response.data);
        //     } catch (error) {
        //         console.error('Error loading history:', error);
        //     }
        // },
        async fetchProducts({ commit }) {
            try {
                const response = await axios.get('http://localhost:8081/selling/productss');
                commit('setProducts', response.data); // เก็บข้อมูลสินค้าใน Vuex Store
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchShopInfo({ commit }) {
            try {
                const response = await axios.get('http://localhost:8081/shop/shops');
                commit('setShopInfo', response.data.data[0]); // เก็บข้อมูลร้านค้าใน Vuex Store
            } catch (error) {
                console.error('Error fetching shop info:', error);
            }
        },
        async loadUsers({ commit }) {
            try {
                const response = await axios.get('http://localhost:8081/users');
                commit('SET_USERS', response.data);
            } catch (error) {
                console.error('Error loading users:', error);
            }
        },
        updateShopInfo({ commit }, shopInfo) {
            commit('setShopInfo', shopInfo);
        },
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('http://localhost:8081/users/login', { email, password });
                const user = response.data;
                commit('SET_CURRENT_USER', user);
                return user;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async loadProducts({ commit }) {
            try {
                const response = await axios.get('/seller/item');
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },

        processPayment({ commit, getters }, { userId, amount }) {
            const user = getters.user(userId);
            if (user && user.balance >= amount) {
                commit('UPDATE_BALANCE', { userId, amount });
                return true; // Payment success
            } else {
                return false; // Payment failure
            }
        },
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        // addToHistory({ commit }, product) {
        //     commit('ADD_TO_HISTORY', product);
        // },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        updateQuantity({ commit }, { productId, quantity }) {
            commit('UPDATE_QUANTITY', { productId, quantity });
        },
        setSelectedProduct({ commit }, product) {
            commit('SET_SELECTED_PRODUCT', product);
        },
        loadCart({ commit }) {
            commit('LOAD_CART');
        },

    }
});
