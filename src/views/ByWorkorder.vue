<template>
    <el-main>
        <div style="text-align: center">
            <el-transfer v-model="rightList" :data="leftList" :titles="['Source', 'Target']" filterable />
            <br />
            <el-button type="primary" @click="handleExport()">Export Target SQL File</el-button>
        </div>




    </el-main>>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { mainStore } from '@/stores'
import sqlToolToolRequest from '../service'
import { ElNotification } from 'element-plus'
import { saveAs } from 'file-saver';
import { stringifyQuery } from 'vue-router';

const store = mainStore()

const generateData = () => {

    return store.workOrderList.map((item) => {
        const flag = item.testStatus == 1 ? false : true
        return {
            key: item.id,
            label: item.name,
            disabled: flag
        }
    })


}

function downloadTxtFile(content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'export.sql');
}

const handleExport = () => {

    if (rightList.value == null || rightList.value.length == 0) {
        alert("Please select at least one workorder")
        return
    }

    sqlToolToolRequest.request({
        url: '/api/export/workorders',
        method: 'post',
        data: rightList.value,
        interceptors: {
            responseInterceptor(res) {
                downloadTxtFile(res.data.data.join(""));
                return res
            },
        }
    })
}




const leftList = ref(generateData())
const rightList = ref([])

</script>

