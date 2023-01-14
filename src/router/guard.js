import { getData } from "@/utils/auth";
import router from "./index";
import asyncRouterMap from "../router/asyncRouterMap";
import store from "@/store"
router.beforeEach(async (to,from,next)=>{
    console.log("全局前置路由守卫触发了")
    const getToken=getData()
    if(getToken){
        await store.dispatch("getRole")
        if(to.path=='/login'){
            next("/")
        }else{
            // 动态添加需要权限的路由
            if(to.name==null){
                console.log(to.name)
                let auth=store.state.role
                let asyncSelectRouter=asyncRouterMap.filter(item=>item.meta.auth.includes(auth))
                for(let i=0;i< asyncSelectRouter.length;i++){
                    router.addRoute("main",asyncSelectRouter[i])
                } 
                // 因为router.addRoute()是异步操作，跳转可能会先执行，所以不能使用next()。
                // 所以要写成next({...to,replace:true})，to.name如果为null，会重复执行，直到找到，执行next()
                next({...to,replace:true})
            }else{
                next()
            }
        }
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next('/login')
        }
    }
})