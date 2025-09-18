import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    _create_route('loadscene','LoadApp'),
    _create_route(`loaddwg`,`LoadDwg`),
    _create_route(`loadmulti`,`LoadMulti`),
    _create_route(`label`,`AddLabel`),
    _create_route(`section`,`Section`), 
    _create_route(`flow`,`Flow`),
    _create_route(`select`,`Selection`),
    _create_route(`filter`,`Filter`),
    _create_route(`material`,`Material`),
    _create_route(`hlr`,`HLR`),
    _create_route(`camera`,`Camera`),
    _create_route(`light`,`LightSetting`),
    _create_route(`axis`,`Axis`),
    _create_route(`fire`,`Fire`),
    _create_route('pbr',"Pbr"),
    _create_route('dispose',"Dispose")
  ],
})

function _create_route(name:string,component:string){
  return {
    path: `/${name}`,
    name: name,
    component: ()=>import(`../views/${component}.vue`),
  }
}

export default router
