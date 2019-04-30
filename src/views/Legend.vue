<template>
    <div>
        <div class="unit">
            <p>案例1：分组柱状图</p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案列2：图列选择模式设置</p>
            <div class="chart" id="c2"></div>
        </div>
        <div class="unit">
            <p>案例3：使用html渲染图列</p>
            <div class="chart" id="c3"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Legend',
        data(){
            return {
                chartH:400,
                arr1:[
                    { year: 'Year 1800', region: 'Africa', population: 107 },
                    { year: 'Year 1900', region: 'Africa', population: 133 },
                    { year: 'Year 2012', region: 'Africa', population: 1052 },
                    { year: 'Year 1800', region: 'America', population: 31 },
                    { year: 'Year 1900', region: 'America', population: 156 },
                    { year: 'Year 2012', region: 'America', population: 954 },
                    { year: 'Year 1800', region: 'Asia', population: 635 },
                    { year: 'Year 1900', region: 'Asia', population: 947 },
                    { year: 'Year 2012', region: 'Asia', population: 4250 },
                    { year: 'Year 1800', region: 'Europe', population: 203 },
                    { year: 'Year 1900', region: 'Europe', population: 408 },
                    { year: 'Year 2012', region: 'Europe', population: 740 },
                    { year: 'Year 1800', region: 'Oceania', population: 2 },
                    { year: 'Year 1900', region: 'Oceania', population: 6 },
                    { year: 'Year 2012', region: 'Oceania', population: 38 }
                ],
                arr2:[
                    { 部门: '部门0', 小组: '组名0', 完成人数: 37, 未完成人数: 9 },
                    { 部门: '部门0', 小组: '组名2', 完成人数: 29, 未完成人数: 10 },
                    { 部门: '部门0', 小组: '组名8', 完成人数: 59, 未完成人数: 14 },
                    { 部门: '部门0', 小组: '组名9', 完成人数: 60, 未完成人数: 8 },
                    { 部门: '部门0', 小组: '组名10', 完成人数: 83, 未完成人数: 14 },
                    { 部门: '部门0', 小组: '组名12', 完成人数: 67, 未完成人数: 21 },
                    { 部门: '部门0', 小组: '组名14', 完成人数: 46, 未完成人数: 18 },
                    { 部门: '部门0', 小组: '组名17', 完成人数: 19, 未完成人数: 27 },
                    { 部门: '部门0', 小组: '组名19', 完成人数: 74, 未完成人数: 17 },
                    { 部门: '部门1', 小组: '组名15', 完成人数: 34, 未完成人数: 19 },
                    { 部门: '部门1', 小组: '组名20', 完成人数: 71, 未完成人数: 25 },
                    { 部门: '部门1', 小组: '组名26', 完成人数: 28, 未完成人数: 23 },
                    { 部门: '部门1', 小组: '组名29', 完成人数: 90, 未完成人数: 24 },
                    { 部门: '部门2', 小组: '组名7', 完成人数: 50, 未完成人数: 5 },
                    { 部门: '部门2', 小组: '组名11', 完成人数: 86, 未完成人数: 26 },
                    { 部门: '部门2', 小组: '组名13', 完成人数: 63, 未完成人数: 16 },
                    { 部门: '部门2', 小组: '组名27', 完成人数: 76, 未完成人数: 2 },
                    { 部门: '部门2', 小组: '组名28', 完成人数: 13, 未完成人数: 28 },
                    { 部门: '部门3', 小组: '组名1', 完成人数: 33, 未完成人数: 16 },
                    { 部门: '部门3', 小组: '组名3', 完成人数: 14, 未完成人数: 1 },
                    { 部门: '部门3', 小组: '组名4', 完成人数: 43, 未完成人数: 25 },
                    { 部门: '部门3', 小组: '组名16', 完成人数: 45, 未完成人数: 13 },
                    { 部门: '部门3', 小组: '组名18', 完成人数: 50, 未完成人数: 21 },
                    { 部门: '部门3', 小组: '组名22', 完成人数: 43, 未完成人数: 7 },
                    { 部门: '部门3', 小组: '组名23', 完成人数: 38, 未完成人数: 6 },
                    { 部门: '部门3', 小组: '组名24', 完成人数: 33, 未完成人数: 24 },
                    { 部门: '部门3', 小组: '组名25', 完成人数: 13, 未完成人数: 27 },
                    { 部门: '部门4', 小组: '组名5', 完成人数: 98, 未完成人数: 4 },
                    { 部门: '部门4', 小组: '组名6', 完成人数: 88, 未完成人数: 12 },
                    { 部门: '部门4', 小组: '组名21', 完成人数: 52, 未完成人数: 9 }
                ],
                arr3:[
                    { country: 'Lithuania', litres: 501.9 },
                    { country: 'Czech Republic', litres: 301.9 },
                    { country: 'Ireland', litres: 201.1 },
                    { country: 'Germany', litres: 165.8 },
                    { country: 'Australia', litres: 139.9 },
                    { country: 'Austria', litres: 128.3 },
                    { country: 'UK', litres: 99 },
                    { country: 'Belgium', litres: 60 },
                    { country: 'The Netherlands', litres: 50 }
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
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                chart.coord().transpose();

                // 图列
                chart.legend({
                    title:null,
                    marker:'square'
                })

                // 绘制
                chart.intervalDodge()
                .position('region*population')
                .color('year')
                .label('population');

                // 渲染
                chart.render();
            },
            chart2(){
                let _this = this;
                let data  = this.arr2;
                let dv = new DataSet.DataView();
                dv.source(data)
                .transform({
                    type:'sort',
                    callback:(obj1,obj2)=>{
                        return obj1['部门'] > obj2['部门'] ? 1:-1;
                    }
                })
                .transform({
                    type:'map',
                    callback:obj=>{
                        obj['完成人数'] *= -1;
                        return obj;
                    }
                })
                .transform({
                    type:'fold',
                    fields:['完成人数','未完成人数'],
                    key:'完成状态',
                    value:'人数'
                });
                
                // 图表创建

                let chart = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH+100,
                    padding:[20,120,20,80]
                });

                // 载入数据
                chart.source(dv);


                chart.filter('部门',val=>{
                    return val==='部门0'
                });

                chart.coord().transpose();

                // 图列选择模式
                chart.legend('部门',{
                    selectedMode:'single',
                    position:'right-bottom',
                    hoverable:false
                });
                chart.legend('完成状态',false);

                // 将负数格式化成正数
                chart.axis('人数',{
                    label:{
                        formatter:value=>{
                            value = parseInt(value);
                            return Math.abs(value);
                        }
                    }
                })

                // 绘制
                chart.interval()
                .position('小组*人数')
                .color('部门')
                .shape('完成状态',['rect','hollowRect'])
                .style({ 
                    lineWidth:1 //矩形(包括空心与实心)线宽
                })
                .tooltip('完成状态*人数',(a,b)=>{
                    return {
                        name:a,
                        value:Math.abs(b)
                    }
                })

                // 渲染
                chart.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr3;
                let ds = new DataSet();
                let dv = ds.createView();
                dv.source(data)
                .transform({
                    type:'percent',
                    field:'litres',
                    dimension:'country',
                    as:'percent'
                });

                let chart = new G2.Chart({
                    id:"c3",
                    // forceFit:true,
                    width:1000,
                    height:_this.chartH
                });

                chart.source(dv,{
                    percent:{ //百分比表达方式，保留2位小数
                        formatter:val=>{
                            return (val*100).toFixed(2)+"%";
                        }
                    }
                });


                // 坐标系
                chart.coord('theta',{
                    innerRadius:0.3,
                    radius:1
                });
                
                // 提示信息
                 chart.tooltip({
                    showTitle:false, //不显示标题
                    itemTpl:"<li data-index={index}><span style='color:{color}'>{name}:</span>{value}</li>" //提示信息
                });

                // 图列
                chart.legend({
                    useHtml:true,
                    position:'right',
                    containerTpl:'<div class="g2-legend">'+
                        '<table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></table>'+
                        '</div>',
                    itemTpl:(value,color,checked,index)=>{
                        const obj = dv.rows[index];
                        checked = checked ? 'checked':'unChecked';
                        return '<tr class="g2-legend-list-item item-'+index+' '+checked+'" data-value="'+value+'" data-color="'+color+'">'+
                            '<td width=150 style="border:none;padding:0;">'+
                                '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:'+color+';"></i>'+
                                '<span class="g2-legend-text">'+value+'</span>'+
                            '</td>'+
                            '<td style="text-align:right;border:none;padding:0;">'+obj.litres+'</td>'+
                        '</tr>';
                    },
                    offsetX:15,
                    'g2-legend':{
                        marginLeft:'100px',
                        marginTop:'-107px'
                    },
                    'g2-legend-list':{
                        border:'none'
                    }
                });

                // 被过滤的UK,选中时样式高亮问题
                // chart.filter('country',val=>{
                //     return val!=='UK';
                // })

                // 绘制
                chart.intervalStack()
                .position('percent')
                .color('country', [ '#67b7dc', '#84b761', '#fdd400', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f' ])
                .label('percent',{ //country+百分比 显示
                    formatter:(val,item) =>{
                        return item.point.country+": "+val;
                    }
                }).style({//每个扇形块，描边颜色和大小（分割线）
                    lineWidth:2,
                    stroke:"#fff"
                });

                chart.render();

            }
        }
    }
</script>

<style lang="scss" scoped>
li{list-style: none;}
</style>