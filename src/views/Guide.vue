<template>
    <div>
        <div class="unit">
            <p>案例1：辅助线</p>
            <div class="cart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案例2: 辅助图片</p>
            <div class="chart" id="c2"></div>
        </div>
        <div class="unit">
            <p>案例3: 辅助文本</p>
            <div class="chart" id="c3"></div>
        </div>
        <div class="unit">
            <p>案例4：辅助框</p>
            <div class="chart" id="c4"></div>
        </div>
        <div class="unit">
            <p>案例5：辅助html</p>
            <div class="chart" id="c5"></div>
        </div>
        <div class="unit">
            <p>案例6: 辅助regionFilter，筛选、分段着色</p>
            <div class="chart" id="c6"></div>
        </div>
        <div class="unit">
            <p>案例7： dataMarker特殊数据标注点</p>
            <div class="chart" id="c7"></div>
        </div>
        <div class="unit">
            <p>案例8：dataRegion特殊数据区间标注</p>
            <div class="chart" id="c8"></div>
        </div>
        <div class="unit">
            <p>案例9：动态辅助标记</p>
            <div class="chart" id="c9"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Guide',
        data(){
            return {
                chartH:400,
                arr:[],
                arr2:[
                    { month: 0, tem: 7, city: 'tokyo' },
                    { month: 1, tem: 6.9, city: 'tokyo' },
                    { month: 2, tem: 9.5, city: 'tokyo' },
                    { month: 3, tem: 14.5, city: 'tokyo' },
                    { month: 4, tem: 18.2, city: 'tokyo' },
                    { month: 5, tem: 21.5, city: 'tokyo' },
                    { month: 6, tem: 25.2, city: 'tokyo' },
                    { month: 7, tem: 26.5, city: 'tokyo' },
                    { month: 8, tem: 23.3, city: 'tokyo' },
                    { month: 9, tem: 18.3, city: 'tokyo' },
                    { month: 10, tem: 13.9, city: 'tokyo' },
                    { month: 11, tem: 9.6, city: 'tokyo' },
                    { month: 0, tem: -0.2, city: 'newYork' },
                    { month: 1, tem: 0.8, city: 'newYork' },
                    { month: 2, tem: 5.7, city: 'newYork' },
                    { month: 3, tem: 11.3, city: 'newYork' },
                    { month: 4, tem: 17, city: 'newYork' },
                    { month: 5, tem: 22, city: 'newYork' },
                    { month: 6, tem: 24.8, city: 'newYork' },
                    { month: 7, tem: 24.1, city: 'newYork' },
                    { month: 8, tem: 20.1, city: 'newYork' },
                    { month: 9, tem: 14.1, city: 'newYork' },
                    { month: 10, tem: 8.6, city: 'newYork' },
                    { month: 11, tem: 2.5, city: 'newYork' },
                    { month: 0, tem: -0.9, city: 'berlin' },
                    { month: 1, tem: 0.6, city: 'berlin' },
                    { month: 2, tem: 3.5, city: 'berlin' },
                    { month: 3, tem: 8.4, city: 'berlin' },
                    { month: 4, tem: 13.5, city: 'berlin' },
                    { month: 5, tem: 17, city: 'berlin' },
                    { month: 6, tem: 18.6, city: 'berlin' },
                    { month: 7, tem: 17.9, city: 'berlin' },
                    { month: 8, tem: 14.3, city: 'berlin' },
                    { month: 9, tem: 9, city: 'berlin' },
                    { month: 10, tem: 3.9, city: 'berlin' },
                    { month: 11, tem: 1, city: 'berlin' }
                ],
                arr3:[
                    { year: '1991', value: 15468 },
                    { year: '1992', value: 16100 },
                    { year: '1993', value: 15900 },
                    { year: '1994', value: 17409 },
                    { year: '1995', value: 17000 },
                    { year: '1996', value: 31056 },
                    { year: '1997', value: 31982 },
                    { year: '1998', value: 32040 },
                    { year: '1999', value: 33233 }
                ],
                arr4:[
                    { year: '1991',value: 3}, 
                    { year: '1992',value: 4}, 
                    { year: '1993',value: 3.5}, 
                    { year: '1994',value: 5}, 
                    { year: '1995',value: 4.9}, 
                    { year: '1996',value: 6}, 
                    { year: '1997',value: 7}, 
                    { year: '1998',value: 9}, 
                    { year: '1999',value: 13}
                ]
            }
        },
        mounted(){
            let _this = this;

            let promise = Promise.resolve();

            promise.then(res=>{
                return axios.get('/static/diamond.json');
            }).then(res=>{
                _this.arr = res.data;
                return ;
            }).then(res=>{
                _this.chart1();
                _this.chart2();
                _this.chart3();
                _this.chart5();
            });

            this.chart4();
            this.chart6();
            this.chart7();
            this.chart8();
            this.chart9();

        },
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr;
                
                let dv = new DataSet.DataView().source(data);
                let caratAvg = dv.mean('carat'); //计算克拉数均值
                let priceAvg = dv.mean('price'); //计算价格均值

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH
                });
                
                // 载入数据
                chart.source(data); // 注意这里是data，不是转换过的数据

                // 辅助线
                chart.guide().line({ //克拉数量
                    start:[caratAvg,0],
                    end:[caratAvg,20000],
                    text:{
                        position:'end',
                        autoRotate:false,
                        content:"克拉均数值："+caratAvg
                    }
                });
                chart.guide().line({
                    start:{
                        carat:0,
                        price:priceAvg
                    },
                    end:{
                        carat:4,
                        price:priceAvg
                    },
                    text:{
                        position:'end',
                        autoRotate:false,
                        content:"价格均值："+priceAvg,
                        style:{
                            textAlign:'end'
                        }
                    }
                })
                
                // 绘制
                chart.point().position('carat*price');

                // 渲染
                chart.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr;

                let dv = new DataSet.DataView().source(data);

                dv.transform({
                    type:'bin.histogram',
                    field:'depth',
                    bindWidth:0.5,
                    as:['depth','count']
                });

                let chart = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv)

                // 提示信息
                chart.tooltip({
                    crosshairs:false//隐藏辅助框
                })

                // 绘制
                chart.interval()
                .position('depth*count')
                .shape('hollowRect');

                // 辅助图片
                chart.guide().image({
                    start:[55,200], //起始位置，坐标点
                    src:'/static/diamond.png',
                    width:60,
                    height:100
                });

                // 渲染
                chart.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr;

                let dv = new DataSet.DataView().source(data);
                dv.transform({
                    type:'pick',
                    fields:['cut','depth']
                });
                
                let chart = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv);

                // 隐藏图列
                chart.legend(false);

                // 绘制
                chart.pointJitter()
                .position('cut*depth')
                .color('cut');

                // 辅助文本
                chart.guide().text({
                    content:'越完美的钻石切割工艺越集中',
                    style:{
                        fill:"#339dff",
                        fontSize:"12",
                        textAlign:'center',
                        fontWeight:"bold"
                    },
                    position:["Ideal","66"]
                });
                chart.guide().text({
                    style:{
                        fill:"#a97ae9",
                        fontSize:"12",
                        textAlign:'center',
                        fontWeight:"bold"
                    },
                    content:'越差的钻石切割工艺越分散',
                    position:['Fair','60']
                })

                // 渲染
                chart.render();
            },
            chart4(){
                let _this = this;
                let data = this.arr2;

                let chart = new G2.Chart({
                    id:"c4",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 绘制
                chart.line()
                .position('month*tem')
                .color('city');

                // 辅助框
                chart.guide().region({
                    start:[5,'min'],
                    end:[7,'max'],
                    style:{
                        lineWidth:0,
                        fill:"#f80",
                        fillOpacity:0.1,
                        stroke:"#ccc"
                    }
                });

                // 渲染
                chart.render();
            },
            chart5(){
                let _this = this;
                let data = this.arr;
                
                let dv = new DataSet.DataView().source(data);
                let caratAvg = dv.mean('carat'); //克拉均数值：
                let priceAvg = dv.mean('price');//价格均值：

                let chart = new G2.Chart({
                    id:"c5",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv);

                // 绘制
                chart.point()
                .position('carat*price');

                // 辅助元素html
                chart.guide().html({
                    position:[3.5,12000],
                    html:"<div style='color:#ff0000;font-size:12px;border:1px solid #ff0000;padding:3px 8px;'>异常值</div>",
                    offsetX:10
                });

                chart.render();
            },
            chart6(){
                let _this = this;
                let data = this.arr3;

                let chart = new G2.Chart({
                    id:"c6",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data,{
                    "value":{
                        formatter:val=>{
                            return (val/10000).toFixed(1)+'k';
                        }
                    }
                });

                // 绘制
                chart.line()
                .position('year*value');

                // 辅助 分段着色
                chart.guide().regionFilter({
                    start:['1991','min'],
                    end:['1995','max'],
                    color:"#178fff"
                });
                chart.guide().regionFilter({
                    start:['1995','min'],
                    end:['1999','max'],
                    color:"#2ec15a"
                })

                chart.render();
            },
            chart7(){
                let _this = this;
                let data = this.arr4;

                let chart = new G2.Chart({
                    id:"c7",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 绘制
                chart.line()
                .position('year*value')

                // 标注点
                chart.guide()
                .dataMarker({
                    content:"特殊数据标注点",
                    lineLength:18,
                    position:['1997',7]
                })

                // 渲染
                chart.render();
            },
            chart8(){
                let _this = this;
                let data = this.arr4;

                let chart = new G2.Chart({
                    id:"c8",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data,{
                    value:{
                        min:0
                    }
                });

                // 绘制
                chart.line()
                .position('year*value');

                // 辅助 ，区间标注
                chart.guide().dataRegion({
                    start:['1994','min'], //起点，作为最小值（x轴方向）
                    end:['1996','max'], //结束点，作为最大值 （x轴方向）
                    content:"数据区间标注"
                })

                // 渲染
                chart.render();
            },
            chart9(){
                let _this = this;
                let data = [];
                let time = Math.floor((new Date()).getTime()/1000) * 1000;
                for(let i=-19;i<=0;i++){
                    data.push({
                        time: time+i * 3 * 1000,
                        value: Math.random() + 0.25
                    });
                }

                // 查询最大值（value）
                function findMax(){
                    let maxValue = 0;
                    let maxObj = null;
                    data.forEach(obj=>{
                        if(obj.value>maxValue){
                            maxValue = obj.value;
                            maxObj = obj;
                        }
                    });
                    return maxObj;
                }

                let chart = new G2.Chart({
                    id:"c9",
                    forceFit:true,
                    height:_this.height
                });

                // 载入数据
                chart.source(data,{
                    time:{
                        type:'time',
                        mask:"HH:MM:SS"
                    }
                });

                // 绘制
                chart.line()
                .position('time*value');

                // 辅助线,x轴方向
                chart.guide().line({
                    start:['min',0.25],
                    end:['max',0.25]
                });
                chart.guide().text({
                    position(){
                        let obj = findMax();
                        return [obj.time,obj.value];
                    },
                    content:"最大值"
                });

                // 渲染 
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>