<template>
    <div>
        <div id="c1"></div>
    </div>
</template>

<script>
    export default {
        name:"ColumnDefinition",
        data(){
            return {
                arr:[
                    {value:10,time:"2015-03-01T16:00:00.000Z"},
                    {value:15,time:"2015-03-01T16:10:00.000Z"},
                    {value:26,time:"2015-03-01T16:20:00.000Z"},
                    {value:9,time:"2015-03-01T16:30:00.000Z"},
                    {value:12,time:"2015-03-01T16:40:00.000Z"},
                    {value:23,time:"2015-03-01T16:50:00.000Z"},
                    {value:18,time:"2015-03-01T17:00:00.000Z"},
                    {value:21,time:"2015-03-01T17:10:00.000Z"},
                    {value:22,time:"2015-03-01T17:20:00.000Z"}
                ]
            }
        },
        mounted(){
            this.chart();
        },
        methods:{
            chart(){
                let data = this.arr;
                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:300
                });
                // 载入数据
                chart.source(data,{
                    "time":{
                        type:'time',
                        nice:false,
                        mask:"HH:mm"
                    },
                    "value":{
                        formatter:val=>{
                            return val+"k";
                        }
                    }
                });
                chart.line().position("time*value").size(2);
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>