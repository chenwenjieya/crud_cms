<script setup lang="ts">
import roleHttp from '@/service/roleController/roleHttp'
import userHttp from '@/service/userController/userHttp'
import { ElTree, ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
interface Tree {
  [key: string]: any
}

let roleId = ref<number | null>(null)

// 树结构的数据
const treeData = ref<[{ children: any; rolename: string; id: number }]>([
  {
    children: [],
    rolename: '角色列表',
    id: 0
  }
])

// 渲染树结构
const renderTree = async () => {
  const params = {
    rolename: '',
    pageNum: 1,
    pageSize: 100
  }
  // 调用接口获取数据
  const result = await roleHttp.getRoleList(params)
  treeData.value[0].children = result.data

  nextTick(() => {
    treeRef.value?.setCurrentKey(result.data[0].id)
    var currentId = treeRef.value?.getCurrentKey()
    roleId.value = currentId
    renderTable()
  })
  // treeRef.value?.setCurrentNode(result.data[0].id);
}
renderTree()

const handleTreeClick = (node: any) => {
  // 处理树结构的点击事件
  roleId.value = node.id
  renderTable()
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'rolename'
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.rolename.includes(value)
}

/**
 * 初始化查询参数
 */
function initSearchParams(): { username: string; pageNum: number; pageSize: number } {
  return {
    username: '',
    pageNum: 1,
    pageSize: 10
  }
}

const total = ref(0)

const searchForm = reactive({
  ...initSearchParams()
})

// 查询
const handleSearch = () => {
  searchForm.pageNum = 1
  renderTable()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, initSearchParams())
  renderTable()
}

const tableData = ref([])

// 渲染表格
const renderTable = async () => {
  const params = {
    roleId: roleId.value,
    ...searchForm
  }
  const result = await userHttp.getUserListByRoleId(params)
  tableData.value = result.data
  total.value = result.total
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
  deleteData(selectData.map((item) => item.id))
}

const deleteData = async (ids: number[]) => {
  await userHttp.deleteUser(ids)
  ElMessage.success('删除成功')
  renderTable()
}

/**
 * 新增或者编辑按钮
 */
let dialogTitle: string = '新增用户'
const dialogVisible = ref(false)
const handleAddOrUpdateBtn = (title: string, row?: any) => {
  dialogTitle = title
  if (row) {
    Object.assign(formModel, row)
  }
  dialogVisible.value = true
}

/**
 * 初始化表单
 */
function initFormModel(): {
  id: number | null
  username: string
  password: string
  status: number
  roleId: number | null
} {
  return {
    id: null,
    username: '',
    password: '',
    status: 1,
    roleId: roleId.value
  }
}

const formEl = ref<FormInstance | null>(null)

const formModel = reactive({
  ...initFormModel()
})

const handleClose = (done: () => void) => {
  // 重置表单
  formEl.value?.resetFields()
  // 恢复原始数据(其实上一步就可以恢复原始数据，但是为了防止编辑之后在打开新增出现bug)
  // 编辑之后关闭弹框，resetFields方法会将表单重置成打开时候的样子
  Object.assign(formModel, initFormModel())
  done()
}
// form中的关闭按钮
const closeModel = () => {
  // 重置表单
  formEl.value?.resetFields()
  // 恢复原始数据
  Object.assign(formModel, initFormModel())
  dialogVisible.value = false
}

const handleSaveOrUpdate = async () => {
  formModel.roleId = roleId.value
  await userHttp.saveOrUpdateUser(formModel)
  ElMessage.success('保存成功')

  // 重新渲染表格
  renderTable()

  // 关闭弹框逻辑
  closeModel()
}
</script>

<template>
  <div class="container user_container">
    <div class="layout_left">
      <el-input class="filter_tree" v-model="filterText" placeholder="角色列表查询" />
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        node-key="id"
        @node-click="handleTreeClick"
        :filter-node-method="filterNode"
      />
    </div>
    <div style="width: 10px; background-color: #f0f2f5"></div>
    <div class="layout_right">
      <div class="search_container">
        <el-form :model="searchForm" ref="formEl">
          <div
            style="
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-gap: 0 20px;
            "
          >
            <el-form-item label="用户名：">
              <el-input v-model="searchForm.username" placeholder="用户名" clearable />
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
          <el-button type="primary" @click="handleAddOrUpdateBtn('新增用户')">新增</el-button>
          <el-button type="danger" @click="handleDeleteBatch">删除</el-button>
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
          <el-table-column align="center" prop="username" label="用户名" />
          <el-table-column align="center" prop="status" label="用户状态" />
          <el-table-column align="center" prop="createTime" label="创建时间" />
          <el-table-column align="center" prop="updateTime" label="修改时间" />
          <el-table-column align="center" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click.prevent="handleAddOrUpdateBtn('编辑用户', scope.row)"
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
    </div>

    <!-- 新增编辑弹出框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" :before-close="handleClose">
      <div>
        <el-form :model="formModel" ref="formEl">
          <el-form-item
            prop="username"
            label="用户名称"
            label-width="100px"
            :rules="{
              required: true,
              message: '用户名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="formModel.username"
              autocomplete="off"
              placeholder="请输入用户名称"
            />
          </el-form-item>

          <el-form-item
            prop="password"
            label="密码"
            label-width="100px"
            :rules="{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="formModel.password" autocomplete="off" placeholder="请输入密码" />
          </el-form-item>

          <el-form-item
            prop="status"
            label="状态"
            label-width="100px"
            :rules="{
              required: true,
              message: '状态不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="formModel.status" autocomplete="off" placeholder="请输入用户状态" />
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
.user_container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .layout_left {
    width: 220px;
    height: 100%;
    padding-right: 10px;

    .filter_tree {
      margin: 12px 0;
    }
  }

  .layout_right {
    flex: 1;
    padding-left: 12px;
    display: flex;
    flex-direction: column;

    .search_container {
      padding: 18px 18px 0;
      box-sizing: border-box;
      overflow-x: hidden;
      border-radius: 6px;
    }

    .table_header {
      height: 47px;
    }

    .page_continer {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      height: 32px;
    }
  }
}
</style>
