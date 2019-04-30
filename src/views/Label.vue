<template>
    <div>
        <div class="unit">
            <p>案例1：</p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案例2：格式化文本</p>
            <div class="chart" id="c2"></div>
        </div>
        <div class="unit">
            <p>案例3：自定义html文本</p>
            <div class="chart" id="c3"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Label',
        data(){
            return {
                chartH:400,
                arr1:[
                    { genre: 'Sports', sold: 275 },
                    { genre: 'Strategy', sold: 115 },
                    { genre: 'Action', sold: 120 },
                    { genre: 'Shooter', sold: 350 },
                    { genre: 'Other', sold: 150 }
                ],
                arr2:[
                    { name: 'Microsoft Internet Explorer', value: 56.33 },
                    { name: 'Chrome', value: 24.03 },
                    { name: 'Firefox', value: 10.38 },
                    { name: 'Safari',  value: 4.77 },
                    { name: 'Opera', value: 0.91 },
                    { name: 'Proprietary or Undetectable', value: 0.2 }
                ],
                arr3:[
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
            this.chart3();
        },  
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr1;

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH,
                    padding:80
                });

                // 载入数据
                chart.source(data);

                // 绘制
                chart.interval()
                .position('genre*sold')
                .color('genre')
                .label('sold')

                // 渲染
                chart.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr2;

                let dv = new DataSet.DataView();

                dv.source(data).transform({
                    type:'percent',
                    field:'value', //统计百分比
                    dimension:'name', //
                    as:'percent' //结果存在percent字段
                })

                let chart = new G2.Chart({
                    id:"c2",
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
                .label('name',{
                    formatter:(text,item,index)=>{
                        let percent = item.point['percent'];
                        let name = item.point['name'];
                        return name+'  '+(percent*100).toFixed(2)+"%";
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
                    type:'percent',
                    field:'value',
                    dimension:'name',
                    as:'percent'
                });

                let chart = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv);

                // 坐标系 
                chart.coord('theta',{
                    radius:0.8
                });

                // 绘制
                chart.intervalStack()
                .position('percent')
                .color('name')
                .label('name',{
                    htmlTemplate:(text,item,index)=>{
                        let percent = item.point['percent'];
                        percent = (percent*100).toFixed(2) + '%';
                        return "<span style='display:block;font-size:14px;width:50px;'>"+text+"</span><span style='font-size:14px;color:"+item['color']+"'>"+percent+"</span>"
                    }
                });

                // 渲染
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>