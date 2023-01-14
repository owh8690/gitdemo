// 存放所有需要权限的动态路由
export default[
    {
        path:"/attendant",
        name:"attendant",
        component:()=>import("../views/authView/AuthAttendant"),
        meta:{auth:["boss","administration"]}
    },
    {
        path:"/salary",
        name:"salary",
        component:()=>import("../views/authView/AuthSalary"),
        meta:{auth:["boss","finance"]}
    },
    {
        path:"*",
        name:"notfound",
        component:()=>import("../views/NotFound"),
        meta:{auth:["boss","administration","finance","user"]}
    }
]