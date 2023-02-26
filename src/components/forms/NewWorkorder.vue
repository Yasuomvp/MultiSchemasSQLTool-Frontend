<template>
    <el-form ref="WoFormRef" :model="WoForm" label-width="150">
        <el-form-item label="Workorder Name:" prop="name">
            <el-input v-model="WoForm.name" style="width:215px" />
        </el-form-item>
        <el-form-item label="Datasource:">
            <el-select v-model="WoForm.datasource" placeholder="please select datasource">
                <el-option v-for="item, index in store.dataSourceList" :key="index" :value="item.id"
                    :label="item.id + ' : ' + item.name"></el-option>
            </el-select>
        </el-form-item>





        <el-form-item :label="'Script ' + index" v-for="(item, index) in WoForm.scripts">
            <el-main style="border-radius: 20px">
                <el-input v-model="item.value.schemas" autosize type="textarea"
                    placeholder="Please input schemas,split with command" />
                <el-input v-model="item.value.sqlContent" autosize type="textarea"
                    placeholder="Please enter sql separated by semicolons" />
                <el-button type="danger" class="mt-2" @click.prevent="removeScript(item)">Delete</el-button>
            </el-main>
        </el-form-item>

        <el-form-item>
            <el-button type="success" >Submit</el-button>
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

interface ScriptItem {
    key: number,
    value: {
        schemas: string,
        sqlContent: string,
    }
}

const store = mainStore()
const WoFormRef = ref<FormInstance>()

const WoForm = reactive({
    name: '',
    datasource: null,
    scripts: [
        {
            key: 1,
            value: {
                schemas: '',
                sqlContent: ''
            },
        },
    ]
})

const addScript = () => {
    WoForm.scripts.push({
        key: Date.now(),
        value: {
            schemas: '',
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

</script>
