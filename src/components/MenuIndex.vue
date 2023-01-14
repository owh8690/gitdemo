<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url" class="mitem">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </template>
            <!-- 递归   这个menu相当于自己给自己传参-->   
            <nav-menu v-for="(value,index) in menu.children" :menu="value" :key="index"></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" class="mitem">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name:"NavMenu",  // name配置项，给组件本身起了个名字（组件名），仅组件自己调用自己的时候才有用（递归）
        props:{
            menu:{
                type:Object,
                required:true
            }
        }
    }
</script>

<style lang="less" scoped>
.mitem{width: 200px;}
</style>