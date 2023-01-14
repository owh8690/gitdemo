import axios from "axios";
import { Promise } from "core-js";
import { Message } from 'element-ui';
import { getData } from "./auth";

// 之后用axios就为service({})
const service=axios.create({
    baseURL:'http://localhost:8080',
    timeout:4000
})
// 请求拦截器(每个请求都带有某个请求参数之类的情况就要写请求拦截器。这里是token)
service.interceptors.request.use(config=>{
    console.log(1,config)
    if(getData()){
        console.log(2,getData())
        config.headers.token=getData()   
    }
   
    return config
},()=>{
    Message({
        type:'error',
        message: "请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})


// 响应拦截器
service.interceptors.response.use(res=>{
    console.log(2,res)
    const result = res.data
    if(result.success){
        return result   // 使得请求结果res值变为result
    }else{
        Message({
            type:'error',
            message:result.message || "账号或密码有误"
        })
        return Promise.reject(new Error("账号或密码有误"))
    }
},()=>{
    Message({
        type:'error',
        message: "请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})
export default service