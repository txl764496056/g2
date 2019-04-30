<template>
    <div>
        <div class="unit">
            <p>案例1：矩形分面</p>
            <div class="chart" id="c1"></div>
        </div>
        <div class="unit">
            <p>案例2：水平列表分面</p>
            <div class="chart" id="c2"></div>
        </div>
        <div class="unit">
            <p>案例3：圆形分面</p>
            <div class="chart" id="c3"></div>
        </div>
        <div class="unit">
            <p>案例4：树形分面</p>
            <div class="chart" id="c4"></div>
        </div>
        <div class="unit">
            <p>案例5：镜像分面</p>
            <select name="" id="select-date">
                <option v-for="(value,index) in dates" v-bind:key="index" :value="value">{{(new Date(value*1000)).getFullYear()}}</option>
            </select>
            <div class="chart" id="c5"></div>
        </div>
        <div class="unit">
            <p>案例6：矩阵分面</p>
            <div class="chart" id="c6"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Facet',
        data(){
            return {
                dates:[], //存放案例5的日期，渲染页面的select
                chartH:700,
                arr:[],
                arr2:[
                    { gender: '男', count: 40, class: '一班', grade: '一年级' },
                    { gender: '女', count: 30, class: '一班', grade: '一年级' },
                    { gender: '男', count: 35, class: '二班', grade: '一年级' },
                    { gender: '女', count: 45, class: '二班', grade: '一年级' },
                    { gender: '男', count: 20, class: '三班', grade: '一年级' },
                    { gender: '女', count: 35, class: '三班', grade: '一年级' },
                    { gender: '男', count: 30, class: '一班', grade: '二年级' },
                    { gender: '女', count: 40, class: '一班', grade: '二年级' },
                    { gender: '男', count: 25, class: '二班', grade: '二年级' },
                    { gender: '女', count: 32, class: '二班', grade: '二年级' },
                    { gender: '男', count: 28, class: '三班', grade: '二年级' },
                    { gender: '女', count: 36, class: '三班', grade: '二年级' }
                ],
                population:[],
                iris_arr:[]
            }
        },
        mounted(){

            let _this = this;

            let promise1 = Promise.resolve();
            promise1.then(res=>{
                return  axios.get('/static/diamond.json');
            }).then(res=>{
                _this.arr = res.data;
                return ;
            }).then(res=>{
                _this.chart1();
                _this.chart2();
                _this.chart3();
            });

            let promise2 = Promise.resolve();
            promise2.then(res=>{
                return axios.get('/static/population.json');
            }).then(res=>{
                _this.population = res.data;
                return ;
            }).then(res=>{
                _this.chart5();
            });

            let promise3 = Promise.resolve();
            promise3.then(res=>{
                return axios.get('/static/iris.json');
            }).then(res=>{
                _this.iris_arr = res.data
                return ;
            }).then(res=>{
                _this.chart6();
            })

            this.chart4();
        },
        methods:{
            chart1(){
                let _this = this;
                let data = this.arr;

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:_this.chartH,
                    padding:[0,50,0,50]
                });

                // 载入数据
                chart.source(data,{
                    carat:{
                        sync:true
                    },
                    price:{
                        sync:true
                    },
                    cut:{
                        sync:true
                    }
                });

                // 分面
                chart.facet('rect',{
                    fields:['cut','clarity'],
                    eachView(view){
                        view.point().position('carat*price').color('cut');
                    }
                });

                // 渲染
                chart.render();
            },
            chart2(){
                let _this = this;
                let data = this.arr;

                let chart = new G2.Chart({
                    id:"c2",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 分面
                chart.facet('list',{
                    fields:['cut'],
                    cols:3,
                    padding:30,
                    eachView(view){
                        view.point().position('carat*price').color('cut');
                    }
                })

                // 渲染
                chart.render();
            },
            chart3(){
                let _this = this;
                let data = this.arr;

                let chart = new G2.Chart({
                    id:"c3",
                    // forceFit:true,
                    width:_this.chartH,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 关闭坐标轴
                chart.axis(false);

                // 坐标系
                chart.coord('polar');

                // 分面
                chart.facet('circle',{
                    fields:['clarity'],
                    padding:0,
                    eachView(view,facet){
                        const data = facet.data;
                        const dv = new DataSet.DataView();
                        dv.source(data).transform({
                            type:'aggregate', //类型：统计
                            fields:['price'], //统计字段 price
                            operations:['mean'], //统计操作  平均数
                            as:['mean'], //存储为 mean 字段
                            groupBy:['cut'] //分类字段  cut
                        });
                        view.source(dv);
                        view.interval().position('cut*mean').color('cut');
                    }
                });

                chart.render();
            },
            chart4(){
                let _this = this;
                let data = this.arr2;
                
                let chart = new G2.Chart({
                    id:"c4",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 坐标系
                chart.coord('theta');

                // 树形分面
                chart.facet('tree',{
                    fields:['grade','class'],
                    line:{
                        stroke:"#00a3d7"
                    },//连线样式
                    lineSmooth:true, //树节点连线方式，平滑曲线
                    eachView(view,facet){
                        const data = facet.data;
                        let dv = new DataSet.DataView();
                        dv.source(data).transform({
                            type:'percent', //备份比
                            fields:'count', //统计人数
                            dimension:'gender',//人数在年级中的占比
                            as:'percent' //存储字段
                        })
                        view.source(dv);
                        view.intervalStack().position('percent').color('gender');
                    }
                })

                //渲染
                chart.render();
            },
            chart5(){
                let _this = this;
                let data = this.population;
                let select = document.querySelector("#select-date"); //日期列表容器
                
                let tmp = []; //存放所有对象，（包括男、女）

                data.male.values.forEach(obj=>{
                    // 存储时间
                    if(_this.dates.indexOf(obj.date)===-1){
                        _this.dates.push(obj.date);
                    }
                    // 每条数据加入性别和日期
                    obj.age_groups.forEach(item=>{
                        item.gender = 'male';
                        item.date = obj.date;
                        tmp.push(item);
                    });
                });

                // 每条数据加入性别和日期
                data.female.values.forEach(obj=>{
                    obj.age_groups.forEach(item=>{
                        item.gender = 'female';
                        item.date = obj.date;
                        tmp.push(item);
                    })
                });

                // 联动设置
                let ds = new DataSet({
                    state:{
                        date:_this.dates[0]
                    }
                });

                // 过滤数据
                let dv = ds.createView();
                dv.source(tmp).transform({
                    type:'filter',
                    callback(row){
                        return (new Date(row.date*1000)).getFullYear() === (new Date(ds.state.date*1000)).getFullYear();
                    }
                });

                let chart = new G2.Chart({
                    id:"c5",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(dv,{
                    age:{
                        sync:true,
                        tickCount:11
                    },
                    total_percentage:{
                        formatter:val=>{
                            return val+'%';
                        }
                    }
                });
                
                // 分面
                chart.facet('mirror',{
                    fields:['gender'],
                    transpose:true, //坐标轴翻转
                    eachView(view){
                        view.interval().position('age*total_percentage').color('gender',['#95cafb','#f9c0c0']);
                    }
                })

                // 渲染
                chart.render();

                // 绑定事件
                select.addEventListener('change',function(){
                    let val = this.value;
                    let date = parseInt(val);
                    ds.setState('date',date);
                })

            },
            chart6(){
                let _this = this;
                let data = this.iris_arr;

                let chart = new G2.Chart({
                    id:"c6",
                    forceFit:true,
                    height:_this.chartH
                });

                // 载入数据
                chart.source(data);

                // 分面
                chart.facet('matrix',{
                    fields:['SepalLength','SepalWidth','PetalLength','PetalWidth'],
                    eachView(view,facet){
                        if(facet.rowIndex === facet.colIndex){
                            let dv = new DataSet.DataView();
                            dv.source(facet.data)
                            .transform({
                                type: 'bin.histogram', //直方图分箱
                                field: facet.colField,  // 对应数轴上的一个点
                                bins: 30,               // 分箱个数
                                as: [ facet.colField, 'count' ],
                                groupBy: [ 'Species' ]
                            });
                            view.source(dv.rows);
                            view.intervalStack()
                            .position(facet.colField + '*count')
                            .color('Species');
                        }else{
                            view.point().position([facet.colField,facet.rowField]).color('Species');
                        }
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