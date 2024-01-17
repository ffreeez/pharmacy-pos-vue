<template>

  <div style="margin-top: 20px; margin-bottom: 20px; margin-left: 20px; margin-right: 20px;">

    <el-form :inline="true" :model="searchForm" class="demo-form-inline">

      <el-form-item label="">
        <el-input v-model="searchForm.id" placeholder="请输入要查询的药品id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAlldrugsInfo">返回</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleCreate">添加药品</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="50" />
      <el-table-column prop="name" label="药品名" width="200" />
      <el-table-column prop="description" label="描述" width="180" />
      <el-table-column prop="category" label="类别名称" width="100" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="inventory" label="库存" width="100" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="openEditPasswordDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :before-close="handleClose" @close="resetForm">
      <el-form :model="form" label-width="120px">
        <el-form-item label="药品名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model.number="form.price" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model.number="form.inventory" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { getAllDrugs, getDrug, updateDrug, deleteDrug, createDrug } from '@/api/drug'
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        id: ''
      },
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        description: '',
        category: '',
        price: '',
        inventory: ''
      },
      createDialogVisible: false, // 控制创建用户对话框的显示
      dialogTitle: '', // 对话框的标题
      isCreating: false // 是否正在创建药品
    }
  },
  mounted() {
    this.getAlldrugsInfo() // 组件加载后获取所有药品信息
  },
  methods: {

    getAlldrugsInfo() {
      getAllDrugs().then(response => {
        this.tableData = response.data.map(drug => ({
          id: drug.id,
          name: drug.name,
          description: drug.description,
          category: drug.categoryname,
          categoryid: drug.categoryid,
          price: drug.price,
          inventory: drug.inventory
        }))
      }).catch(error => {
        console.error('Error fetching drugs:', error)
        this.$message.error('无法获取药品信息')
      })
    },

    remove(row) {
      // 删除逻辑
      deleteDrug(row.id).then(() => {
        this.$message.success('药品删除成功')
        this.getAlldrugsInfo() // 重新获取所有用户信息
      }).catch(error => {
        console.error('Error deleting drug:', error)
        this.$message.error('删除药品失败')
      })
    },

    onSubmit() {
      const id = this.searchForm.drugid
      getDrug(id).then(response => {
        // 将获取到的药品信息放入表格中
        this.tableData = [response.data].map(drug => ({
          id: drug.id,
          name: drug.name,
          description: drug.description,
          category: drug.categoryname,
          price: drug.price,
          inventory: drug.inventory
        }))
      }).catch(error => {
        console.error('Error fetching user:', error)
        this.$message.error('无法获取药品信息')
      })
    },
    openEditPasswordDialog(row) {
      this.form = Object.assign({}, row)
      this.dialogVisible = true
      this.dialogTitle = '编辑药品信息'
      this.isCreating = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    resetForm() {
      this.form = {
        id: '',
        name: '',
        description: '',
        category: '',
        price: '',
        inventory: ''
      }
    },
    submitForm() {
      if (this.isCreating) {
        createDrug(this.form).then(() => {
          this.$message.success('药品创建成功')
          this.getAlldrugsInfo()
          this.dialogVisible = false
        }).catch(error => {
          console.error('Error creating drug:', error)
          this.$message.error('创建药品失败')
        })
      } else {
        updateDrug(this.form).then(() => {
          this.$message.success('药品信息更新成功')
          this.getAlldrugsInfo()
          this.dialogVisible = false
        }).catch(error => {
          console.error('Error updating drug:', error)
          this.$message.error('更新药品信息失败')
        })
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogVisible = true
      this.dialogTitle = '创建新药品'
      this.isCreating = true
    }
  }
}
</script>
