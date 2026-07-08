

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DefaultUrlResolver } from './dev.ts'

// fix 文件版本升级后，前端继续使用缓存，导致渲染异常
const version = "1";
DefaultUrlResolver.prototype.get_file = async function(name: string): Promise<ArrayBuffer> {
    const keys = Object.keys(this);
    const base_url = this[keys[0]];
    const url = base_url + name + "?v=" + version;
    const response = await fetch(url);
    return await response.arrayBuffer();
}

const app = createApp(App)

app.use(router)

app.mount('#app')
