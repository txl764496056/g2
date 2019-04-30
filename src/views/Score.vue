<template>
    <div class="chart-list">
        
        <div class="unit">
            <p>成绩显示没有设置范围<span>成绩应该是0-100</span></p>
            <div class="chart" id="c1"></div>
        </div>

        <div class="u">
            <p>成绩显示设置范围min:0,max:100</p>
            <div class="chart" id="c2"></div>
        </div>
        
        <div class="unit">
            <p>成绩显示设置范围min:0,max:100,<span>成绩刻度线改为4条</span>为了满足用户对坐标点个数的需求，有时候会扩大数据的范围120>max:100</p>
            <div class="chart" id="c3"></div>
        </div>

        <div class="unit">
            <p>最大范围限制maxLimit:100,<span>范围最大值不会超过maxLimit</span></p>
            <div class="chart" id="c4"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Score",
        data(){
            return {
                chartH:370,
                arr:[
                    {name:"张三",score:53},
                    {name:"王五",score:92}
                ]
            }
        },
        mounted(){
            // 成绩没有设置范围
            this.chart1();
            // 成绩设置范围之后
            this.chart2();
            // 自定义刻度线条数为4
            this.chart3();
            // 设置maxLimit
            this.chart4();
        },
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr;
                let chart1 = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH
                });
                // 载入数据
                chart1.source(data);
                chart1.point().position("name*score").color("name");
                chart1.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr;
                let chart2 = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH
                });
                // 载入数据
                chart2.source(data,{
                    "score":{
                        min:0,
                        max:100
                    }
                });
                chart2.point().position("name*score").color("name");
                chart2.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr;
                let chart3 = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.chartH
                });
                // 载入数据
                chart3.source(data,{
                    score:{
                        min:0,
                        max:100,
                        tickCount:4
                    }
                });
                chart3.point().position("name*score").color("name");
                chart3.render();
            },
            chart4(){
                let _this = this;
                let data = this.arr;
                let chart4 = new G2.Chart({
                    id:"c4",
                    forceFit:true,
                    height:_this.chartH
                });
                // 载入数据
                chart4.source(data,{
                   score:{
                        min:0,
                        maxLimit:100,
                        tickCount:4
                   }
                });
                chart4.point().position("name*score").color("name");
                chart4.render();
            }
        }
    }
</script>

<style lang="scss" scoped>
// p{background-color:#cfded7;padding:20px;}
// p,span{font-size:16px;}
// span{color:#ff0000;}
// .chart{background-color:#fff;margin-bottom:30px;box-shadow:0 3px 5px rgba(38,103,73,0.2);}
</style>