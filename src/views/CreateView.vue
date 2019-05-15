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
                userData:[
                    { name: 'Russia', value: 86.8 },
                    { name: 'China', value: 106.3 },
                    { name: 'Japan', value: 94.7 },
                    { name: 'Mongolia', value: 98 },
                    { name: 'Canada', value: 98.4 },
                    { name: 'United Kingdom', value: 97.2 },
                    { name: 'United States of America', value: 98.3 },
                    { name: 'Brazil', value: 96.7 },
                    { name: 'Argentina', value: 95.8 },
                    { name: 'Algeria', value: 101.3 },
                    { name: 'France', value: 94.8 },
                    { name: 'Germany', value: 96.6 },
                    { name: 'Ukraine', value: 86.3 },
                    { name: 'Egypt', value: 102.1 },
                    { name: 'South Africa', value: 101.3 },
                    { name: 'India', value: 107.6 },
                    { name: 'Australia', value: 99.9 },
                    { name: 'Saudi Arabia', value: 130.1 },
                    { name: 'Afghanistan', value: 106.5 },
                    { name: 'Kazakhstan', value: 93.4 },
                    { name: 'Indonesia', value: 101.4 }
                ]
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
                    // 1、世界地图数据处理
                    let worldMap = ds.createView();
                    worldMap.source(res.data,{
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
                    // 2、创建表对象
                    let chart = new G2.Chart({
                        id:"c1",
                        forceFit:true,
                        height:600
                    });

                    chart.tooltip({
                        showTitle:false
                    });
                    chart.axis(false);

                    // 3、创建view1，绘制直接地图
                    let view1 = chart.view();
                    view1.source(worldMap);
                    view1.polygon()
                    .position('longitude*latitude')
                    .style({
                        fill:"#fff",
                        stroke:"#ccc",
                        lineWidth:1
                    })
                    .tooltip(false); //后面一个图表需要提示信息，这里单独关闭提示

                    // 4、获取指定地区的地址区域
                    let dv2 = ds.createView();
                    dv2.source(this.userData).transform({
                        geoDataView:worldMap,
                        type:'geo.region',
                        field:'name',
                        as:['longitude','latitude']
                    }).transform({ //数据加工,增加一项数据trend
                        type:'map',
                        callback(row){
                            row.trend = (row.value>100) ? '男性多':'女性多';
                            return row;
                        }
                    });

                    // 5、创建view2绘制，通过userData筛选出来的数据进行绘制
                    let view2 = chart.view();
                    view2.source(dv2);
                    view2.polygon()
                    .position("longitude*latitude").color("trend",['#C45A5A', '#14647D'])
                    .tooltip("name*trend");
                    
                    // 3、渲染图表
                    chart.render();
                    
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>