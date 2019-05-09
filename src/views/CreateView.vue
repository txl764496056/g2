<template>
    <div>
        <div class="unit">
            <p>创建view</p>
            <div class="chart" id="c1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'CreateView',
        data(){
            return {

            }
        },
        mounted(){
            this.mapChart();
        },
        methods:{
            /**
             * 绘制世界地图
             * 白色填充
             * 灰色描边
             */
            mapChart(){
                let promise = Promise.resolve();
                promise.then(res=>{
                    return axios.get('/static/world.geo.json');
                }).then(res=>{
                    let ds = new DataSet();
                    let dv = ds.createView();
                    dv.source(res.data,{
                        type:'GeoJSON'
                    })
                    // .transform({
                    //     type:'geo.projection',
                    //     projection:'geoMercator'
                    // })
                    .transform({
                        type:'pick',
                        fields:['longitude','latitude','name']
                    })
                    
                    
                    console.log(dv);
                    let chart = new G2.Chart({
                        id:"c1",
                        forceFit:true,
                        height:600
                    });

                    chart.tooltip({
                        showTitle:false
                    });
                    chart.axis(false);

                    chart.source(dv);

                    chart.polygon()
                    .position('longitude*latitude')
                    .style({
                        fill:"#fff",
                        stroke:"#ccc",
                        lineWidth:1
                    })
                    .tooltip(false); //后面一个图表需要提示信息，这里单独关闭提示
                    chart.render();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>