<template>
    <div>
        <div class="unit">
            <p @click="refresh()">自定义动画</p>
            <button @click="refresh()">刷新</button>
            <div class="chart" id="c1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"CustomAimate",
        data(){
            return {
                chart_1:null,
                arr:[]
            }
        },
        mounted(){
            this.chart();
        },
        methods:{
            chart(){
                let animate = G2.Animate;
                animate.registerAnimation('appear','delayScaleInY',function(shape,animateCfg){
                    let box = shape.getBBox(); // 获取柱子包围盒
                    let origin = shape.get('origin'); //获取柱子原始数据
                    let points = origin.points; //获取柱子顶点
                    // 计算柱子的变换中点
                    let centerX = (box.minX+box.maxX) / 2;
                    let centerY;
                    if(points[0].y-points[1].y <= 0){ //当顶点在零点之下
                        centerY = box.maxY;
                    }else{
                        centerY = box.minY;
                    }
                    // 设置初始状态
                    shape.attr('transform',[
                        ['t',-centerX,-centerY],
                        ['s',1,0.1],
                        ['t',centerX,centerY]
                    ]);
                    let index = shape.get('index');
                    let delay = animateCfg.delay;
                    if(G2.Util.isFunction(delay)){
                        delay = animateCfg.delay(index);
                    }
                    let easing = animateCfg.easing;
                    if(G2.Util.isFunction(easing)){
                        easing = animateCfg.easing(index);
                    }
                    // 设置动画目标状态
                    shape.animate({
                        transform:[
                            ['t',-centerX,-centerY],
                            ['s',1,10],
                            ['t',centerX,centerY]
                        ]
                    },animateCfg.duration,easing,animateCfg.callback,delay);
                });

                for(let i=0;i<50;i++){
                    this.arr.push({
                        x:i,
                        y:(Math.sin(i/5)*(i/5-10)+i/6)*5
                    });
                }

                this.chart_1 = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:400
                });

                this.chart_1.source(this.arr);
                this.chart_1.interval().position('x*y')
                .color('y','#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
                .animate({
                    appear:{
                        animation:"delayScaleInY",
                        easing:'easeElasticOut',
                        delay:index=>{
                            return index * 10;
                        }
                    }
                })
                this.chart_1.render();
            },
            refresh(){
                this.chart_1.clear();
                this.chart_1.interval().position('x*y')
                .color('y','#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
                .animate({
                    appear:{
                        animation:"delayScaleInY",
                        easing:'easeElasticOut',
                        delay:index=>{
                            return index * 10;
                        }
                    }
                });
                this.chart_1.render();
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>