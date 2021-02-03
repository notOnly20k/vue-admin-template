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
              <el-select  placeholder="类型" v-model="baseData.type" clearable  style="width: 220px">
              <el-option v-for="item in types" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
            <el-col :span="6" class="baseInfo-item">竞赛名称：<el-input v-model="baseData.name" placeholder="竞赛类别" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">举办时间：
              <el-date-picker
              style="width: 220px"
              class="filter-item"
              v-model="baseData.time"
              type="datetime"
              placeholder="举办时间">
            </el-date-picker>
            </el-col>
            <el-col :span="6" class="baseInfo-item">举办地点：<el-input v-model="baseData.address" placeholder="举办地点" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">领队会时间：
              <el-date-picker
                style="width: 220px"
                class="filter-item"
                v-model="baseData.leader_time"
                type="datetime"
                placeholder="领队会时间">
              </el-date-picker>
            </el-col>
            <el-col :span="6" class="baseInfo-item">领队会地点：<el-input v-model="baseData.leader_address" placeholder="领队会地点" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">领队数量：<el-input v-model="baseData.leader_number" placeholder="领队数量" style="width: 220px;"/></el-col>
            <el-col :span="6" class="baseInfo-item">教练数量：<el-input v-model="baseData.coach_number" placeholder="教练数量" style="width: 220px;"/></el-col>

          </el-row>
        </div>
      </el-card>
    </el-row>

    <el-row  style="margin-top:50px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>2.项目与报名要求</span>
          </div>
          <el-button icon="el-icon-plus" style="margin: 10px" type="primary" @click="handleCreate">添加</el-button>
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
          v-model="baseData.tips"
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

    <el-dialog title="组别管理" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label="组别:" prop="zb">
          <el-input placeholder="组别名称" v-model="temp.name" style="width: 150px;margin-right: 20px;"/>
          <el-select  placeholder="选择年级" v-model="temp.grade1" clearable  style="width: 150px;margin-right: 20px;">
            <el-option v-for="item in grades" :key="item" :label="item" :value="item" />
          </el-select>
          至
          <el-select  placeholder="选择年级" v-model="temp.grade2" clearable  style="width: 150px;margin-right: 20px;margin-left: 20px;">
            <el-option v-for="item in grades" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="类别:" prop="lb">
          <el-radio v-model="temp.type" label="1">个人</el-radio>
          <el-radio v-model="temp.type" label="2">团队</el-radio>
        </el-form-item>
        <el-form-item label="项目:" prop="xm">
          <el-checkbox-group v-model="temp.items">
            <el-checkbox :label="item" v-for="item in games"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别:" prop="xb">
          <el-checkbox-group v-model="temp.sexs">
            <el-checkbox label="男" ></el-checkbox>
            <el-checkbox label="女" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年龄:" prop="nl">
          <el-date-picker
            v-model="temp.age"
            type="daterange"
            range-separator="至"
            start-placeholder="时间下限"
            end-placeholder="时间上限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量:" prop="sl">

          <div v-if="temp.type==1">
          最少<el-input placeholder="" v-model="temp.min_people" style="width:79px;margin: 10px"/>人，
          最多<el-input v-model="temp.max_people" style="width:79px;margin: 10px"/>人<br>
          每人限报<el-input v-model="temp.max_item" style="width:79px;margin: 10px"/>项，
          每项每校限报<el-input v-model="temp.mrmx" style="width:79px;margin: 10px"/>人
          </div>
          <template v-if="temp.type==2">
          各校参赛队最多<el-input v-model="temp.max_team" style="width:79px;margin: 10px"/>队;<br>
          每队最多<el-input v-model="temp.max_people" style="width:79px;margin: 10px"/>人，
          最少<el-input v-model="temp.min_people" style="width:79px;margin: 10px"/>人<br>
            <template v-if="temp.sexs.length==2">
              男生<el-input v-model="temp.max_man" style="width:79px;margin: 10px" />人，
              女生<el-input v-model="temp.max_woman" style="width:79px;margin: 10px" />人<br>
              男生至少<el-input v-model="temp.min_man" style="width:79px;margin: 10px" />人，
              女生至少<el-input v-model="temp.min_woman" style="width:79px;margin: 10px" />人
            </template>
          </template>
        </el-form-item>
        <el-form-item label="属性:" prop="sx" v-if="temp.type==2">
          <el-checkbox-group v-model="temp.attributes">
            <el-checkbox label="必须参加" ></el-checkbox>
            <el-checkbox label="可以上升组" ></el-checkbox>
            <el-checkbox label="可以窜组" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="upload">
          确认
        </el-button>
      </div>
    </el-dialog>
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
      };
      return {
        tableKey: 0,
        list: null,
        listLoading:false,
        dialogFormVisible: false,
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        grades:["一年级","二年级","三年级","四年级","五年级","六年级",],
        games:["乒乓球","跆拳道","100米赛跑","400米赛跑","1000米赛跑","跳高","跳远","200米游泳",],
        types:["乒乓球","跆拳道","赛跑","跳高","跳远","游泳",],
        baseData:{
          type:"",
          name:"",
          time:"",
          address:"",
          leader_time:"",
          leader_address:[],
          leader_number:"",
          coach_number:"",
          tips:"",
          file_url:"",
        },
        temp: {
          id: undefined,
          name: '',
          grade1: '',
          grade2: '',
          type: '1',
          items: [],
          sex: '1',
          age:'',
          max_people:'',
          min_people:'',
          max_item:'',
          max_team:'',
          max_man:'',
          min_man:'',
          max_woman:'',
          min_woman:'',
          mrmx:'',
          attributes:[],
          sexs:[],
        },
      }
    },
    methods:{
      handleCreate() {
        this.resetTemp()
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      upload(){
        console.log(this.temp)
      },
      resetTemp(){
        this.temp= {
          id: undefined,
          name: '',
          grade1: '',
          grade2: '',
          type: '1',
          items: [],
          sex: '1',
          age:'',
          max_people:'',
          min_people:'',
          max_item:'',
          max_team:'',
          max_man:'',
          min_man:'',
          max_woman:'',
          min_woman:'',
          mrmx:'',
          attributes:[],
          sexs:[],
        }
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
