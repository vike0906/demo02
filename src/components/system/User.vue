<template>
  <div class="template">
    <a-row>
      <a-col :span="24" style="text-align: left;padding: .5rem;">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>系统管理</a-breadcrumb-item>
          <a-breadcrumb-item>用户管理</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <div class="content">
      <!-- <div style="height: 8px;padding-top: 3px;"><hr></div> -->
      <a-row>
        <a-col :span="24">
          <a-table
            :columns="columns"
            :dataSource="data"
            rowKey="id"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :scroll="scroll"
            bordered
          >
            <div slot="title">
              <a-row class="option" type="flex" justify="space-between" align="middle">
                <a-col :span="4" style="text-align: left;">
                  <div v-if="screenSize<639">
                    <a-button icon="user-add" shape="circle" @click="showAddUserModal"></a-button>
                  </div>
                  <div v-else>
                    <a-button icon="user-add" @click="showAddUserModal">新增</a-button>
                  </div>
                </a-col>
                <a-col :xs="20" :sm="18" :md="12" :lg="7" :xl="5" style="text-align: right;">
                  <a-input-search
                    placeholder="用户姓名/登陆名"
                    style="width: 200px"
                    v-model="queryStr"
                    @search="onSearch"
                  />
                </a-col>
              </a-row>
            </div>
            <div slot="action" slot-scope="text, record" style="text-align: center">
              <a-button icon="edit" @click="editUser(record.id)" size="small">编辑</a-button>
              <a-button type="danger" icon="delete" @click="deleteUser(record.id)" size="small">删除</a-button>
            </div>
            <div slot="status" slot-scope="text">
              <span v-if="text==1" style="color:green;">正常</span>
              <span v-else style="color:red;">禁用</span>
            </div>
            <div slot="createTime" slot-scope="text, record">
              <span>{{record.createTime|formatDateTime}}</span>
            </div>
          </a-table>
        </a-col>
      </a-row>
      <a-modal
        :title="modalTitle"
        :visible="visible"
        @ok="saveUser"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        cancelText="取消"
        :okText="okText"
        okType="primary"
        :destroyOnClose="true"
      >
        <a-row>
          <a-col
            :xs="{span: 24, offset:0}"
            :sm="{span: 24, offset:0}"
            :md="{span: 24, offset:0}"
            :lg="{span: 23, offset:1}"
            :xl="{span: 22, offset:2}"
          >
            <a-form :form="form">
              <a-form-item label="用户名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="['name', { rules: [{ required: true, message: '请输入用户名称' }] }]"
                  type="text"
                  placeholder="输入用户名称"
                />
              </a-form-item>
              <a-form-item label="登陆名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="['loginName', { rules: [{ required: true, message: '请输入登陆名称' }] }]"
                  type="text"
                  placeholder="输入登陆名称"
                />
              </a-form-item>
              <a-form-item label="用户角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-select
                  v-decorator="[ 'roleId', { rules: [{ required: true, message: '请选择用户角色' }] }, ]"
                  placeholder="选择用户角色"
                >
                  <a-select-option value="1">管理员</a-select-option>
                  <a-select-option value="2">普通用户</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="用户状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-select
                  v-decorator="[ 'status', { rules: [{ required: true, message: '请选择用户状态' }] }, ]"
                  placeholder="选择用户状态"
                >
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">冻结</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-modal>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/system";
import { formatDateTime } from "@/utils/util";
const columns = [
  {
    title: "用户名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "登录名",
    dataIndex: "loginName",
    key: "loginName"
  },
  {
    title: "用户角色",
    dataIndex: "role.name",
    key: "role.name"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "创建时间",
    width: "15%",
    dataIndex: "createTime",
    sorter: true,
    key: "createTime",
    scopedSlots: { customRender: "createTime" }
  },
  {
    title: "操作",
    width: "15%",
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      data: [],
      pagination: {
        defaultPageSize: 15,
        showTotal: total => `共 ${total} 条数据`
      },
      loading: false,
      columns,
      queryStr: "",
      modalTitle: "",
      okText: "",
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this, { name: "saveUser" })
    };
  },
  computed: {
    scroll: function() {
      let screenSize = this.$store.getters.getScreenSize;
      if (screenSize <= 1000) {
        return { x: 1000, y: 0 };
      } else {
        return { x: 0, y: 0 };
      }
    },
    screenSize: function() {
      return this.$store.getters.getScreenSize;
    }
  },
  methods: {
    saveUser(){
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = { name: values.name, loginName: values.loginName, roleId: values.roleId,status: values.status};
          console.log(params);
          api.saveUser(params).then(response=>{
            if(response){
              if(response.code==0){
                this.visible = true;
                this.$message.success(response.message);
              }
            }
          }).catch(err=>{
            console.log(err);
          });
        }
      });
      this.confirmLoading = false;
    },
    showAddUserModal() {
      this.modalTitle = '新增用户';
      this.okText = '确认新增';
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleTableChange: function(pagination, filters, sorter) {
      let queryStr = this.queryStr ? this.queryStr : null;
      let limit = pagination.pageSize ? pagination.pageSize : null;
      let pageNo = pagination.current ? pagination.current : null;
      let order = sorter.field ? sorter.field : null;
      let direction = sorter.order ? sorter.order : null;
      let params = {
        queryStr: queryStr,
        order: order,
        direction: direction,
        pageNo: pageNo,
        limit: limit
      };
      this.getUsers(params);
    },
    onSearch() {
      let queryStr = this.queryStr ? this.queryStr : null;
      let params = { queryStr: queryStr, limit: 15 };
      this.getUsers(params);
    },
    getUsers(params) {
      this.loading = true;
      api
        .getUsers(params)
        .then(response => {
          if (response) {
            if (response.code == 0) {
              this.data = response.content.content;
              this.pagination.total = response.content.totalElements;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.loading = false;
    },
    editUser: function(id) {
      console.log(id);
    },
    deleteUser: function(id) {
      console.log(id);
    }
  },
  created() {
    this.getUsers();
  },
  filters: {
    formatDateTime: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatDateTime(date);
      } else {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 5px;
}
.template {
  width: 100%;
  height: 100%;
}
</style>