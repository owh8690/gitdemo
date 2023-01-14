export default[
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path:'/',
        name:'main',
        component:()=>import("@/views/MainView"),
        redirect:"/home",
        children:[
            {
                path:"home",
                name:"home",
                component:()=>import("../views/index/HomeIndex")
            },
            {
                path:'/orders/list',
                name:"orderlist",
                component:()=>import("../views/orders/OrderList"),
                meta:{breadCrumb:["订单管理","订单列表"]}
            },
            {
                path:"/waybill/in",
                name:"billlog",
                component:()=>import("../views/waybill/BillLog"),
                meta:{breadCrumb:["运单管理","运单录入"]}
            },
            {
                path:"/waybill/list",
                name:"billlist",
                component:()=>import("../views/waybill/BillList"),
                meta:{breadCrumb:["运单管理","运单列表"],keepAlive:true}
            },
            {
                path:"/waybill/detail",
                name:"detail",
                component:()=>import("../views/waybill/BillDetail"),
                meta:{breadCrumb:["运单管理","运单列表","运单详情"]}
            },
            {
                path:"/depart/data",
                name:"depart",
                component:()=>import("../views/depart/DepartList"),
                meta:{breadCrumb:["发车管理","发车数据单"]}
            },
        
           
        ]
    }
]