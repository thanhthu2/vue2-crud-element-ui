<template>
  <el-dialog :title="title" :visible.sync="outerVisible">
    <el-row :gutter="20">
      <el-form :model="form" :rules="rules" ref="form">
        <el-col :span="12">
          <el-form-item prop="email" label="Email">
            <el-input
              v-model="form.email"
              placeholder="Email"
              maxlength="255"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phone" label="Phone Number">
            <el-input
              v-model="form.phone"
              placeholder="Telephone"
              maxlength="15"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item prop="dob" label="Date of birth">
            <el-date-picker
              class="fill-width"
              v-model="form.dob"
              type="date"
              placeholder="Date of birth"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item prop="name" label="Name">
            <el-input v-model="form.name" placeholder="Name" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="address" label="Adress">
            <el-input
              type="textarea"
              v-model="form.address"
              placeholder="Address"
              maxlength="255"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">Cancel</el-button>
      <el-button type="primary" :loading="loadingAction" @click="onSubmit()"
        >Save</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import {
  Departments,
  Genders,
  Postions,
  Rules,
  Columns,
} from "../models/users-management.model";
export default {
  name: "DialogUsersManagementForm",
  data() {
    return {
      genders: Genders,
      listDepartments: Departments,
      listPositions: Postions,
      columns: Columns,
      outerVisible: false,
      form: {
        email: "",
        phone: null,
        gender: null,
        dob: "",
        department: "",
        name: "",
        address: "",
        position: "",
      },
      rules: Rules,
    };
  },

  props: {
    title: {
      type: String,
      default: "Edit user",
    },
    loadingAction: {
      type: Boolean,
      default: false,
    },
    formUsers: {
      type: Object,
    },

    isFormEdit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const formatDate = new Date();
          this.$emit("onSave", {
            ...this.form,
            ...(!this.isFormEdit && { createdAt: formatDate }),
          });
        } else {
          return false;
        }
      });
    },
  },

  watch: {
    outerVisible() {
      this.form = { ...this.formUsers };
    },
  },
};
</script>

<style lang="scss" scoped>
.header-user-management {
  .box-card {
    .clearfix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
