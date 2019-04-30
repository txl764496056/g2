<template>
    <div>
        <div class="unit">
            <p>案例1：全局主体</p>
            <div class="chart" id="c1"></div>
            <div class="chart" id="c2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Theme',
        data(){
            return {
                chartH:400,
                arr:[
                    { time: '10:10', call: 4, waiting: 2, people: 2 },
                    { time: '10:15', call: 2, waiting: 6, people: 3 },
                    { time: '10:20', call: 13, waiting: 2, people: 5 },
                    { time: '10:25', call: 9, waiting: 9, people: 1 },
                    { time: '10:30', call: 5, waiting: 2, people: 3 },
                    { time: '10:35', call: 8, waiting: 2, people: 1 },
                    { time: '10:40', call: 13, waiting: 1, people: 2 }
                ]
            }
        },
        mounted(){
            
            this.globalTheme();// 皮肤设置-全局设置
            this.chart1();
            this.chart2();
        },
        methods:{
            globalTheme(){
                 let theme = G2.Util.deepMix({
                    shape:{
                        polygon:{
                            stroke:"#ddaa00", //多边形（地图）轮廓线颜色
                            lineWidth:1 //多边形（地图）轮廓线宽度
                        },
                        hollowPoint:{
                            fill:'#ffffff', //点的填充颜色
                            lineWidth:2, //点的边框宽度
                            radius:3, //点的半径
                        }
                    },
                    axis:{
                        bottom:{
                            label:{
                                textStyle:{
                                    fill:'#ff3355' //底部标签文本的颜色
                                }
                            }
                        },
                        left:{
                            label:{
                                textStyle:{
                                    fill:"#33aa66" //左部标签文本的颜色
                                }
                            }
                        },
                        right:{
                            label:{
                                textStyle:{
                                    fill:"#3366dd" //右部标签文本的颜色
                                }
                            }
                        }
                    }
                });
                G2.Global.setTheme(theme);
            },
            chart1(){
                let _this = this;
                let promise = Promise.resolve();

                promise.then(res=>{
                    return axios.get('/static/world.geo.json');
                }).then(res=>{
                    
                    let userData = [];
                    let features = res.data.features;

                    for(let i=0;i<features.length;i++){
                        userData.push({
                            name:features[i].properties.name,
                            value:Math.round(Math.random()*1000) //作用：后面随机生成颜色准备
                        })
                    }

                    let ds = new DataSet();
                    // 转为地理映射数据类型
                    let bgDataView = ds.createView('back')
                    .source(res.data,{
                        type:'GeoJSON'
                    }).transform({
                        type:'geo.projection',
                        projection:'geoMercator'
                    });

                    // 提取地理位置数据
                    let userPolygonDv = ds.createView()
                    .source(userData)
                    .transform({ //由地名获取地理位置区域
                        geoDataView:bgDataView, //使用geo数据的来源，可以是DataView实例，也可以是DataView实例的name
                        field:'name', //标注地名的字段
                        type:'geo.region', 
                        as:['longitude','latitude'] //多边形的顶点集
                    });
                    
                    // 绘制表格
                    let chart = new G2.Chart({
                        id:"c1",
                        forceFit:true,
                        height:_this.chartH+200
                    });

                    //载入数据
                    chart.source(userPolygonDv);

                    // 隐藏提示和图列
                    chart.legend(false).tooltip(false);
                    
                    // 绘制
                    chart.polygon()
                    .position('longitude*latitude')
                    .color('value',"#39ccf4-#20546b")

                    // 渲染
                    chart.render();

                    // console.log(userPolygonDv);
                })
            },
            chart2(){
                let _this = this;
                let data = this.arr;

                let chart = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH,
                    padding:[30,80,30,80]
                });

                // 数据转换
                let dv = new DataSet.DataView();
                dv.source(data).transform({
                    type:'fold',
                    fields:['call','waiting'],
                    key:'type',
                    value:'count',
                })

                // 载入数据
                chart.source(dv);

                // 绘制 柱状
                chart.intervalStack()
                .position('time*count')
                .color('type',[ '#348cd1', '#43b5d8' ]);
                // 线
                chart.line()
                .position('time*people')
                .color('#5ed470')
                .size(4)
                .shape('smooth')
                // 点
                chart.point().position('time*people').color('#5ed470')

                // 渲染
                chart.render();
            }
        },
        /**
         * 离开本页面时，全局皮肤恢复默认样式
         */
        destroyed(){
            G2.Global.setTheme('default')
        }
    }
</script>

<style lang="scss" scoped>

</style>