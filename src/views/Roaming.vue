<script setup lang="ts">
import { hide_plant, load_tiny_app } from '@/utils/Loader';
import { CameraType, DefaultUrlResolver, TinyApp } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';


let app: TinyApp;

const dom = ref<HTMLDivElement>();
onMounted(async () => {
  if (!app) {
    const div = dom.value as HTMLDivElement;
    app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")], div);
    const win = app.default_window;
    win.shadow = true;

    // window.setTimeout(() => {
      const o = new Float32Array([-11659.8486328125, -21336.7890625, 2000]);
      win.camera.set_info({
        type: CameraType.Roaming,
        eye: o,
        direction: [0, 1, 0],
        up: [0, 0, 1],
        viewport: null
      });
    // }, 1000);
    hide_plant(app);
  }
});
onBeforeUnmount(() => {
  app?.dispose();
});
const camHelpOpen = ref(true);
</script>
<template>
  <div ref="dom" style="width: 100%;height: 100%;"></div>
  <div style="position:fixed; top:50px; left: 250px;">
<!-- ===== 相机操作说明 ===== -->
<div id="cam-help">
<div class="cam-header" @click="camHelpOpen = !camHelpOpen">
  <span class="cam-title">相机操作说明</span>
  <span class="cam-icon" :title="camHelpOpen ? '收起' : '展开'">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.9.4-1 .9-1 1.7"/>
      <path d="M12 16.8h.01"/>
    </svg>
  </span>
</div>

  <template v-if="camHelpOpen">
    <div class="cam-panel">
      <!-- WASD -->
      <div class="cam-group">
        <div class="cam-wasd">
          <span></span><span class="cam-key">W</span><span></span>
          <span class="cam-key">A</span><span class="cam-key">S</span><span class="cam-key">D</span>
        </div>
        <div class="cam-group-label">前后左右移动</div>
      </div>
      <!-- Q / E -->
      <div class="cam-group">
        <div class="cam-qe">
          <div class="cam-qe-item"><span class="cam-key">Q</span><span>上升</span></div>
          <div class="cam-qe-item"><span class="cam-key">E</span><span>下降</span></div>
        </div>
        <div class="cam-group-label">垂直升降</div>
      </div>
      <!-- 鼠标 -->
      <div class="cam-group">
        <div class="cam-mouse"></div>
        <div class="cam-group-label">移动视角</div>
      </div>
      <!-- 文字说明 -->
      <div class="cam-legend">
        <div><b>W / S</b> — 前进 / 后退</div>
        <div><b>A / D</b> — 左移 / 右移</div>
        <div><b>Q / E</b> — 上升 / 下降</div>
        <div><b>鼠标</b> — 移动视角</div>
      </div>
    </div>
  </template>
</div>
  </div>
</template>
<style scoped>
#cam-help {
  font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  width: 100%;
  max-width: 640px;
  color: #333;
}

/* ===== 标题行：点击展开/收起 ===== */
#cam-help .cam-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 4px 2px;
  margin-bottom: 8px;
}

#cam-help .cam-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 0;
}

#cam-help .cam-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}

#cam-help .cam-header:hover .cam-icon {
  color: #333;
}

/* 收起状态：图标缩小变淡 */
#cam-help .cam-icon-closed {
  transform: scale(0.85);
  opacity: 0.6;
}

/* ===== 面板 ===== */
#cam-help .cam-panel {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  background: #fff;
}

#cam-help .cam-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

#cam-help .cam-group-label {
  font-size: 12px;
  color: #999;
}

/* ===== WASD 键位 ===== */
#cam-help .cam-wasd {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-auto-rows: 40px;
  gap: 6px;
}

#cam-help .cam-key {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border: 1px solid #d0d0d0;
  border-bottom-width: 3px;
  border-radius: 6px;
  background: #fafafa;
  user-select: none;
}

/* ===== Q / E ===== */
#cam-help .cam-qe {
  display: flex;
  gap: 16px;
}

#cam-help .cam-qe-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

/* ===== 鼠标图形（纯 CSS 绘制） ===== */
#cam-help .cam-mouse {
  width: 44px;
  height: 64px;
  border: 1.5px solid #333;
  border-radius: 22px;
  position: relative;
}

#cam-help .cam-mouse::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 1.5px;
  height: 22px;
  background: #333;
  transform: translateX(-50%);
}

#cam-help .cam-mouse::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 8px;
  width: 6px;
  height: 12px;
  border-radius: 3px;
  background: #333;
  transform: translateX(-50%);
}

/* ===== 文字说明 ===== */
#cam-help .cam-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

#cam-help .cam-legend b {
  font-weight: 600;
  color: #333;
}

#cam-help .cam-foot {
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
}
</style>