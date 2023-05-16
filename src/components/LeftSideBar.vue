<template>
    <el-aside>
        <el-menu router>
            <el-menu-item index="sqlPage">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>SQL Execute</span>
            </el-menu-item>
            <el-menu-item index="workOrderManage">
                <el-icon>
                    <document />
                </el-icon>
                <span>Workorder Management</span>
            </el-menu-item>
            <el-menu-item index="datasourceManage">
                <el-icon>
                    <setting />
                </el-icon>
                <span>DataSource Management</span>
            </el-menu-item>
            <el-menu-item index="logManage">
                <el-icon>
                    <setting />
                </el-icon>
                <span>Log Management</span>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>SQL File Export</span>
                </template>
                <el-menu-item index="byWorkOrder">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>By Workorder</span>
                </el-menu-item>
                <el-menu-item index="byTimeRange">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>By Timerange</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<style>
.el-menu {
    height: 100vh
}
</style>