// 封装get/post请求
import service from "./service";

export function get(url,params){
    const config={
        url,
        method:"get"
    }
    if(params){
        config.params=params
    }
    return service(config)
}

export function post(url,data){
    const config={
        url,
        method:"post"
    }
    if(data){
        config.data=data
    }
    return service(config)
}