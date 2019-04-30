<template>
    <div>
        <div id="c1"></div>
        <div id="c2"></div>
    </div>
</template>

<script>
    export default {
        name:'Temperature',
        data(){
            return {
                arr:[
                    {month:'一月',temperature:5,city:'北京'},
                    {month:'二月',temperature:15,city:'北京'},
                    {month:'一月',temperature:8,city:'南京'},
                    {month:'二月',temperature:19,city:'南京'}
                ]
            }
        },
        mounted(){
            this.temperatureChart();
        },
        methods:{
            temperatureChart(){
                let data = this.arr;
                const chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:300
                });
                chart.scale({
                    moth:{
                        alias:'月份'
                    },
                    temperature:{
                        alias:'温度'
                    }
                });
                chart.source(data);
                chart.point().position("month*temperature").color("city",['#1890ff','#2fc25b']);
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>