<template>
  <div style="margin-top: 20px; margin-bottom: 20px; margin-left: 20px; margin-right: 20px;">
    <!-- 表单部分 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" @click="handleCreate">新建用户</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="180" />
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column label="管理员" width="180">
        <template v-slot="scope">
          <el-checkbox v-model="scope.row.isadmin" @change="toggleAdmin(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="openEditPasswordDialog(scope.row)">修改密码</el-button>
          <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 创建用户的对话框 -->
    <el-dialog title="创建新用户" :visible.sync="createDialogVisible">
      <el-form :model="newUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="newUser.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="newUser.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-checkbox v-model="newUser.is_admin" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="editPasswordDialogVisible">
      <el-form :model="editPasswordForm">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="editPasswordForm.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editPassword">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsers, deleteUser, createUser, updateIsAdmin, resetpassword } from '@/api/user'

export default {
  data() {
    return {
      searchForm: {
        user: ''
      },
      tableData: [],
      createDialogVisible: false, // 控制创建用户对话框的显示
      editPasswordDialogVisible: false,
      newUser: { // 新用户的数据模型
        username: '',
        password: '',
        is_admin: false
      },
      editPasswordForm: {
        id: null,
        password: ''
      },
      formLabelWidth: '120px' // 表单标签宽度
    }
  },
  mounted() { // Correct order
    this.getAllUsersInfo() // 组件加载后获取所有用户信息
  },
  methods: {
    getAllUsersInfo() {
      getAllUsers().then(response => {
        this.tableData = response.data.map(user => ({
          id: user.id,
          name: user.username,
          isadmin: user.is_admin
        }))
      }).catch(error => {
        console.error('Error fetching users:', error)
        this.$message.error('无法获取用户信息')
      })
    },
    openEditPasswordDialog(row) {
      this.editPasswordForm.id = row.id
      this.editPasswordForm.password = ''
      this.editPasswordDialogVisible = true
    },
    editPassword() {
      // 调用 API 修改密码
      resetpassword(this.editPasswordForm.id, { password: this.editPasswordForm.password })
        .then(() => {
          this.$message.success('密码修改成功')
          this.editPasswordDialogVisible = false
        })
        .catch(error => {
          console.error('Error updating password:', error)
          this.$message.error('密码修改失败')
        })
    },
    remove(row) {
      // 删除逻辑
      deleteUser(row.id).then(() => {
        this.$message.success('用户删除成功')
        this.getAllUsersInfo() // 重新获取所有用户信息
      }).catch(error => {
        console.error('Error deleting user:', error)
        this.$message.error('删除用户失败')
      })
    },
    toggleAdmin(row) {
      // 调用 API 更新用户管理员状态
      updateIsAdmin(row.id, { is_admin: row.isadmin })
        .then(() => {
          this.$message.success('用户状态更新成功')
        })
        .catch(error => {
          console.error('Error updating user:', error)
          this.$message.error('用户状态更新失败')
          // 如果更新失败，恢复原来的状态
          row.isadmin = !row.isadmin
        })
    },
    handleCreate() {
      this.createDialogVisible = true // 显示创建用户的对话框
    },
    createUser() {
      // 此处应调用 API 创建用户
      createUser(this.newUser).then(response => {
        this.$message.success('用户创建成功')
        this.createDialogVisible = false // 关闭对话框
        this.getAllUsersInfo() // 重新加载用户列表
      }).catch(error => {
        console.error('Error creating user:', error)
        this.$message.error('创建用户失败')
      })
    }
  }
}
</script>

<style>

</style>
