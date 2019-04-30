<template>
    <div>
        <div class="unit">
            <p>案例1：图标交互</p>
            <div class="chart" id="c1"></div>
            <div class="chart" id="c2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Interaction',
        data(){
            return {
                chartH:400,
                map_data:{},
                provChart:null
            }
        },
        mounted(){
            let _this = this;

            let promise = Promise.resolve();
           
            promise.then(res=>{
                return axios.get('/static/china2.geo.json');
            }).then(res=>{
                _this.map_data = res.data;
                return ;
            }).then(res=>{
                _this.chart();
            })
        },
        methods:{
            /**
             * 中国大地图绘制渲染，
             * 选中某个省，绘制省市地图
             */
            chart(){
                let _this = this;
                let data = this.map_data.China;

                let ds = new DataSet();
                let userData = [];

                let create_view = ds.createView("back");
                create_view.source(data,{
                    type:'GeoJSON'
                }).transform({
                    type:'geo.projection',
                    projection:'geoMercator'
                }).transform({ //字段过滤
                    type:"pick",
                    fields:['longitude','latitude','name']
                }); 

                let chart = new G2.Chart({
                    id:"c1",
                    width:_this.chartH*2,
                    height:_this.chartH+140
                });

                // 载入数据
                chart.source(create_view);

                // 隐藏提示和图列
                chart.legend(false).tooltip(false);

                // 隐藏坐标轴
                chart.axis(false);

                // 绘制
                chart.polygon()
                .position('longitude*latitude')
                .style({ //设置地图样式
                    stroke:"#bfbfbf",
                    fill:"#e3e3e3",
                    lineWidth:1,
                    globalAlpha:0.85,
                    cursor:'pointer' //设置鼠标手势
                })
                .select({ //选中及选中样式
                    mode:'single',
                    style:{
                        fill:"#1890ff"
                    }
                });

                // 渲染
                chart.render();

                // 先显示浙江省地图
                let shapes = chart.getAllGeoms()[0].getShapes();
                for(let i=0;i<shapes.length;i++){
                    let shape = shapes[i];
                    let name = shape.get('origin')['_origin'].name;
                    if(name==='浙江'){
                        _this.provinceChart(name);
                        chart.getAllGeoms()[0].setShapeSelected(shape); //设置大地图上浙江省份为已选中样式
                    }
                }

                // 绑定点击事件，点击省，绘制对应省的地图
                chart.on("polygon:click",evt=>{
                    let item = evt.shape.get('origin');
                    let name = item['_origin'].name;
                    // 绘制省份地图
                    _this.provinceChart(name);
                });

            },
            provinceChart(name){
                let _this = this;

                // 销毁清除之前的省份图表，绘制渲染新的省份图表
                _this.provChart && _this.provChart.destroy();

                let data = this.map_data[name];
                let ds = new DataSet();

                let dv = ds.createView();
                
                dv.source(data,{
                    type:'GeoJSON'
                }).transform({
                    type:'geo.projection',
                    projection:'geoMercator'
                }).transform({
                    type:'pick',
                    fields:['longitude','latitude','name']
                });

                _this.provChart = new G2.Chart({
                    id:"c2",
                    width:_this.chartH*2,
                    height:_this.chartH*1.5
                });

                // 隐藏坐标轴，图列，提示信息
                _this.provChart.axis(false).legend(false).tooltip(false);

                // 载入数据
                _this.provChart.source(dv);

                // 绘制省份地图
                _this.provChart.polygon()
                .position('longitude*latitude')
                .color('name',"#39ccf4-#20546b")
                .label('name');

                // 渲染
                _this.provChart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>