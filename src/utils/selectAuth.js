// 如果本地存储权限的名字，可以用这个封装函数来添加动态路由，设置权限
import asyncRouterMap from "../router/asyncRouterMap";
import router from "../router";
export function selectAuth(){
    let auth=sessionStorage.getItem("auth")
    let asyncSelectRouter=asyncRouterMap.filter(item=>item.meta.auth.includes(auth))
    for(let i=0;i< asyncSelectRouter.length;i++){
        router.addRoute("main",asyncSelectRouter[i])
    } 
}
