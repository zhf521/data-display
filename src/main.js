// 清除默认样式
import '../node_modules/normalize.css/normalize.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

createApp(App).use(router).mount('#app');
