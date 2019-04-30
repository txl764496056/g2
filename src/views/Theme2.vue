<template>
    <div>
        <div class="unit">
            <p>案例1：chart级别主题切换(针对指定表格设置皮肤)</p>
            <div class="chart" id="c3"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Theme2',
        data(){
            return{
                chartH:400,
                arr:[
                    { time: '10:10', call: 4, waiting: 2, people: 2 },
                    { time: '10:15', call: 2, waiting: 6, people: 3 },
                    { time: '10:20', call: 13, waiting: 2, people: 5 },
                    { time: '10:25', call: 9, waiting: 9, people: 1 },
                    { time: '10:30', call: 5, waiting: 2, people: 3 },
                    { time: '10:35', call: 8, waiting: 2, people: 1 },
                    { time: '10:40', call: 13, waiting: 1, people: 2 }
                ]
            }
        },
        mounted(){
            this.chart(); //单给这个表格设置皮肤
        },
        methods:{
            chart(){
                let _this = this;
                let data = this.arr;

                // 数据转换
                let dv = new DataSet.DataView();
                dv.source(data).transform({
                    type:'fold',
                    fields:['call','waiting'],
                    key:'type',
                    value:'count'
                });

                // 生成表实例
                let chart = new G2.Chart({
                    id:"c3",
                    forceFit:true,
                    height:_this.height,
                    padding:[80],
                    theme:'dark' //------设置皮肤
                });

                // 载入数据
                chart.source(dv);

                // 绘制
                chart.intervalStack()
                .position('time*count')
                .color('type',['#348cd1', '#43b5d8' ]);
                // 线
                chart.line()
                .position('time*people')
                .size(4)
                .color('#5ed470')
                .shape('smooth');
                // 点
                chart.point()
                .position('time*people')
                .color('#5ed470')

                // 渲染
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>