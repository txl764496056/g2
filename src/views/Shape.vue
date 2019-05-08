<template>
    <div>
        <div class="unit">
            <p>自定义形状shape</p>
            <div class="chart" id="c1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Shape',
        data(){
            return {
                arr:[
                    { genre:'Sports', sold:27500 },
                    { genre:'Strategy', sold:11500 },
                    { genre:'Action', sold:6000 },
                    { genre:'Shooter', sold:3500 },
                    { genre:'Other', sold:1500 }
                ]
            }
        },
        mounted(){
            this.chart();
        },
        methods:{
            chart(){
                let shape = G2.Shape;
                shape.registerShape('interval','triangle',{
                    getPoints(cfg){
                        let x = cfg.x;
                        let y = cfg.y;
                        let y0 = cfg.y0;
                        let width = cfg.size;
                        return [
                            {x:x-width/2,y:y0},
                            {x:x,y:y},
                            {x:x+width/2,y:y0}
                        ]
                    },
                    draw(cfg,group){
                        let points = this.parsePoints(cfg.points);
                        let polygon = group.addShape('polygon',{
                            attrs:{
                                points:[
                                    [points[0].x,points[0].y],
                                    [points[1].x,points[1].y],
                                    [points[2].x,points[2].y]
                                ],
                                fill:cfg.color
                            }
                        });
                        return polygon;
                    }
                });

                let chart = new G2.Chart({
                    id:"c1",
                    forceFit:true,
                    height:400
                });

                chart.source(this.arr);
                chart.interval().position('genre*sold').color('genre').shape('triangle');
                chart.render();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>