import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//Fonts
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
import { getFirestore } from "firebase/firestore"
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';
import firebaseConfig from './private/firebaseConfig';

const fireApp = initializeApp(firebaseConfig);
const db = getFirestore();
initializeAppCheck(fireApp, {
    provider: new ReCaptchaV3Provider('6LdSBbkeAAAAAOBiw2zmyFF8hjjgn6Cx-OVdgRI_'),
    isTokenAutoRefreshEnabled: true
  });

//CodeEditor
import CodeEditor from 'simple-code-editor';  

//VueShowdown markdown viewer
import { VueShowdown } from 'vue-showdown';
//Vue
createApp(App)
    .use(store)
    .use(router)
    .component("Icon", FontAwesomeIcon)
    .component("CodeEdit", CodeEditor)
    .component("VueShowdown", VueShowdown)
    .mount('#app');// eslint-disable-line no-unused-vars

export {db};