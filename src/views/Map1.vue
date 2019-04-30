<template>
    <div>
        <div id="c1"></div>
    </div>
</template>

<script>
    export default {
        name:'Map1',
        data(){
            return {
                arr:[]
            }
        },
        mounted(){
            this.chart();
        },
        methods:{
            chart(){
                axios.get("/static/us-states.hex.json").then(res=>{
                    let data = res.data;
                    let dv = new DataSet.View().source(data,{
                        type:'hex',
                        width:100,
                        height:100
                    });

                    let chart = new G2.Chart({
                        id:"c1",
                        forceFit:true,
                        height:500
                    });

                    chart.scale({
                        x:{
                            nice:false,
                            sync:true
                        },
                        y:{
                            nice:false,
                            sync:true
                        }
                    });

                    chart.coord().reflect();
                    chart.tooltip({
                        showTitle:false
                    });
                    chart.axis(false);
                    // 灰色背景
                    var bgView = chart.view();
                    bgView.source(dv._gridRows);
                    bgView.polygon().position("x*y").color("grey").opacity(0.5).style({
                        stroke:"white",
                        lineWidth:1
                    }).tooltip('key');

                    let mapView = chart.view();
                    mapView.source(dv);
                    mapView.polygon().position('x*y').color(G2.Global.colors[1]).style({
                        strike:'white',
                        lineWidth:4
                    }).label('key',{
                        offset:0,
                        textStyle:{
                            fontSize:20,
                            fontWeight:500
                        }
                    }).tooltip('capital');


                    chart.render();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>