<template>
    <el-table :data="dbListData" stripe style="width: 100%">
        <el-table-column type="index" />
        <el-table-column prop="name" label="name"  />
        <el-table-column prop="host" label="host"  />
        <el-table-column prop="port" label="port" />
        <el-table-column prop="sid" label="sid" />
        <el-table-column prop="username" label="username" />
        <el-table-column prop="password" label="password" />
        <el-table-column fixed="right" label="Operations" >
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleModify(scope.row)">Modify</el-button>
                <el-button link type="primary" size="small" @click="handleDelete(scope.row.id)">Delete</el-button>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="url" label="url" /> -->
    </el-table>
</template>
  
<script lang="ts" setup>
import sqlToolToolRequest from '../service'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import { Row } from 'element-plus/es/components/table-v2/src/components';
const dbListData = ref([])

const getDbListData = () => {
    sqlToolToolRequest.request({
        url: '/db/listAll',
        method: 'get',
        interceptors: {
            responseInterceptor(res) {

                dbListData.value = res.data.data
                console.log(dbListData)
                return res
            },
        }
    })
}
getDbListData()

interface Datasource {
    id:number,
    name:string,
    host:string,
    port:number,
    sid:string,
    username:string,
    password:string,
    url:string
}

const handleModify = (datasource:Datasource) => {
    alert(JSON.stringify(datasource))
    
}

const handleDelete = (id:number) => {
    sqlToolToolRequest.request({
        url: '/db/del/' + id,
        method: 'delete',
        interceptors: {
            responseInterceptor(res) {
                getDbListData()
                return res
            },
        }
    })
}

</script>