<template>
    <el-form ref="DbFormRef" :model="dbFormData" :rules=rules label-width="300px" :size="formSize" status-icon>
        <el-form-item label="DB name" prop="name">
            <el-input v-model="dbFormData.name" />
        </el-form-item>
        <el-form-item label="DB host" prop="host">
            <el-input v-model="dbFormData.host" />
        </el-form-item>
        <el-form-item label="DB port" prop="port">
            <el-input v-model.number="dbFormData.port" />
        </el-form-item>
        <el-form-item label="DB sid" prop="sid">
            <el-input v-model="dbFormData.sid" />
        </el-form-item>
        <el-form-item label="DBA username" prop="username">
            <el-input v-model="dbFormData.username" />
        </el-form-item>
        <el-form-item label="DBA password" prop="password">
            <el-input v-model="dbFormData.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(DbFormRef)">Create</el-button>
            <el-button @click="resetForm(DbFormRef)">Reset</el-button>
        </el-form-item>
        <pre>{{ dbFormData }}</pre>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { computed } from '@vue/reactivity';
import sqlToolToolRequest from '../../service'
import { ElNotification } from 'element-plus'
import DatasourceManageVue from '@/views/DatasourceManage.vue';

import { mainStore } from '@/stores'

import { defineProps, defineEmits } from 'vue';



const store = mainStore()

const emit = defineEmits(['refreshData'])

const formSize = ref('default')
const DbFormRef = ref<FormInstance>()


interface DbFormInterface {
  name: string;
  host: string;
  port: string;
  sid: number;
  username: string;
  password: string;
  url: string;
}

const props = defineProps({
  dbFormData: {
    type: Object as () => DbFormInterface,
    required: true
  }
});

const { dbFormData } = toRefs(props);


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
            dbFormData.value.url = "jdbc:oracle:thin:@"+dbFormData.value.host+":"+dbFormData.value.port+":"+dbFormData.value.sid
            const datas = dbFormData.value
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
  