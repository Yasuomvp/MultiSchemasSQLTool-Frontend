<template>
    <el-main>
        <el-row justify="end">
            <!-- <el-button primary @click="dialogTableVisible = true">
                Add
            </el-button> -->

            <!-- <el-dialog v-model="dialogTableVisible" title="Add Datasource Config">
                <NewDatasource @refreshData='getLogListData'/>
            </el-dialog> -->

        </el-row>
        <el-row>
            <el-table :data="logListData" stripe style="width: 100%">
                <el-table-column type="index" :index='indexMethod' width='50' />
                <el-table-column prop="workorder.name" label="workorderName" />
                <el-table-column prop="workorder.datasource.name" label="datasourceName" />
                <el-table-column prop="executeSchema" label="executeSchema" />
                <el-table-column prop="sqlContent" label="sqlContent" width="400"/>
                <el-table-column prop="errorSql" label="errorSql" width="400"/>
                <el-table-column prop="executeStatus" label="Status" width='70'/>
                <el-table-column prop="executeTime" label="executeTime" width='180' sortable/>
                <!-- <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleModify(scope.row)">Modify</el-button>
                        <el-button link type="primary" size="small" @click="handleDelete(scope.row.id)">Delete
                        </el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-row>
        <el-row justify="center">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
                v-model:current-page=pageParam.current v-model:page-size=pageParam.size />
        </el-row>
    </el-main>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import sqlToolToolRequest from '../service'
import { mainStore } from '@/stores'
import { ElNotification } from 'element-plus'


const store = mainStore()
const logListData = ref([])
const total = ref(0)
interface PageParam {
    current: number,
    size: number
}
const pageParam: PageParam = reactive({
    current: 1,
    size: 20
})

const getWoListData = () => {
    sqlToolToolRequest.request({
        url: '/api/log',
        method: 'get',
        params: pageParam,
        interceptors: {
            responseInterceptor(res) {

                logListData.value = res.data.data.records
                total.value = res.data.data.total
                // //存入pinia供其他组件调用
                // store.workOrderList = woListData.value
                return res
            },
        }
    })
}
getWoListData()

const handleCurrentChange = (val: number) => {
    pageParam.current = val
    getWoListData()
}

const indexMethod = (index: number) => {
    return (pageParam.current - 1) * pageParam.size + index + 1;
}



</script>