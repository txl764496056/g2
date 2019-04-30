import Mock from "mockjs"
import url from "./request-url.js"
const Random = Mock.Random;
/**
 * 分类数据颜色的映射
 */
Mock.mock(url.cart_color_map,function(){
    let arr = [];
    let name = ['New York','San Francisco','Austin'];
    let date = ['2011-10','2011-11','2011-12','2012-01','2012-02','2012-03','2012-04','2012-05','2012-06','2012-07','2012-08','2012-09'];

    // for1
    for(let j=0;j<date.length;j++){
        // 获取当月总天数
        let date_arr = date[j].split("-");
        let days = new Date(date_arr[0],date_arr[1],0).getDate();
        // for2----天数循环
        for(let k=1;k<=days;k++){
            let str = "";
            if(k>9){
                str = "-"+k;
            }else{
                str = "-0"+k;
            }
            // item对象,保存每条数据信息
            let item = {};
            // 日期
            item.date = date[j]+str;
            // 各个城市温度
            for(let i=0;i<name.length;i++){
                let temperature = 0;
                switch(i){
                    case 0:temperature = Mock.mock("@integer(60,90)");break;
                    case 1:temperature = Mock.mock("@integer(50,80)");break;
                    case 2:temperature = Mock.mock("@integer(40,70)");break;
                    default:break;
                }
                item[name[i]] = temperature;
            }
            arr.push(item);
        }//end-for2
    }//end-for1

    return arr;
});