<script setup lang="ts">

import { Sandpack, type SandpackFiles, type SandpackSetup } from 'sandpack-vue3';
import { ref } from 'vue';

const files= ref<SandpackFiles>({
    "/src/App.vue":{
        code:`
            <template>
              <h1>Hello, Sandpack!</h1>
            </template>            
            `,
        active:true        
    },
    // "/src/main.js":{
    //   code:`
    //   import { createApp } from 'vue';
    //   import App from './App.vue';

    //   createApp(App).mount('#app');
    //   `,      
    //},
    // "/public/index.html":{
    //   code:`<!DOCTYPE html>
    //   <html lang="">
    //     <head>
    //       <meta charset="UTF-8">          
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Vite App</title>
    //     </head>
    //     <body>
    //       <div id="app"></div>
    //       <script type="module" src="/src/main.js"/>
    //     </body>
    //   </html>
    //   `
    //}
});

const customSetup= ref<SandpackSetup>({
  dependencies:{
    // "vue": "^3.5.13",
    // "vue-router": "^4.5.0"
  }
})
</script>

<template>
    <Sandpack template="vue3" theme="light" :files="files" :custom-setup="customSetup"></Sandpack>
</template>
