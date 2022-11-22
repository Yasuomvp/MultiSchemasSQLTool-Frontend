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

interface State {
    dataSourceList: DatasourceInfo[]

  }

export const mainStore = defineStore('main',{
    state:() : State =>{
        return {
            dataSourceList:[]
        }
    },
    getters:{},
    actions:{}
})



