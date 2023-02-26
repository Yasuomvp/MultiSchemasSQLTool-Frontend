<template>
    <el-main>
        <el-row justify="end">
            <el-button primary @click="dialogTableVisible = true">
                Add
            </el-button>

            <el-dialog v-model="dialogTableVisible" title="Add Datasource Config">
                <NewDatasource @refreshData='getDbListData'/>
            </el-dialog>

        </el-row>
        <el-row>
            <el-table :data="dbListData" stripe style="width: 100%">
                <el-table-column type="index" :index='indexMethod' width='50' />
                <el-table-column prop="name" label="name" />
                <el-table-column prop="host" label="host" />
                <el-table-column prop="port" label="port" width="100" />
                <el-table-column prop="sid" label="sid" />
                <el-table-column prop="username" label="username" />
                <el-table-column prop="password" label="password" />
                <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleModify(scope.row)">Modify</el-button>
                        <el-button link type="primary" size="small" @click="handleDelete(scope.row.id)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row justify="center">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
                v-model:current-page=pageParam.current v-model:page-size=pageParam.size />
        </el-row>
    </el-main>
</template>
  
<script lang="ts" setup>
import sqlToolToolRequest from '../service'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import NewDatasource from '@/components/forms/NewDatasource.vue'
import { mainStore } from '@/stores'

const store = mainStore()

const dbListData = ref([])

const dialogTableVisible = ref(false);

interface PageParam {
    current: number,
    size: number
}

const pageParam: PageParam = reactive({
    current: 1,
    size: 20
})

const indexMethod = (index: number) => {
    return (pageParam.current - 1) * pageParam.size + index + 1;
}


const total = ref(0)

const getDbListData = () => {
    sqlToolToolRequest.request({
        url: '/db/listAllByPage',
        method: 'get',
        params: pageParam,
        interceptors: {
            responseInterceptor(res) {

                dbListData.value = res.data.data.records
                total.value = res.data.data.total
                // //存入pinia供其他组件调用
                // store.dataSourceList = dbListData.value
                return res
            },
        }
    })
}
getDbListData()

interface Datasource {
    id: number,
    name: string,
    host: string,
    port: number,
    sid: string,
    username: string,
    password: string,
    url: string
}

const handleModify = (datasource: Datasource) => {
    alert(JSON.stringify(datasource))

}

const handleDelete = (id: number) => {
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

const handleCurrentChange = (val: number) => {
    pageParam.current = val
    getDbListData()
}
</script>