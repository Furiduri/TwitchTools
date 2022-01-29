import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//CSS
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

//Firebase
import {
    initializeApp
} from 'firebase/app';

import firebaseConfig from './private/firebaseConfig';

initializeApp(firebaseConfig);

//Vue
createApp(App)
    .use(store)
    .use(router)
    .component("Icon", FontAwesomeIcon)
    .mount('#app');// eslint-disable-line no-unused-vars