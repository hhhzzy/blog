<template>
    <div class="header-bar">
        <div v-if="mode == 'vertical'" class="hamburger-container" @click="toggleSidebar">
            <svg-icon name="hamburger" class="hamburger-svg" width="20" height="20" />
        </div>
        <Breadcrumb
            id="breadcrumb-container"
            class="breadcrumb-container"
        />
        <Mine />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Breadcrumb from './Breadcrumb/index.vue'
import Mine from './Mine/index.vue'
import { AppModule } from '@/store/modules/app'
@Component({
    name: 'HeaderBar',
    components: {
        Breadcrumb,
        Mine
    }
})
export default class HeaderBar extends Vue {
    // 点击切换左边菜单
    private toggleSidebar() {
        AppModule.ToggleSideBar()
    }
    get mode() {
        return AppModule.sidebar.mode
    }
}
</script>
<style lang="less" scoped>
.header-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.hamburger-svg{
    vertical-align: middle;
    display: inline-block;
}
</style>
