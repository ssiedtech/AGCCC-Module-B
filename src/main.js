import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/vuex.js'
import pipwerks from './assets/scorm-api-wrapper.js';

pipwerks.SCORM.init();
pipwerks.SCORM.data.set('cmi.exit', 'suspend')
const app = createApp(App)
app.use(store);
app.mount('#app');
