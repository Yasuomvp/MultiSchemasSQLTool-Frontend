<template>
    <el-form ref="WoFormRef" :model="WoForm" label-width="150" >
        <el-form-item label="Workorder Name:" prop="name">
            <el-input v-model="WoForm.name" style="width:215px" />
        </el-form-item>
        <el-form-item label="Datasource:" prop="datasource">
            <el-select v-model="WoForm.dbId" placeholder="please select datasource">
                <el-option v-for="item, index in store.dataSourceList" :key="index" :value="item.id"
                    :label="item.id + ' : ' + item.name"></el-option>
            </el-select>
        </el-form-item>





        <el-form-item :label="'Script ' + index" v-for="(item, index) in WoForm.scripts">
            <el-main style="border-radius: 20px">
                <el-input v-model="item.value.schemasContent" autosize type="textarea"
                    placeholder="Please input schemas,split with command" />
                <el-input v-model="item.value.sqlContent" autosize type="textarea"
                    placeholder="Please enter sql separated by semicolons" />
                <el-button type="danger" class="mt-2" @click.prevent="removeScript(item)">Delete</el-button>
            </el-main>
        </el-form-item>

        <el-form-item>
            <el-button type="success" @click="submitForm(WoFormRef)" >Submit</el-button>
            <el-button type="primary" @click="addScript">New Script</el-button>
            <el-button type="info" @click="resetForm(WoFormRef)">Reset</el-button>
            <el-button @click="debugf">DEBUG</el-button>
        </el-form-item>



    </el-form>
</template>

<script setup lang="ts">
import { mainStore } from '@/stores'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import sqlToolToolRequest from '../../service'
import { ElNotification } from 'element-plus'

const emit = defineEmits(['refreshData'])



interface ScriptItem {
    key: number,
    value: {
        schemasContent: string,
        sqlContent: string,
    }
}

interface Script {
    schemasContent: string,
    sqlContent: string,
}

const store = mainStore()
const WoFormRef = ref<FormInstance>()

const WoForm = reactive({
    name: '',
    dbId: null,
    scripts: [
        {
            key: 1,
            value: {
                schemasContent: '',
                sqlContent: ''
            },
        },
    ]
})

// interface PostDataInterface {
//     name: string,
//     dbId: number,
//     scripts: Script
// }

// const PostData:PostDataInterface = {
//     name:"",
//     dbId:null,
//     scripts:[]
// }


const storeAllWO = () => {
    sqlToolToolRequest.request({
        url: '/wo/listAll',
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

const addScript = () => {
    WoForm.scripts.push({
        key: Date.now(),
        value: {
            schemasContent: '',
            sqlContent: ''
        },
    })
}

const removeScript = (item: ScriptItem) => {
    const index = WoForm.scripts.indexOf(item)
    if (index !== -1) {
        WoForm.scripts.splice(index, 1)
    }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const debugf = () => {


    console.log(JSON.stringify(store.dataSourceList))
    console.log(JSON.stringify(store.workOrderList))




    // alert(JSON.stringify(WoForm.datasource))
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            const scriptArr:Script[] = []
            WoForm.scripts.forEach((item)=>{
                scriptArr.push(item.value)
            })

            const datas = {
                name: WoForm.name,
                dbId: WoForm.dbId,
                scripts: scriptArr
            }
            
            sqlToolToolRequest.request({
                url: '/wo/add',
                method: 'post',
                data: datas,
                interceptors: {
                    responseInterceptor(res) {

                        if (res.data.status == 100) {
                            ElNotification({
                                title: 'Success',
                                message: 'Workorder add succeeded',
                                type: 'success',
                            })

                            //更新pinia store
                            storeAllWO();
                            emit('refreshData')
                            resetForm(WoFormRef.value)
                        } else {
                            ElNotification({
                                title: 'Error',
                                message: 'Workorder add failed',
                                type: 'error',
                            })
                            resetForm(WoFormRef.value)
                        }

                        return res
                    },
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>
