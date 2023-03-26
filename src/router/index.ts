import { createRouter, createWebHistory } from 'vue-router'
import SqlPageVue from '@/components/SqlPage.vue'
import NewDatasourceVue from '@/components/forms/NewDatasource.vue'
import DatasourceManageVue from '@/views/DatasourceManage.vue'
import WorkOrderManageVue from '@/views/WorkOrderManage.vue'
import LogManageVue from '@/views/LogManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sqlPage',
      name: 'sqlPage',
      component: SqlPageVue,
    },
    {
      path: '/workOrderManage',
      name: 'workOrderManage',
      component: WorkOrderManageVue
    },
    {
      path: '/datasourceManage',
      name: 'datasourceManage',
      component: DatasourceManageVue
    },
    {
      path: '/logManage',
      name: 'logManage',
      component: LogManageVue
    },

  ]
})

export default router