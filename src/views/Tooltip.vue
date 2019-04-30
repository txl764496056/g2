<template>
    <div>
        <div class="unit">
            <p>案例1</p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案例2：geom.tooltip()回调</p>
            <div class="chart" id="c2"></div>
        </div>
        <div class="unit">
            <p>案例3: tooltip:change事件</p>
            <div class="chart" id="c3"></div>
        </div>
        <div class="unit">
            <p>案例4：固定位置显示提示信息</p>
            <div class="chart" id="c4"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Tooltip',
        data(){
            return {
                arr:[
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
                    { month: 11, tem: 9.6, city: 'tokyo' } 
                ],
                arr2:[
                    { name: 'Microsoft Internet Explorer', value: 30 },
                    { name: 'Chrome', value: 20 },
                    { name: 'Firefox', value: 10 },
                    { name: 'Safari', value: 10 },
                    { name: 'Opera', value: 15 },
                    { name: 'Others', value: 15 }
                ],
                arr3:[
                    { time: 1428163200000, start: 469, end: 480 },
                    { time: 1428163203600, start: 480, end: 430 },
                    { time: 1428163207200, start: 430, end: 410 },
                    { time: 1428163210800, start: 410, end: 420 },
                    { time: 1428163214400, start: 420, end: 440 },
                    { time: 1428163218000, start: 440, end: 460 },
                    { time: 1428163221600, start: 460, end: 410 },
                    { time: 1428163225200, start: 410, end: 440 },
                    { time: 1428163228800, start: 440, end: 490 }
                ],
                arr4:[
                    { time: '2016-10-25 00:00:00', runCount: 4, type: 2, runTime: 2 },
                    { time: '2016-10-25 00:30:00', runCount: 2, type: 6, runTime: 3 },
                    { time: '2016-10-25 01:00:00', runCount: 13, type: 2, runTime: 5 },
                    { time: '2016-10-25 01:30:00', runCount: 9, type: 9, runTime: 1 },
                    { time: '2016-10-25 02:00:00', runCount: 5, type: 2, runTime: 3 },
                    { time: '2016-10-25 02:30:00', runCount: 8, type: 2, runTime: 1 },
                    { time: '2016-10-25 03:00:00', runCount: 13, type: 1, runTime: 2 },
                    { time: '2016-10-25 03:30:00', runCount: 4, type: 2, runTime: 2 },
                    { time: '2016-10-25 04:00:00', runCount: 2, type: 6, runTime: 3 },
                    { time: '2016-10-25 04:30:00', runCount: 13, type: 2, runTime: 5 },
                    { time: '2016-10-25 05:00:00', runCount: 9, type: 9, runTime: 1 },
                    { time: '2016-10-25 05:30:00', runCount: 5, type: 2, runTime: 3 } 
                ]
            }
        },
        mounted(){
            this.chart1();
            this.chart2();
            this.chart3();
            this.chart4();
        },
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr;
                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data,{
                    month:{
                        type:'cat',
                        alias:'月份',
                        values:['一月份','二月份','三月份','四月份','五月份','六月份','七月份','八月份','九月份','十月份','十一月份','十二月份']
                    },
                    tem:{
                        alias:'温度'
                    }
                });

                // 提示信息
                chart.tooltip({
                    showTitle:false
                });

                // 绘制
                chart.line()
                .position('month*tem')
                .tooltip('month*tem');

                chart.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr2;
                let chart = new G2.Chart({
                    id:"c2",
                    width:1000,
                    height:_this.chartH
                });

                // 坐标系
                chart.coord('theta',{
                    innerRadius:0.6,
                    radius:0.8
                })

                // 载入数据
                chart.source(data);

                // 提示信息
                chart.tooltip({
                    showTitle:false,
                    itemTpl:'<li>{name}:{value}</li>'
                })

                // 绘制
                chart.intervalStack()
                .position('value')
                .color('name')
                .tooltip('name*value',(name,value)=>{
                    return {
                        name:name,
                        value:value+'%'
                    }
                })

                // 渲染
                chart.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr3;

                let dv = new DataSet.DataView();

                dv.source(data).transform({
                    type:'map',
                    callback:obj=>{
                        obj.range = [obj.start,obj.end];
                        obj.trend = (obj.start-obj.end<0) ? '上涨':'下跌';
                        return obj;
                    }
                });

                let chart = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.chartH,
                });

                // 载入数据
                chart.source(dv,{
                    time:{
                        type:'time',
                        mask:'YYYY.MM.DD HH:MM:SS'
                    }
                });

                chart.interval()
                .position('time*range')
                .color('trend',['#1bbd19','#fa513a']);

                // 事件
                chart.on('tooltip:change',function(ev){
                    let items = ev.items;
                    let origin = items[0];
                    let range = origin.point._origin.range;
                    items.splice(0);
                    items.push(Object.assign({
                        name:'开始值',
                        // marker:true,
                        // value:range[0]
                    },origin));
                    items.push(Object.assign({
                        name:'结束值',
                        // marker:true,
                        // value:range[1]
                    },origin))
                })

                chart.render();
            },
            chart4(){
                let _this = this;
                let data = this.arr4;
                
                let chart = new G2.Chart({
                    id:"c4",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 度量
                chart.scale('time',{
                    tickCount:12,
                    type:'time',
                    mask:'HH:MM',
                });

                // 提示信息
                chart.tooltip({
                    triggerOn:'click' //点击触发tooltip
                });

                // 隐藏图列
                chart.legend(false);

                // 绘制
                chart.line()
                .position('time*runTime')
                .shape("smooth") //绘制曲线

                chart.point()
                .position('time*runTime')
                .shape('circle') //绘制圆点
                .size(8)

                // 渲染
                chart.render();

                // 初始化至最新一个点
                // let lastPoint = chart.get('plotRange').br;
                // chart.showTooltip(lastPoint);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>