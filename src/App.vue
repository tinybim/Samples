<script setup lang="ts">
import HeadNav from './components/HeadNav.vue';
</script>

<template>
  <div style="display: grid;grid-template-rows: auto 1fr; height: 100vh;">
    <div>
      <head-nav></head-nav>
    </div>
    <div style="display: grid; grid-template-columns: auto 1fr">
      <div style="border-right:  1px solid lightgray;padding: 10px;line-height: 1.5; height: 100%;overflow: auto;">
        <div>
          <RouterLink to="/loadscene">加载场景</RouterLink>
        </div>
        <div>
          <RouterLink to="/gis">gis图层</RouterLink>
        </div>
        <div>
          <RouterLink to="/loaddwg">加载dwg</RouterLink>
        </div>
        <div>
          <RouterLink to="/loadmulti">加载多个</RouterLink>
        </div>
        <div>
          <RouterLink to="/label">标签</RouterLink>
        </div>
        <div>
          <RouterLink to="/axis">位置编辑</RouterLink>
        </div>
        <div>
          <RouterLink to="/motion">动画</RouterLink>
        </div>
        <div>
          <RouterLink to="/section">剖切</RouterLink>
        </div>
        <div>
          <RouterLink to="/flow">水流</RouterLink>
        </div>
        <div>
          <RouterLink to="/select">选择</RouterLink>
        </div>
        <div>
          <RouterLink to="/filter">过滤</RouterLink>
        </div>
        <div>
          <RouterLink to="/material">修改材质</RouterLink>
        </div>
        <div>
          <RouterLink to="/hlr">渲染模式</RouterLink>
        </div>
        <div>
          <RouterLink to="/light">光照设置</RouterLink>
        </div>
        <div>
          <RouterLink to="/camera">相机设置</RouterLink>
        </div>
        <div>
          <RouterLink to="/fire">火焰</RouterLink>
        </div>
        <div>
          <RouterLink to="/pbr">pbr</RouterLink>
        </div>
          <div>
          <RouterLink to="/dispose">销毁场景</RouterLink>
        </div>
      </div>
      <div>
        <RouterView />
      </div>
      <div style="position: absolute; top: 100px;left: 100px;">
        功能在右键菜单栏
      </div>
    </div>


  </div>


</template>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
</style>
