<template>
  <div class="header-user-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Users Management</span>
        <el-button
          size="mini"
          type="success"
          @click="$emit('open:dialog', 'Add user')"
          >+ Add user</el-button
        >
      </div>
      <el-row :gutter="20">
        <el-form :model="form" ref="form" :rules="rules">
          <el-col :span="4">
            <el-form-item prop="gender" label="Gender">
              <el-select
                v-model="form.gender"
                placeholder="Gender"
                class="fill-width"
              >
                <el-option
                  v-for="gender in genders"
                  :key="gender.value"
                  :label="gender.label"
                  :value="gender.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="department" label="Department">
              <el-select
                v-model="form.department"
                placeholder="Department"
                class="fill-width"
              >
                <el-option
                  v-for="department in listDepartments"
                  :key="department.value"
                  :label="department.label"
                  :value="department.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="position" label="Position">
              <el-select
                v-model="form.position"
                placeholder="Position"
                class="fill-width"
              >
                <el-option
                  v-for="position in listPositions"
                  :key="position.value"
                  :label="position.label"
                  :value="position.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="action">
              <el-button class="fill-width" type="primary" @click="onSearch()"
                >Search</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="action">
              <el-button
                class="fill-width"
                type="warning"
                plain
                @click="resetForm"
                >Reset</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="action">
              <el-button
                class="fill-width"
                plain
                @click="isShowExpand = !isShowExpand"
              >
                Toggle Filter</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card class="box-card" v-if="isShowExpand">
      <el-row :gutter="20">
        <el-form :model="formName" ref="formName">
          <el-col :span="4">
            <el-form-item label="Name" prop="name">
              <el-input v-model="formName.name" placeholder="Name" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {
  Departments,
  Genders,
  Postions,
  Rules,
} from "../models/users-management.model";
export default {
  name: "HeaderUsersManagement",
  data() {
    return {
      genders: Genders,
      listPositions: Postions,
      listDepartments: Departments,
      form: {
        gender: null,
        department: null,
        position: null,
      },
      formName: {
        name: "",
      },
      rules: Rules,
      isShowExpand: false,
    };
  },

  props: {},

  methods: {
    onSearch() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("filter:listUsers", this.form);
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs["form"].resetFields();
      this.$refs["formName"].resetFields();
      this.$emit("resetForm");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-user-management {
  .box-card {
    border: none;
    border-radius: 0;
    .clearfix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
    }
    .action {
      margin-top: 40px;
    }
  }
}
</style>
