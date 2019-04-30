<template>
    <div>
        <div class="unit">
            <p>案例1：饼图点击跳转<span>（注意跳转后地址栏参数变化）</span></p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案例1：动态改变tooltip显示信息</p>
            <div class="chart" id="c2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ChartEvt',
        data(){
            return {
                chartH:400,
                arr1:[
                    { name: 'IE', value: 56.33 },
                    { name: 'Chrome', value: 24.03 },
                    { name: 'Firefox', value: 10.38 },
                    { name: 'Safari',  value: 4.77 },
                    { name: 'Opera', value: 0.91 },
                    { name: 'Unknown', value: 0.2 }
                ],
                arr2:[
                    { name: '示例 A', value: 38.8 },
                    { name: '示例 B', value: 9.15 },
                    { name: '示例 C', value: 26.35 },
                    { name: '示例 D ',  value: 22.6 },
                    { name: '示例 E', value: 3.1 }
                ]
            }
        },
        mounted(){
            this.chart1();
            this.chart2();
        },
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr1;

                let dv = new DataSet.DataView();
                dv.source(data).transform({
                    type:'percent', //统计value
                    field:'value', 
                    dimension:'name', //根据name计算占比
                    as:'percent' //结果存放至percent字段
                });

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv);

                // 坐标系
                chart.coord('theta',{
                    radius:0.7
                });

                // 绘制
                chart.intervalStack()
                .position('percent')
                .color('name')
                .label('name');

                // 绑定事件
                chart.on('interval:click',evt=>{
                    let data = evt.data;
                    if(data){
                        let name = data._origin['name'];
                        window.open('http://www.baidu.com/s?wd='+name);
                    }
                })

                // 渲染
                chart.render();

            },
            chart2(){
                let _this = this;
                let data = this.arr2;

                let dv = new DataSet.DataView();
                dv.source(data).transform({
                    type:'percent',
                    field:'value',
                    dimension:'name',
                    as:'percent'
                });

                let chart = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH
                });

                // 坐标系
                chart.coord('theta',{
                    radius:0.8
                });

                 // 载入数据
                chart.source(dv);

                // 绘制
                chart.intervalStack()
                .position('percent')
                .color('name');

                // 绑定事件
                chart.on('tooltip:change',evt=>{
                    let item = evt.items[0];
                    item.value = (item.value*100).toFixed(2) + '%';
                })

                // 渲染
                chart.render();
            }
        }   
    }
</script>

<style lang="scss" scoped>

</style>