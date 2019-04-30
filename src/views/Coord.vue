<template>
    <div>
        <div id="c1"></div>
    </div>
</template>

<script>
    export default {
        name:'Coord',
        data(){
            return {

            }
        },
        mounted(){
            this.polarChart();
        },
        methods:{
            polarChart(){

                let data = [
                    {item:"事例1",count:40,percent:0.40},
                    {item:"事例2",count:21,percent:0.21},
                    {item:"事例3",count:17,percent:0.17},
                    {item:"事例4",count:13,percent:0.13},
                    {item:"事例5",count:9,percent:0.09}
                ];

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:300
                });

                chart.source(data,{
                    percent:{
                        formatter:function(val){
                            val = val*100+"%";
                            return val;
                        }
                    }
                })
                chart.coord('theta');

                chart.intervalStack().position('percent').color('item')
                //注意，label()是2个参数，（1）若少了第一个就会显示[object,object]
                // （2）若第一参数不是数据中某个属性，则显示传入的字符串
                .label('percent',{
                    offset:-40,
                    textStyle:{
                        textAlign:'center',
                        shadowBlur:2,
                        shadowColor:'rgba(0,0,0,0.45)'
                    }
                });
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>