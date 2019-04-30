<template>
    <div>
        <div class="axis-tips">
            知识点：
            <span>坐标轴</span>
            <span>刻度线</span>
            <span>子刻度线</span>
            <span>网格</span>
        </div>
        <div class="unit">
            <div id="c1"></div>
        </div>
        <div class="unit">
            <p>增加：(1)坐标轴边线。(2)不对最大值最小值优化。(3)自定义坐标轴最大值最小值。(4)坐标轴文本。(5)坐标轴标题。(6)x轴网格</p>
            <div class='chart' id="c2"></div>
        </div>
        <div class="unit">
            <p>坐标轴刻度线tickline，<span>红色刻度线方向与默认的相反</span></p>
            <div class="chart" id="c3"></div>
        </div>
        <div class="unit">
            <p>(1)子刻度线。(2)坐标轴两端保留空白。(3)网格-默认显示y轴网格</p>
            <div class="chart" id="c4"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Axis',
        data(){
            return {
                chartH:400,
                arr:[
                    { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
                    { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
                    { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
                    { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
                    { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
                    { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
                    { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
                    { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
                    { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
                    { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
                    { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
                    { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
                    { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
                    { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
                    { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
                ]
            }
        },
        mounted(){
            // 图表1，未配置坐标轴
            this.chart();
            // 图表2，配置坐标轴
            this.chart2();
            // 图表3，坐标轴刻度线tickline
            this.chart3();
            // 图表4，子刻度线
            this.chart4();
        },
        methods:{
            chart(){
                let _this = this;
                let data = this.arr;
                let chart = new G2.Chart({
                    container:"c1",
                    forceFit:true,
                    height:_this.chartH
                });

                // 装载数据
                chart.source(data);

                // 隐藏图例
                chart.legend(false);

                // 创建图表语法
                chart.point() //几何标记：点
                .position("x*y") //x、y分别映射至x轴、y轴
                .size("z",[10,40]) // 点的大小,[10,40]扩大倍数
                /**
                 * 注意，label()是2个参数，（1）若少了第一个就会显示[object,object]
                 *  （2）若第一参数不是数据中某个属性，则显示传入的字符串，
                 *   此处name,name*country显示的都是name，若是country,country*name,则显示的值country的值
                 */
                .label("name*country",{ //
                    offset:0, //文字偏移
                    textStyle:{
                        fill:"#000", //文字颜色
                        fontWeight:"bold", //文字加粗
                        shadowBlur:5, //文字阴影大小
                        shadowColor:"#fff" //文字阴影颜色
                    }
                })
                .color("#3182bd") //点的颜色
                .opacity(0.5) //点的透明度
                .shape("circle") //点的形状：实心圆
                .tooltip("x*y*z"); //点的提示

                // 渲染图表
                chart.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr;
                let chart =  new G2.Chart({
                    container:"c2",
                    forceFit:true,
                    height:_this.chartH,
                    padding:[80,80,80,120],//左边值较大，为标题和坐标轴文本腾出空间
                    plotBackground:{ //坐标轴边线
                        stroke:"#ccc", //颜色
                        lineWidth:1 //大小
                    }
                });

                // 装载数据
                chart.source(data,{
                    x:{
                        alias:"标题：Daily fat intake",//在axis中要将标题打开，图表才能显示这个标题
                        nice:false,//不对最大值和最小值进行优化
                        min:62, //设置最小值
                        max:96, //设置最大值
                        tickInterval:5 //自定义刻度线间距
                    },
                    y:{
                        alias:'标题：Daily sugar intake',//在axis中要将标题打开，图表才能显示这个标题
                        nice:false,
                        min:0,
                        max:165,
                        tickInterval:50
                    }
                });

                // 坐标配置
                chart.axis('x',{
                    title:{}, //坐标轴标题，标题自定义名称在装在数据的时候定义alias
                    label:{ //坐标轴文本，与后面图表的label不是同一个
                        formatter:val=>{ //坐标轴文本
                            return val+'gr'
                        }
                    },
                    grid:{ //网格
                        lineStyle:{
                            lineDash:[2,2],
                            lineStyle:"#d9d9d9",
                            lineWidth:1
                        }
                    }
                });
                chart.axis('y',{
                    title:{
                        offset:70 //避免宽度不够，文本会倾斜显示，
                    }, //坐标轴标题，标题自定义名称在装在数据的时候定义alias
                    label:{
                        formatter:val=>{
                            return val+'gr'
                        }
                    }
                })

                // 隐藏图例
                chart.legend(false);

                // 创建图表语法
                chart.point() //几何标记：点
                .position("x*y") //x、y分别映射至x轴、y轴
                .size("z",[10,40]) // 点的大小,[10,40]扩大倍数
                /**
                 * 注意，label()是2个参数，（1）若少了第一个就会显示[object,object]
                 *  （2）若第一参数不是数据中某个属性，则显示传入的字符串，
                 *   此处name,name*country显示的都是name，若是country,country*name,则显示的值country的值
                 */
                .label("name*country",{ //这个是大圆点的label，与坐标轴label不是同一个，如果是柱状图，这个label文本会显示在柱状图顶端
                    offset:0, //文字偏移
                    textStyle:{
                        fill:"#000", //文字颜色
                        fontWeight:"bold", //文字加粗
                        shadowBlur:5, //文字阴影大小
                        shadowColor:"#fff" //文字阴影颜色
                    }
                })
                .color("#3182bd") //点的颜色
                .opacity(0.5) //点的透明度
                .shape("circle") //点的形状：实心圆
                .tooltip("x*y*z"); //点的提示

                // 渲染图表
                chart.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr;
                let chart = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 坐标轴，刻度线设置
                chart.axis('x',{
                    tickLine:{
                        lineWidth:2,
                        length:-10, //正值、负值都可以，正负代表不同的方向
                        stroke:'red',
                        alignWidthLabel:true
                    }
                })

                // 隐藏图例
                chart.legend(false);

                chart.point()
                .position('x*y')
                .size('z',[10,40])
                .label('name*country',{
                    offset:0,
                    textStyle:{
                        stroke:"#000"
                    }
                })
                .color('#3182bd')
                .opacity(0.5)
                .shape("circle")
                .tooltip('x*y*z')

                chart.render();
            },
            chart4(){
                let _this = this;
                let data = this.arr;
                let chart = new G2.Chart({
                    id:"c4",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data,{
                    x:{ 
                        range:[0.1,0.9]//值是0-1,坐标轴两端留空白
                    }
                });

                // 坐标轴，子刻度线设置
                chart.axis('x',{
                    subTickCount:3, //子刻度线数量
                    subTickLine:{ //子刻度线样式
                        length:3,
                        stroke:'#999',
                        lineWidth:1
                    },
                    tickLine:{ //刻度线（大的）
                        length:8,
                        stroke:"#000",
                        lineWidth:2
                    },
                    grid:{
                        lineStyle:{
                            stroke:"#ff99ff",
                            lineWidth:1,
                            lineDash:[2,2]
                        }
                    }
                });

                // 隐藏图例
                chart.legend(false);

                // 绘制
                chart.point()
                .position('x*y')
                .color('#3182bd')
                .size('z',[10,40])
                .label('name*country',{
                    offset:0,
                    textStyle:{
                        stroke:"#000"
                    }
                })
                .opacity(0.5)
                .shape('circle')
                .tooltip('x*y*z');

                // 渲染
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>
.axis-tips{
    text-align:center;font-size:18px;color:#ff0000;
    span{
        color:#999;font-size:16px;margin:5px;display:inline-block;border-radius:5px;
    }
}
</style>