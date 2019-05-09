<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/llinkagechart">图表联动示例</router-link>
      <router-link to="/temperature">气候表</router-link>
      <router-link to="/columndefinition">列定义</router-link>
      <router-link to="/score">成绩表</router-link>
      <router-link to="/logscale">log度量</router-link>
      <router-link to="/cartcolormap">分类数据的颜色映射</router-link>
      <router-link to="/linearcolormap">连续数据的颜色映射??</router-link>
      <router-link to="/map1">地图1</router-link>
      <router-link to="/coord">Coord坐标系</router-link>
      <router-link to="/axis">Axis坐标系</router-link>
      <router-link to='/customlabel'>html自定义label</router-link>
      <router-link to='/legend'>图列</router-link>
      <router-link to='/tooltip'>提示信息</router-link>
      <router-link to='/guide'>辅助元素</router-link>
      <router-link to='/facet'>分面</router-link>
      <router-link to='/theme'>图表皮肤（全局样式）</router-link>
      <router-link to='/theme2'>图表皮肤2(针对不同的表进行设置)</router-link>
      <router-link to='/label'>label文本</router-link>
      <router-link to='/chartevt'>图表事件</router-link>
      <router-link to='/interaction'>图表交互</router-link>
      <router-link to='/slider'>滑块插件</router-link>
      <router-link to='/synload'>数据异步加载与动态更新</router-link>
      <router-link to='/shape'>自定义形状shape</router-link>
      <router-link to='/customAnimate'>自定义动画</router-link>
      <router-link to='/createview'>创建view</router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import "css/g2.scss";
*{margin:0;padding:0;box-sizing:border-box;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:flex;
}
#nav {
  // padding:15px 30px;position:fixed;top:0;left:0;right:0;background-color:#fff;z-index:999;
  width:20%;flex-shrink:0;
  a {
    color: #2c3e50;
    font-size:14px;
    margin:5px;
    text-align:right;
    display:block;
    padding:5px 10px;
    border:1px solid #ddd;
    border-radius:5px;
    text-decoration:none;
    &.router-link-exact-active {
      background-color:$theme-color;color:#fff;border-color:$theme-color;
    }
  }
}
#nav,.content{height:100vh;overflow-y:auto;overflow-x:hidden;}
.content{width:80%;flex-shrink:0;padding:15px;}
.unit{
  margin-bottom:30px;box-shadow:0 3px 5px rgba(38,103,73,0.2);
  p{background-color:#cfded7;padding:20px;}
  p,span{font-size:16px;}
  p span{color:#ff0000;}
  .chart{background-color:#fff;margin-top:30px;}
}
</style>
