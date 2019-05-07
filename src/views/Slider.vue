<template>
    <div>
        <div class="unit">
            <p>滑块插件</p>
            <div class="chart" id="c1"></div>
            <div id="slider"></div>
        </div>
    </div>
</template>

<script>
import G2 from '@antv/g2'
import Slider from '@antv/g2-plugin-slider'
    export default {
        name:"Slider",
        data(){
            return {
            }
        },
        mounted(){
            this.chart();
        },
        methods:{
            chart(){
                let _this = this;
                let promise = Promise.resolve();

                promise.then(res=>{
                    return axios.get("/static/peking-aqi.json");
                }).then(res=>{
                    
                    let data = res.data;
                    
                    let ds = new DataSet({
                        state:{
                            start:'2004-01-01',
                            end:'2007-09-24'
                        }
                    });

                    let dv = ds.createView();
                    dv.source(data).transform({
                        type:"filter",
                        callback:obj=>{
                            return obj.date>="2007-09-24" && obj.date<="2014-01-01"
                        }
                    });

                    let chart = new G2.Chart({
                        id:"c1",
                        forceFit:true,
                        height:600
                    });

                    chart.scale({
                        date:{
                            type:"time",
                            mask:"MM-DD"
                        }
                    })

                    // 创建视图，并设置坐标，y轴占用45%
                    let view1 = chart.view({
                        start:{
                            x:0,
                            y:0
                        },
                        end:{
                            x:1,
                            y:0.45 
                        }
                    });
                    view1.source(dv);
                    view1.line().position("date*aqi");

                    // 创建视图，并设置坐标，y轴占用45%
                    let view2 = chart.view({
                        start:{
                            x:0,
                            y:0.55
                        },
                        end:{
                            x:1,
                            y:1
                        }
                    });
                    view2.source(dv);
                    view2.interval().position("date*aqi");

                    // 渲染
                    chart.render();

                    // 创建slider
                    let slider = new Slider({
                        container:'slider',
                        height:30,
                        start:'2004-01-01',
                        end:'2007-09-24',
                        data, //！！！注意，这里原始数据，不是载入dv
                        xAxis:'date',
                        yAxis:'aqi',
                        padding:[20,120,20,90],
                        onChange:({startText,endText})=>{
                            ds.setState('start',startText);
                            ds.setState('end',endText);
                        }
                    });
                    slider.render();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>