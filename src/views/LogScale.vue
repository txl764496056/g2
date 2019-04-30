<template>
    <div>
        <div class="unit">
            <p>pv <span>没有</span>  指定log类型</p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>pv指定log类型</p>
            <div class="chart" id="c2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"LogScale",
        data(){
            return {
                arr:[
                    {site:"站点1",pv:10},
                    {site:"站点2",pv:99},
                    {site:"站点3",pv:10000}
                ]
            }
        },
        mounted(){
            // pv没有指定log类型
            this.chart1();
            // pv指定log类型
            this.chart2();
        },
        methods:{
            chart1(){
                let data = this.arr;
                let chart1 = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:360
                });
                // 载入数据
                chart1.source(data);
                chart1.point().position("site*pv").color("site");
                chart1.render();
            },
            chart2(){
                let data = this.arr;
                let chart2 = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:360
                });
                // 载入数据
                chart2.source(data,{
                    pv:{
                        type:"log",
                        base:10
                    }
                });
                chart2.point().position("site*pv").color("site");
                chart2.render();
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