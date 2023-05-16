<template>
    <el-form ref="DbFormRef" :model="DbForm" :rules="rules" label-width="300px" :size="formSize" status-icon>
        <el-form-item label="DB name" prop="name">
            <el-input v-model="DbForm.name" />
        </el-form-item>
        <el-form-item label="DB host" prop="host">
            <el-input v-model="DbForm.host" />
        </el-form-item>
        <el-form-item label="DB port" prop="port">
            <el-input v-model.number="DbForm.port" />
        </el-form-item>
        <el-form-item label="DB sid" prop="sid">
            <el-input v-model="DbForm.sid" />
        </el-form-item>
        <el-form-item label="DBA username" prop="username">
            <el-input v-model="DbForm.username" />
        </el-form-item>
        <el-form-item label="DBA password" prop="password">
            <el-input v-model="DbForm.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(DbFormRef)">Create</el-button>
            <el-button @click="resetForm(DbFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { computed } from '@vue/reactivity';
import sqlToolToolRequest from '../../service'
import { ElNotification } from 'element-plus'
import DatasourceManageVue from '@/views/DatasourceManage.vue';

import { mainStore } from '@/stores'

const store = mainStore()

const emit = defineEmits(['refreshData'])

const formSize = ref('default')
const DbFormRef = ref<FormInstance>()
const DbForm = reactive({
    name: '',
    host: '',
    port: '',
    sid: '',
    username: '',
    password: '',
    url: ''
})

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Please input DB name',
            trigger: 'change'
        },
    ],
    host: [
        {
            required: true,
            message: 'Please input DB host',
            trigger: 'change',
        },
    ],
    port: [
        {
            type: 'number',
            required: true,
            message: 'Please input DB port',
            trigger: 'change',
        },
    ],
    sid: [
        {
            required: true,
            message: 'Please input DB sid',
            trigger: 'change',
        },
    ],
    username: [
        {
            required: true,
            message: 'Please input dba username',
            trigger: 'change',
        },
    ],
    password: [
        {
            required: true,
            message: 'Please input dba password',
            trigger: 'change',
        },
    ]
})


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

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            DbForm.url = "jdbc:oracle:thin:@"+DbForm.host+":"+DbForm.port+":"+DbForm.sid
            const datas = DbForm
            sqlToolToolRequest.request({
                url: '/api/datasources',
                method: 'post',
                data: datas,
                interceptors: {
                    responseInterceptor(res) {

                        if (res.data.status == 100) {
                            ElNotification({
                                title: 'Success',
                                message: 'Datasource add succeeded',
                                type: 'success',
                            })
                            //更新pinia store
                            storeAllDB()
                            alert(JSON.stringify(store.dataSourceList,null,4))
                            emit('refreshData')
                            resetForm(DbFormRef.value)
                        } else {
                            ElNotification({
                                title: 'Error',
                                message: 'Datasource add failed',
                                type: 'error',
                            })
                            resetForm(DbFormRef.value)
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

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>
  