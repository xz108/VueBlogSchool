 import { createApp } from 'vue'
import App from './App.vue'
import route from  './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 import Markdown from "@/directive/Markdown";
 //bootstrap
 import 'bootstrap/dist/css/bootstrap.min.css'
 import 'bootstrap/dist/js/bootstrap.min.js'
const app = createApp(App)
 app.directive('markdown',Markdown);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
for (let iconName in ElementPlusIconsVue) {
    app.component(iconName, ElementPlusIconsVue[iconName])
}
app.use(store).use(ElementPlus).use(VueAxios, axios).use(route).mount('#app')
