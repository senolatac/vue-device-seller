import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './global.css';

global.jQuery = require('jquery');
const $ = global.jQuery;
window.$ = $;

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDesktop,
    faHome, faLaptop, faMobileAlt, faTabletAlt,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome,
    faUserCircle, // => in form => user-circle
    faDesktop, // => desktop
    faLaptop, // laptop
    faMobileAlt, //mobile-alt
    faTabletAlt //tablet-alt
);


createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
