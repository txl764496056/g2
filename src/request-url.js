const url = {
    cart_color_map:"data/cart_color_map",
    install(Vue,options){
        Vue.prototype.$url = url;
    }
}

export default url;