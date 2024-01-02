<script setup lang="ts">
import roleHttp from '@/service/roleController/roleHttp'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

/**
 * 初始化查询参数
 */
function initSearchParams(): { rolename: string; pageNum: number; pageSize: number } {
  return {
    rolename: '',
    pageNum: 1,
    pageSize: 10
  }
}
const total = ref(0)

// 查询参数
const searchForm = reactive({
  ...initSearchParams()
})

// 表格数据
const tableData = ref([])

// 渲染表格
const renderTable = async () => {
  const params = {
    ...searchForm
  }
  // 调用接口获取数据
  const result = await roleHttp.getRoleList(params)
  tableData.value = result.data
  total.value = result.total
}

// 查询
const handleSearch = () => {
  searchForm.pageNum = 1
  searchForm.pageSize = 10
  renderTable()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, initSearchParams())
  renderTable()
}

// 表格勾选中的数据
let selectData: any[] = []

// 表格复选框变化
const handleTableCheckbox = (selection: any) => {
  selectData = selection
}

// 删除
const handleDeleteBatch = () => {
  if (selectData.length === 0) {
    ElMessage.warning('请选择要删除的数据')
    return
  }

  deleteData(selectData.map((item: any) => item.id))
}

const deleteData = async (ids: number[]) => {
  await roleHttp.deleteRole(ids)
  ElMessage.success('删除成功')
  renderTable()
}

;(() => {
  // 渲染表格
  renderTable()
})()

/**
 * 监听分页
 */
watch([() => searchForm.pageNum, () => searchForm.pageSize], () => renderTable())

const dialogVisible = ref(false)

/**
 * 弹出框关闭之前做的事情
 */
const handleClose = (done: () => void) => {
  // 重置表单
  formEl.value?.resetFields()
  Object.assign(formModel, initFormModel())

  // 关闭弹框
  done()
}

let dialogTitle = '新增角色'
const formEl = ref<FormInstance | null>(null)

/**
 * form表单初始化
 */
function initFormModel(): { id: null | number; rolename: string; remark: string } {
  return {
    id: null,
    rolename: '',
    remark: ''
  }
}

const formModel = reactive({ ...initFormModel() })

/**
 * 新增或保存执行的方法
 */
const handleSaveOrUpdate = async () => {
  // 校验
  if (formModel.rolename == '') {
    ElMessage.warning('角色名称不能为空')
    return
  }

  await roleHttp.saveOrUpdateRole(formModel)
  ElMessage.success('保存成功')

  // 重新渲染表格
  renderTable()

  // 重置表单
  // Object.assign(formModel, initFormModel())
  // formEl.value?.resetFields()
  // // 关闭弹框
  // dialogVisible.value = false
  closeModel()
}

/**
 * 新增或编辑按钮
 */
const handleAddOrUpdateBtn = (title: string, rowInfo?: any) => {
  dialogTitle = title

  if (rowInfo) {
    Object.assign(formModel, rowInfo)
  }

  dialogVisible.value = true
}

const closeModel = () => {
  formEl.value?.resetFields()
  Object.assign(formModel, initFormModel())
  dialogVisible.value = false
}
</script>
<template>
  <div class="container role_container">
    <div style="padding: 18px 18px 0; box-sizing: border-box" class="card">
      <el-form :model="searchForm">
        <div
          style="
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-gap: 0 20px;
          "
        >
          <el-form-item label="角色名称：">
            <el-input v-model="searchForm.rolename" placeholder="角色名称" clearable />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="global_line"></div>
    <div
      style="
        box-sizing: border-box;
        padding: 20px;
        overflow-x: hidden;
        border-radius: 6px;
        flex: 1;
        display: flex;
        flex-direction: column;
      "
    >
      <div class="table_header">
        <el-button type="primary" @click="handleAddOrUpdateBtn('角色新增')">新增</el-button>
        <el-button type="danger" @click="handleDeleteBatch">删除</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1"
        header-row-class-name="table_header_row"
        header-cell-class-name="table_header_cell"
        row-class-name="table_row"
        @selection-change="handleTableCheckbox"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" prop="id" label="角色id" />
        <el-table-column align="center" prop="rolename" label="角色名称" />
        <el-table-column align="center" prop="remark" label="备注" />
        <el-table-column align="center" prop="createTime" label="创建时间" />
        <el-table-column align="center" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click.prevent="handleAddOrUpdateBtn('编辑角色', scope.row)"
            >
              编辑
            </el-button>
            <span style="color: #ebeef5">|</span>
            <el-button link type="danger" @click.prevent="deleteData([scope.row.id])">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_continer">
        <el-pagination
          v-model:current-page="searchForm.pageNum"
          v-model:page-size="searchForm.pageSize"
          background
          :total="total"
          layout="prev, pager, next,total, sizes"
        />
      </div>
    </div>

    <!-- 新增编辑弹出框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="handleClose">
      <div>
        <el-form :model="formModel" ref="formEl">
          <el-form-item
            prop="rolename"
            label="角色名称"
            label-width="100px"
            :rules="{
              required: true,
              message: '角色名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="formModel.rolename"
              autocomplete="off"
              placeholder="请输入角色名称"
            />
          </el-form-item>
          <el-form-item label="备注" label-width="100px" prop="remark">
            <el-input
              v-model="formModel.remark"
              type="textarea"
              autocomplete="off"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeModel">取消</el-button>
          <el-button type="primary" @click="handleSaveOrUpdate"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.role_container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .card {
    box-sizing: border-box;
    overflow-x: hidden;
    border-radius: 6px;
  }

  .table_header {
    height: 47px;
  }

  .page_continer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 32px;
  }
}
</style>
