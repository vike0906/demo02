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
      <a-row>
        <a-col :span="24">
          <a-table
            :columns="columns"
            :dataSource="data"
            rowKey="id"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :scroll="{ x: true, y: 0 }"
            bordered
          >
              <div slot="action" slot-scope="text, record" style="text-align: center">
                <a-button  icon="edit" @click="editUser(record.id)">编辑</a-button>
              <a-button type="danger" icon="delete" @click="deleteUser(record.id)">删除</a-button>
              </div>
              <div slot="status" slot-scope="text">
                <span v-if="text==1" style="color=green">正常</span>
                <span v-else style="color=red">禁用</span>
              </div>
              
          </a-table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/system";
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
    dataIndex: "createTime",
    sorter: true,
    key: "createTime"
  },
  {
    title: "操作",
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
      columns
    };
  },
  methods: {
    handleTableChange: function(pagination, filters, sorter) {
      console.log(pagination.pageSize);
      console.log(pagination.current);
      console.log(sorter.field);
      console.log(sorter.order);
      let params = {};
      this.getUsers(params);
      
    },
    getUsers(params){
      this.loading = true;
      api.getUsers(params).then(
        response=>{
          if (response) {
                if (response.code == 0) {
                  console.log(response.content);
                  this.data = response.content.content;
                  this.pagination.total = response.content.totalElements;
                }
              }
        }
      ).catch(err => {
              console.log(err);
            });
      this.loading = false;
    }
    ,
    editUser:function(id){
      console.log(id);
    },
    deleteUser:function(id){
      console.log(id);
    }
  },
  mounted(){
    this.getUsers();
  },
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