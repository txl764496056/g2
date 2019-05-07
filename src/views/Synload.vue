<template>
    <div>
        <div class="unit">
            <p>空数据源 绘制图表</p>
            <button @click="arr1Load">点击-加载数据</button>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>动态数据更新</p>
            <button class="btn" :disabled="disable" @click="arr2Load">点击：增加100条</button>
            <button @click="stateChart2">点击，停止/启动 动态更新</button>
            <div class="chart" id="c2"></div>
        </div>
    </div>
</template>

<script>
import { setInterval } from 'timers';
    export default {
        name:'Synload',
        data(){
           let base = +new Date(2014,9,3); //获取时间戳
            return {
                chartH:400,

                arr1:[],
                chart_1:null,
                
                chart_2:null,
                date:[],
                arr2:[],
                disable:false,
                oneDay:24*3600*1000,//1天的时间戳，用于后面叠加天数
                values:[Math.random() * 150],
                now: new Date(base),
                intervalId:null
            }
        },
        mounted(){
            this.chart1();
            this.chart2();
        },
        methods:{
            chart1(){
                this.chart_1 = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:this.chartH
                });

                this.chart_1.source(this.arr1);
                this.chart_1.interval().position('genre*sold').color('genre');
                this.chart_1.render();
            },
            arr1Load(){
                this.arr1 = [
                    { genre: 'Sports', sold: 275 },
                    { genre: 'Strategy', sold: 115 },
                    { genre: 'Action', sold: 120 },
                    { genre: 'Shooter', sold: 350 },
                    { genre: 'Other', sold: 150 }
                ];
            },
            chart2(){
                this.chart_2 = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:this.chartH
                });

                this.chart_2.source(this.arr2);
                this.chart_2.line().position('date*value').color("#f80");
                this.chart_2.area().position('date*value').color("#f80");
                this.chart_2.render();
            },
            stateChart2(){
                let _this = this;
                if(this.intervalId){
                    clearInterval(this.intervalId._id);
                    this.intervalId = null;
                }else{
                    this.intervalId = setInterval(function(){
                        _this.addData();
                        _this.chart_2.changeData(_this.arr2);
                    },500);
                }
            },
            arr2Load(){
                for(let i=0;i<100;i++){ //加上后面的addData就是100条
                    this.addData();
                }
                this.disable = true;
                this.chart_2.changeData(this.arr2);
                this.stateChart2();//默认自动加载数据，动态效果展示打开
            },
            addData(){
                let item = {};
                let date = [this.now.getFullYear(),this.now.getMonth()+1,this.now.getDate()].join('/');
                item.date = date;
                item.value = (Math.random()-0.4)*10+this.values[this.values.length-1];
                this.values.push(item.value);
                this.now = new Date(+new Date(date)+this.oneDay);//第n+1天
                this.arr2.push(item);
            }
        },
        watch:{
            arr1(){
                this.chart_1.changeData(this.arr1);
            },
            intervalId(newVal,oldVal){
                this.intervalId = newVal;
            }
        }
    }
</script>

<style lang="scss" scoped>
button{height:30px;padding:0 10px;margin-top:10px;}
.btn{margin-right:10px;}
</style>