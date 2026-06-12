<script setup lang="ts">
import { CachedTiandituLoader } from '@/utils/CachedTiandituLoader';
import { CameraType,   DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { load_tiny_app } from '@/utils/Loader';

let app:TinyApp;
let view:UIView;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
  
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);

        //获取默认窗口
        view = app.default_view;       



        window.setTimeout(()=>{
            const gis = view.gis_manager;           
            gis.location =chengdu;
            gis.enable_img_layer();
            gis.enable_terrain_layer();
        },2000);

    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const chengdu={lon:104.066,lat:30.66,height:500000};
const beijing ={lon:116.3912757,lat:39.906217,height:100000};
const set_chengdu=()=>{
    view.gis_manager.location = chengdu;
}
const set_beijing=()=>{
    view.gis_manager.location = beijing;
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_chengdu">成都</button>       
        <button @click="set_beijing">北京</button> 
        <div class="hint">
            测试天地图Key,请求次数有限，请自行申请
        </div> 
    </div>
</template>
<style scoped>
/* 提示 */
.hint {
  /* position: absolute;
  top: 20px;
  left: 500px; */
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  color: #888;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  user-select: none;
}
</style>