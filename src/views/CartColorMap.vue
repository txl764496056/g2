<template>
    <div>
        <p v-if="isShow">数据较大，请等待...</p>
        <div id="c1"></div>
    </div>
</template>

<script>
    export default {
        name:"CartColorMap",
        data(){
            return {
                isShow:true,
                arr:[
                    // {date:2011.10,value:,name:"New York"},
                ]
            }
        },
        mounted(){
            let _this = this;

            let promise = Promise.resolve();

            promise.then(res=>{
                return axios.get(_this.$url.cart_color_map);
            }).then(res=>{
                _this.arr = res.data;
                return ;
            }).then(res=>{
                _this.chart();
            });

        },
        methods:{
            chart(){
                let _this = this;
                let data = this.arr;
                const ds = new DataSet();
                const dv = ds.createView().source(data);
                // 字段展开
                // 数据结构[{"Austin":40,"New York":65,"San Francisco":58,"date":"2012-01-09"},{...},{...}]
                // 将各个城市温度分解出来，温度作为y轴，日期时x轴，3种颜色表示3个城市
                dv.transform({
                    type:"fold",
                    fields:['New York','San Francisco','Austin'],
                    key:'city',
                    value:'value', //展开后，就是 key:"city"=>"city":"New York" , value:value=>value:65
                    retains:['date']
                });
                const chart = new G2.Chart({
                    container:'c1',
                    forceFit:true,
                    height:400,
                });
                chart.source(dv,{
                    date:{
                        type:"time",
                        mask:"YYYY.MM",
                        tickCount:12
                    },
                    value:{
                        alias:"Temperature,℉",
                        min:10,
                    }
                });
                chart.axis('date',{
                    line:null,
                    tickLine:{
                        stroke:"#000",
                        length:6
                    },
                    line:{
                        stroke:"#000"
                    }
                });
                chart.axis('value',{
                    tickLine:{
                        stroke:"#000",
                        length:6
                    },
                    label:{
                        textStyle:{
                            fill:"#000"
                        }
                    },
                    line:{
                        stroke:"#000"
                    },
                    grid:null
                })
                chart.line()
                .position("date*value")
                .color('city',['#1f77b4','#ff7f0e','#2ca02c'])
                .shape("spline")
                .size(2);
                chart.render();

                // 隐藏“数据较大，请等待文字...”
                // this.isShow = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/g2.scss';
p{color:$theme-color;font-size:24px;}
</style>