<template>
  <div class="home">
    <div id="c1"></div>
    <div id="c2"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {
      g2_data:[
          {genre:"Sports",sold:275},
          {genre:"Strategy",sold:115},
          {genre:"Action",sold:120},
          {genre:"Shooter",sold:350},
          {genre:"Other",sold:150},
        ],
      chart:null,
    }
  },
  mounted(){
    // 图表1
    this.c1();
  },
  methods:{
    /**
     * 图标1
     */
    c1:function(){
      const data = this.g2_data;
      // 穿件chart对象
      this.chart = new G2.Chart({
        container:"c1",
        forceFit:true,
        height:300
      });
      // 载入数据源
      this.chart.source(data);
      // 创建图形语法，绘制柱状图，有genre和sold两个属性决定图形位置，genre映射至x轴，sold映射至y轴
      this.chart.interval().position("genre*sold").color("genre");
      // 渲染图表
      this.chart.render();
    }
  },
}
</script>
