<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="赛事名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker
        class="filter-item"
        v-model="listQuery.endTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" style="width: 140px" class="filter-item" placeholder="状态">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建竞赛
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="赛事名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="举办时间地点" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}/{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领队会时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.leaderTime }}
        </template>
      </el-table-column>
      <el-table-column label="报名截至时间">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="报名情况">
        <template slot-scope="scope">
          {{ scope.row.registrationSchool }}
          {{ scope.row.registrationStudent }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button   v-if="checkPermission(['admin'])"  size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='已发布'" size="mini"  @click="handleModifyStatus(row,'published')">
            发布
          </el-button>
          <el-button  size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
          <el-button  size="mini"  @click="handleDelete(row,$index)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                :page-sizes="[5, 10, 15, 20]" @pagination="fetchData" />
  </div>
</template>

<script>
import { getList } from '@/api/gameManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        进行中: 'success',
        未发布: 'gray',
        已结束: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        title: undefined,
        type: undefined,
        endTime: undefined
      },
      statusOptions: ["进行中","未发布","已结束"],
      typeOptions: ["足球","篮球","乒乓球"]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate() {
      this.$router.push({path:'/createGame'})
    },
    handleUpdate(row) {

    },
    handleModifyStatus(row,status) {

    },
    handleDelete(row,index) {

    }
  }
}
</script>
