<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <span style="font-size: medium">创建竞赛</span>
        <el-button style="float: right;margin: 10px" type="warning">保存草稿</el-button>
        <el-button style="float: right;margin: 10px" type="success">发布</el-button>
      </el-card>
    </el-row>

    <el-row  style="margin-top:50px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1.竞赛基本信息</span>

        </div>
        <div class="component-item" style="height:300px;">
          <el-row :gutter="20">
            <el-col :span="6" class="baseInfo-item">竞赛类别：
              <el-select  placeholder="类型" clearable  style="width: 220px">
              <!--<el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />-->
            </el-select></el-col>
            <el-col :span="6" class="baseInfo-item">竞赛名称：<el-input placeholder="竞赛类别" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">举办时间：
              <el-date-picker
              style="width: 220px"
              class="filter-item"
              type="datetime"
              placeholder="举办时间">
            </el-date-picker>
            </el-col>
            <el-col :span="6" class="baseInfo-item">举办地点：<el-input placeholder="竞赛类别" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">领队会时间：
              <el-date-picker
                style="width: 220px"
                class="filter-item"
                type="datetime"
                placeholder="领队会时间">
              </el-date-picker>
            </el-col>
            <el-col :span="6" class="baseInfo-item">领队会地点：<el-input placeholder="领队会地点" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">领队数量：<el-input placeholder="领队数量" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">教练数量：<el-input placeholder="教练数量" style="width: 220px;"/></el-col>

          </el-row>
        </div>
      </el-card>
    </el-row>

    <el-row  style="margin-top:50px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>2.项目报名与要求</span>
          </div>
          <el-button icon="el-icon-plus" style="margin: 10px" type="primary">添加</el-button>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="项目" >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="组别" >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="年龄要求" >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量要求" >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </el-row>

    <el-row style="margin-top:50px;">
      <el-card class="box-card" style="height: 450px">
        <div slot="header" class="clearfix">
          <span>3.注意事项</span>
        </div>
        <el-input
          style="margin-bottom: 10px"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          >
        </el-input>
        <el-upload
          style="margin-bottom: 10px;height:200px"

          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">文件大小不超过500kb</div>
        </el-upload>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import PanThumb from '@/components/PanThumb'
  import MdInput from '@/components/MDinput'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import DropdownMenu from '@/components/Share/DropdownMenu'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'ComponentMixinDemo',
    components: {
      PanThumb,
      MdInput,
      Mallki,
      DropdownMenu,
    },
    directives: {
      waves
    },
    data() {
      const validate = (rule, value, callback) => {
        if (value.length !== 6) {
          callback(new Error('请输入六个字符'))
        } else {
          callback()
        }
      }
      return {
        tableKey: 0,
        list: null,
        listLoading:false,
        demo: {
          title: ''
        },
        demoRules: {
          title: [{ required: true, trigger: 'change', validator: validate }]
        },
        articleList: [
          { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
          { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
          { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
          { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
          { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
          { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' }
        ]
      }
    }
  }
</script>

<style scoped>
  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }
  .component-item{
    min-height: 100px;
  }
  .baseInfo-item{
    padding-bottom: 40px;
  }
</style>
