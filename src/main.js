import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import headerComponent from './components/Header-component.vue';
import CategoryComponent from './components/homepage/Category-component.vue';
import footerComponent from './components/Footer-component.vue';
import JwPagination from 'jw-vue-pagination';
import Homepage from './page/homepage.vue';
import LoginPage from './page/login-page.vue';
import setting from './page/account-setting.vue';
import RegisterPage from './page/register-page.vue';
import shoppingCart from './page/shopping-cart.vue';
import PurchaseHistory from './page/Purchase-history.vue';
import locationAdress from './page/location-adress.vue';
import BusinessPerformance from './page/Business-performance.vue';
import production from './page/production.vue';
import storecontroller from '../storecontroller';
import accountMenu from './components/account/account-menu.vue';
import { createRouter, createWebHistory } from 'vue-router';
import sellingCompomemt from './components/selling/form-one-seller.vue';
import storepage from './page/store-page.vue';
import StoreComponent from './components/production/store-component.vue';
import storePage from './page/store-page.vue';
import FormOneSeller from './components/selling/form-one-seller.vue'
import FormTwoSeller from './components/selling/form-two-seller.vue'
import FormThreeSeller from './components/selling/form-three-seller.vue'
import FormFourSeller from './components/selling/form-four-seller.vue'
import StartSelling from './components/selling/start-selling.vue'
import salesPage from './components/selling/sales-page.vue'
import myStore from './page/myStore.vue';
import OtpPage from './page/OPT-Component.vue';
import reviewPage from './components/production/reviewPage.vue';
import commemt from "./components/production/commemt-component.vue"
import EditProduct from './components/production/EditProduct.vue';
import ProductCatrgory from '@/components/homepage/Product-Catrgory.vue';
import OrderHistory from './page/order-history.vue';
import AddressSeller from './page/AddressSeller.vue';
import receiptComponent from './page/receipt-component.vue';
library.add(fas, faGoogle);
const routes = [
    {
        path: '/receiptComponent',
        name: 'receiptComponent',
        component: receiptComponent
    },{
        path: '/AddressSeller',
        name: 'AddressSeller',
        component: AddressSeller
    },{
        path: '/OrderHistory',
        name: 'OrderHistory',
        component: OrderHistory
    },{
        path: '/ProductCatrgory',
        name: 'ProductCatrgory',
        component: ProductCatrgory
    },
    {
        path: '/', name: 'Homepage', component: Homepage
    }, 
    {
        path: '/shop/EditProduct', name: 'EditProduct', component: EditProduct
    },
    {
        path: '/users/OTP', name: 'OtpPage', component: OtpPage
    },
    {
        path: '/users/login', name: 'LoginPage', component: LoginPage
    },
    {
        path: '/users/setting', name: 'setting', component: setting
    },
    {
        path: '/users/register', name: 'RegisterPage', component: RegisterPage
    },
    // {
    //     path: '/users/shoppingCart',name: 'shoppingCart',component: shoppingCart
    // },
    {
        path: '/users/PurchaseHistory', name: 'PurchaseHistory', component: PurchaseHistory
    },
    {
        path: '/users/locationAdress', name: 'locationAdress', component: locationAdress
    },
    {
        path: '/users/Business', name: 'BusinessPerformance', component: BusinessPerformance
    },
    {
        path: '/users/production', name: 'production', component: production
    },
    {
        path: '/users/cart', name: 'shoppingCart', component: shoppingCart
    }, {
        path: '/users/selling', name: 'selling', component: sellingCompomemt
    },
    {
        path: '/users/storepage', name: 'storepage', component: storepage
    },
    {
        path: '/store/:seller',
        component: StoreComponent
    },
    {
        path: '/store/:seller',
        name: 'StoreComponent',
        component: StoreComponent,
        props: true
    },
    {
        path: '/store/storepage',
        name: 'StorePage',
        component: storePage,
        props: route => ({ shopInfo: route.params.shopInfo })
    }, {
        path: '/selling/FormTwoSeller', name: 'FormTwoSeller', component: FormTwoSeller
    }, {
        path: '/selling/FormOneSeller', name: 'FormOneSeller', component: FormOneSeller
    }, {
        path: '/selling/FormThreeSeller', name: 'FormThreeSeller ', component: FormThreeSeller
    }, {
        path: '/selling/FormFourSeller', name: 'FormFourSeller ', component: FormFourSeller
    }, {
        path: '/selling/StartSelling', name: 'StartSelling ', component: StartSelling
    }, {
        path: '/selling/salesPage', name: 'salesPage ', component: salesPage
    }, {
        path: '/selling/myStore', name: 'myStore ', component: myStore
    }, {
        path: '/selling/reviewPage', reviewPage: 'myStore ', component: reviewPage
    }, {
        path: '/selling/commemt', reviewPage: 'commemt ', component: commemt
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('headerComponent', headerComponent);
app.component('CategoryComponent', CategoryComponent);
app.component('footerComponent', footerComponent);
app.component('JwPagination', JwPagination);
app.component('menuComponent', accountMenu);
app.mount('#app');
app.use(storecontroller)