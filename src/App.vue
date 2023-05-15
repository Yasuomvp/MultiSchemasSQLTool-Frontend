<script setup lang="ts">
import leftSideBar from './components/LeftSideBar.vue';
import sqlToolToolRequest from './service'
import { mainStore } from '@/stores'

const store = mainStore()

const storeAllDB = () => {
    sqlToolToolRequest.request({
        url: '/api/datasources',
        method: 'get',
        interceptors: {
            responseInterceptor(res) {
                //存入pinia供其他组件调用
                store.dataSourceList = res.data.data
                return res
            },
        }
    })
}

const storeAllWO = () => {
    sqlToolToolRequest.request({
        url: '/api/workorders',
        method: 'get',
        interceptors: {
            responseInterceptor(res) {
                //存入pinia供其他组件调用
                store.workOrderList = res.data.data
                return res
            },
        }
    })
}

storeAllDB()
storeAllWO()

</script>

<template>
  <el-container>

    <leftSideBar></leftSideBar>
    <RouterView/>
  </el-container>

  <!-- <SqlPage></SqlPage> -->
</template>

<style>
.el-container {
  height: 100%;
}
</style>