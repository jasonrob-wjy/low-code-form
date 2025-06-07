<template>
  <Header :isEditor="false" />
  <div>
    <h1 class="font-weight-100 text-center m0 p0">组件市场</h1>
    <div class="container mc flex">
      <nav class="category mc">
        <Router-Link to="/select-group" class="category-item">
          <el-icon>
            <CircleCheck />
          </el-icon>
          <div>选择</div>
        </Router-Link>
        <Router-Link to="/input-group" class="category-item">
          <el-icon>
            <EditPen />
          </el-icon>
          <div>文本输入</div>
        </Router-Link>
        <Router-Link to="/advanced-group" class="category-item">
          <el-icon>
            <Files />
          </el-icon>
          <div>高级题型</div>
        </Router-Link>
        <Router-Link to="/note-group" class="category-item">
          <el-icon>
            <ChatLineSquare />
          </el-icon>
          <div>备注说明</div>
        </Router-Link>
        <Router-Link to="/personal-info-group" class="category-item">
          <el-icon>
            <User />
          </el-icon>
          <div>个人信息</div>
        </Router-Link>
        <Router-Link to="/contact-group" class="category-item">
          <el-icon>
            <Message />
          </el-icon>
          <div>联系方式</div>
        </Router-Link>
      </nav>
      <div class="coms">
        <Router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue'
// 引入对应图标
import { CircleCheck, Files, EditPen, ChatLineSquare, User, Message } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.container {
  width: 1180px;
  height: 600px;
}
.category {
  width: 70px;
  height: 100%;
  > .category-item {
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
    text-decoration: none;
    font-size: var(--font-size-base);
    color: var(--white);
    border-top-left-radius: var(--border-radius-lg);
    border-bottom-left-radius: var(--border-radius-lg);
  }
}
@for $i from 1 through 4 {
  .category-item:nth-child(4n + #{$i}) {
    @if $i == 1 {
      background-color: var(--primary-color);
    } @else if $i == 2 {
      background-color: var(--success-color);
    } @else if $i == 3 {
      background-color: var(--warning-color);
    } @else if $i == 4 {
      background-color: var(--error-color);
    }
  }
}
.coms {
  width: calc(1180px - 60px);
  height: 100%;
}

h1 {
  height: 50px;
  margin: 20px 0;
}

.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 5px;
}
</style>
