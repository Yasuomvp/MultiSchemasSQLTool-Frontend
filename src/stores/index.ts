import { defineStore } from "pinia";

interface DatasourceInfo {
    id: number,
    name: string,
    host: string,
    port: number,
    sid: string,
    username: string,
    password: string,
    url: string
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
    devStatus: number,
    scripts: Script,
    datasource: Datasource
}

interface State {
    dataSourceList: DatasourceInfo[]
    workOrderList: WorkOrder[]

  }

export const mainStore = defineStore('main',{
    state:() : State =>{
        return {
            dataSourceList:[],
            workOrderList:[]
        }
    },
    getters:{},
    actions:{}
})



