<template>
    <div>
        <div class="unit">
            <p>用html，自定义label</p>
            <div class="chart" id="c1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'CustomLabel',
        data(){
            return {
                photo:{
                'John':'/photo1.png',
                'Damon':'/photo2.png' ,
                'Patrick':'/photo3.png',
                'Mark':'/photo4.png'
                },
                arr:[
                    {name:'John',vote:35654},
                    {name:'Damon',vote:65456},
                    {name:'Patrick',vote:45724},
                    {name:'Mark',vote:13654}
                ]
            }
        },
        mounted(){
            this.chart();
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

                // 载入数据
                chart.source(data);

                chart.axis('name',{
                    label:{ //坐标轴的label，与柱状图顶端显示的label不是同一个
                        htmlTemplate:value=>{
                            return '<img src="'+_this.photo[value]+'" style="width:30px;" />'
                        } 
                    }
                })
                
                chart.interval()
                .position('name*vote')
                .size(20)
                .label('name'); //每个柱状图矩形顶端的label，与坐标轴label不是同一个

                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>