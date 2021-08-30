import { createApp } from 'vue'
import App from './App.vue'
import { components, plugins } from './element'
import store from './store'
import router from './router'
import VideoPlayer from 'vue-video-player/src'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'

require('bootstrap')
const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
})
plugins.forEach(plugin => {
  app.use(plugin)
})
app.use(VideoPlayer)
app.use(store)
app.use(router)
app.mount('#app')
