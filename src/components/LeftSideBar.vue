<template>
    <el-aside>
        <el-menu router>
                <el-menu-item index="sqlPage">
                    <el-icon>
                        <icon-menu />
                    </el-icon>
                    <span>SQL Execute</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>Work Order Management</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>DataSource Management</span>
                </el-menu-item>
            </el-menu>
    </el-aside>
</template>

<style>
.el-menu{
    height:100vh
}
</style>