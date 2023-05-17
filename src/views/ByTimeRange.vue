<template>
    <el-main>

        <div style="text-align: center">
            <el-date-picker v-model="dateTimeLeft" type="datetime" placeholder="Select start date and time"
                :shortcuts="shortcuts" value-format="YYYY-MM-DD HH:mm:ss" />
            ❤️💚💙💜🧡💛
            <el-date-picker v-model="dateTimeRight" type="datetime" placeholder="Select end date and time"
                :shortcuts="shortcuts" value-format="YYYY-MM-DD HH:mm:ss" />
            <br />
            <br />
            <el-button type="primary" @click="handleExport()">Export Time Range SQL File</el-button>
        </div>
    </el-main>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import sqlToolToolRequest from '../service'
import { saveAs } from 'file-saver';
import { ElNotification } from 'element-plus'

const dateTimeLeft = ref('')
const dateTimeRight = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: 'A week ago',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]

const handleExport = () => {

    if (dateTimeLeft.value == null || dateTimeLeft.value.length == 0 || dateTimeRight.value == null || dateTimeRight.value.length == 0) {
        ElNotification({
                        title: 'Error',
                        message: "Please select time range",
                        type: 'error',
                    })
        return
    }

    sqlToolToolRequest.request({
        url: '/api/export/timerange',
        method: 'post',
        data: {
            startTime: dateTimeLeft.value,
            endTime: dateTimeRight.value
        },
        interceptors: {
            responseInterceptor(res) {
                downloadTxtFile(res.data.data.join(""));
                return res
            },
        }
    })
}

function downloadTxtFile(content: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'export.sql');
}
</script>