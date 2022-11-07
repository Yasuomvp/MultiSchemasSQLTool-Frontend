<template>
    <el-row>
        <el-col :span="8">
            <el-form label-width="120px">
                <el-form-item label="Database URL">
                    <el-input v-model="dbUrl" placeholder="jdbc:oracle:thin:@workout996.icu:1521:XE" />
                </el-form-item>
                <el-form-item label="DBA Username">
                    <el-input v-model="dbUsername" placeholder="system" />
                </el-form-item>
                <el-form-item label="DBA Password">
                    <el-input v-model="dbPassword" placeholder="password" show-password />
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3">
            <el-button type="primary" @click="handleTestConn()">Test Connection</el-button>
            {{ connResult }}
        </el-col>
        <el-col :span="2">
            <el-button type="danger" @click="clearSchemaAndSql()">clear</el-button>
        </el-col>
        <el-col :span="2">
            <el-button type="success" @click="handleExecuteSql()">execute</el-button>
            {{ execResult }}
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
            <el-input v-model="schemas" autosize type="textarea"
                placeholder="Please input schemas,split with command" />
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
    <el-row>
        <el-divider />

    </el-row>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
            <el-input v-model="sqls" :autosize="{ minRows: 30 }" type="textarea"
                placeholder="Please enter sql separated by semicolons" />
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import sqlToolToolRequest from '../service'
import { ElNotification } from 'element-plus'

const dbUrl = ref("jdbc:oracle:thin:@workout996.icu:1521:XE")
const dbUsername = ref("system")
const dbPassword = ref("Yasuomvp131213")
const connResult = ref("")
const execResult = ref("")
const schemas = ref("TEST01,TEST02,TEST03,TEST04,TEST05,TEST06,TEST07,TEST08,TEST09")
const sqls = ref("select * from usert;")

const handleTestConn = () => {
    const datas = { 'dbUrl': dbUrl.value, 'dbUsername': dbUsername.value, 'dbPassword': dbPassword.value }
    sqlToolToolRequest.request({
        url: '/tool/dbConn',
        method: 'post',
        data: datas,
        interceptors: {
            responseInterceptor(res) {

                if (res.data == 'yes') {
                    connResult.value = "success"
                    ElNotification({
                        title: 'Success',
                        message: 'Connection succeeded',
                        type: 'success',
                    })
                } else {
                    connResult.value = "failed"
                    ElNotification({
                        title: 'Error',
                        message: 'Connection failed',
                        type: 'error',
                    })
                }

                return res
            },
        }
    })

}

const clearSchemaAndSql = () => {
    schemas.value = ""
    sqls.value = ""
}

const handleExecuteSql = () => {
    const datas = {'schemas':schemas.value,'sqls':sqls.value}
    sqlToolToolRequest.request({
        url: '/tool/executeSqlByFuture',
        method: 'post',
        data: datas,
        interceptors: {
            responseInterceptor(res) {

                if (res.data == 'yes') {
                    execResult.value = "success"
                    ElNotification({
                        title: 'Success',
                        message: 'Execute succeeded',
                        type: 'success',
                    })
                } else {
                    execResult.value = "failed"
                    ElNotification({
                        title: 'Error',
                        message: 'Execute failed',
                        type: 'error',
                    })
                }

                return res
            },
        }
    })
}


</script>