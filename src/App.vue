<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const menuItems = [
  { path: '/loadscene', label: '加载场景' },
  { path: '/gis', label: 'GIS图层' },
  { path: '/loaddwg', label: '加载DWG' },
  { path: '/loadmulti', label: '加载多个' },
  { path: '/label', label: '标签' },
  { path: '/axis', label: '位置编辑' },
  { path: '/motion', label: '动画' },
  { path: '/section', label: '剖切' },
  { path: '/flow', label: '水流' },
  { path: '/select', label: '选择' },
  { path: '/filter', label: '过滤' },
  { path: '/material', label: '修改材质' },
  { path: '/hlr', label: '渲染模式' },
  // { path: '/light', label: '光照设置' },
  // { path: '/camera', label: '相机设置' },
  { path: '/fire', label: '火焰' },
  // { path: '/pbr', label: 'PBR' },
  { path: '/dispose', label: '销毁场景' },
]

const activePath = ref('')
</script>

<template>
  <div class="app-container">
    <!-- 页眉 -->
    <header class="header">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span class="logo-text">TinyBIM</span>
      </div>
      <a href="https://github.com/tinybim/Samples" target="_blank" rel="noopener noreferrer" class="github-link" title="GitHub">
        <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>
    </header>

    <!-- 主体 -->
    <div class="main-layout">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <nav class="menu">
          <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="menu-item"
            :class="{ active: $route.path === item.path }" @click="activePath = item.path">
            <span class="menu-dot"></span>
            <span class="menu-label">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <!-- 内容区 -->
      <main class="content">
        <RouterView />
      </main>

      <!-- 提示 -->
      <!-- <div class="hint">功能在右键菜单栏</div> -->
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f8f9fa;
}

/* 页眉 */
.header {
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.logo-icon {
  width: 28px;
  height: 28px;
  color: #4a90d9;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  letter-spacing: 0.5px;
}

/* GitHub 链接 */
.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: #666;
  transition: all 0.2s ease;
  text-decoration: none;
}

.github-link:hover {
  background-color: #f0f4f8;
  color: #1a1a2e;
}

.github-icon {
  width: 22px;
  height: 22px;
}

/* 主体布局 */
.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 侧边栏 */
.sidebar {
  width: 180px;
  background: #ffffff;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 2px;
}

.menu {
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f0f4f8;
  color: #1a1a2e;
}

.menu-item.active {
  background-color: #eef4fd;
  color: #4a90d9;
  font-weight: 500;
}

.menu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.menu-item:hover .menu-dot {
  background-color: #4a90d9;
}

.menu-item.active .menu-dot {
  background-color: #4a90d9;
}

/* 内容区 */
.content {
  flex: 1;
  overflow: hidden;
  background-color: #f8f9fa;
}

/* 提示 */
.hint {
  position: absolute;
  top: 20px;
  left: 500px;
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