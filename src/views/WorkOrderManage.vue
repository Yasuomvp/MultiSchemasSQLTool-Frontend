<template>
    <el-main>
        <el-row justify="end">
            <el-button primary @click="dialogTableVisible = true">
                Add
            </el-button>

            <el-dialog v-model="dialogTableVisible" title="Create Workorder">
                <NewWorkorder @refreshData='getWoListData' />
            </el-dialog>

        </el-row>
        <el-row>
            <el-table :data="woListData" stripe style="width: 100%">
                <el-table-column type="index" :index='indexMethod' />
                <el-table-column prop="name" label="name" />
                <el-table-column prop="describeText" label="describeText" />
                <el-table-column prop="time" label="time" width="300" sortable/>
                <el-table-column prop="testStatus" label="testStatus" />
                <el-table-column prop="prodStatus" label="prodStatus" />
                <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClickInfo(scope.row)">info</el-button>

                        <el-button link type="primary" size="small" slot="refrence"
                            @click="handleExecuteWO(scope.row)">execute</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row justify="center">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"
                v-model:current-page=pageParam.current v-model:page-size=pageParam.size />
        </el-row>
    </el-main>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <pre>{{ drawerData }}</pre>
                        </el-drawer>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import sqlToolToolRequest from '../service'
import { mainStore } from '@/stores'
import NewWorkorder from '@/components/forms/NewWorkorder.vue';
import { ElNotification } from 'element-plus'


const dialogTableVisible = ref(false);
const woListData = ref([])
const total = ref(0)
const store = mainStore()
const drawer = ref(false)
const drawerData = ref("")

const handleCurrentChange = (val: number) => {
    pageParam.current = val
    getWoListData()
}

const indexMethod = (index: number) => {
    return (pageParam.current - 1) * pageParam.size + index + 1;
}

const pageParam: PageParam = reactive({
    current: 1,
    size: 20
})

const getWoListData = () => {
    sqlToolToolRequest.request({
        url: '/api/workorders',
        method: 'get',
        params: pageParam,
        interceptors: {
            responseInterceptor(res) {

                woListData.value = res.data.data.records
                total.value = res.data.data.total
                // //存入pinia供其他组件调用
                // store.workOrderList = woListData.value
                return res
            },
        }
    })
}
getWoListData()

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

const handleExecuteWO = (workOrder: WorkOrder) => {
    sqlToolToolRequest.request({
        url: '/api/workorders/execute/' + workOrder.id,
        method: 'post',
        interceptors: {
            responseInterceptor(res) {

                if (res.data.status == 100) {
                    ElNotification({
                        title: 'Success',
                        message: 'Workorder execute succeeded',
                        type: 'success',
                    })

                } else {
                    ElNotification({
                        title: 'Error',
                        message: 'Workorder execute failed',
                        type: 'error',
                    })
                }
                getWoListData()
                storeAllWO()
                return res


            },
        }
    })
}

const handleClickInfo = (workOrder: WorkOrder) => {
    drawerData.value = JSON.stringify(workOrder, null, 4)
    drawer.value = true

}

interface Script {
    id: number,
    schemas: string,
    sqlContent: string,
}

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

interface WorkOrder {
    id: number,
    name: string,
    describeText: string,
    dbId: number,
    time: string,
    testStatus: number,
    prodStatus: number,
    scripts: Script,
    datasource: Datasource
}

interface PageParam {
    current: number,
    size: number
}
</script>
