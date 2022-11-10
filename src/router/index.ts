import { createRouter, createWebHistory } from 'vue-router'
import SqlPageVue from '@/components/SqlPage.vue'
import NewDatasourceVue from '@/components/forms/NewDatasource.vue'
import DatasourceManageVue from '@/views/DatasourceManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sqlPage',
      name: 'sqlPage',
      component: SqlPageVue,
    },
    {
      path: '/newDatasource',
      name: 'newDatasource',
      component: NewDatasourceVue
    },
    {
      path: '/datasourceManage',
      name: 'datasourceManage',
      component: DatasourceManageVue
    },

  ]
})

export default router