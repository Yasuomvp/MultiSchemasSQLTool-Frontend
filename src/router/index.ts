import { createRouter, createWebHistory } from 'vue-router'
import SqlPageVue from '@/components/SqlPage.vue'
import NewDatasourceVue from '@/components/forms/NewDatasource.vue'
import DatasourceManageVue from '@/views/DatasourceManage.vue'
import WorkOrderManageVue from '@/views/WorkOrderManage.vue'
import LogManageVue from '@/views/LogManage.vue'
import ByWorkOrderVue from '@/views/ByWorkorder.vue'
import ByTimeRangeVue from '@/views/ByTimeRange.vue'

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
    {
      path: '/byWorkOrder',
      name: 'byWorkOrder',
      component: ByWorkOrderVue
    },
    {
      path: '/byTimeRange',
      name: 'byTimeRange',
      component: ByTimeRangeVue
    }

  ]
})

export default router