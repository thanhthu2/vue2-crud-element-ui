<template>
  <div class="user-form">
    <el-row :gutter="20">
      <el-form :model="form" :rules="rules" ref="form">
        <el-col :span="4">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="Telephone" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="gender">
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
          <el-form-item prop="dob">
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
        <el-col :span="4">
          <el-form-item prop="department">
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
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="Name" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="user-form__action">
            <el-button
              class="fill-width"
              type="primary"
              :loading="loadingActionSubmit"
              @click="onSubmit"
              >Submit</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import validator from "@/utils/validator";
import { Departments, Genders } from "../models/users-management.model";
export default {
  data() {
    return {
      genders: Genders,
      listDepartments: Departments,
      form: {
        email: "",
        phone: null,
        gender: null,
        dob: "",
        department: "",
        name: "",
      },
      rules: {
        email: [
          { validator: validator.validateEmail, trigger: ["change", "blur"] },
          {
            required: true,
            message: "Please enter email address",
            trigger: ["change", "blur"],
          },
        ],
        phone: [
          { validator: validator.validatePhone, trigger: ["change", "blur"] },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: ["change", "blur"],
          },
        ],
        dob: [
          {
            required: true,
            message: "Please select date of birth",
            trigger: ["change", "blur"],
          },
        ],
        department: [
          {
            required: true,
            message: "Please select department",
            trigger: ["change", "blur"],
          },
        ],
        name: [
          {
            required: true,
            message: "Please select name",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },

  props: {
    loadingActionSubmit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const formatDate = new Date();
          this.$emit("add:user", { ...this.form, createdAt: formatDate });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  &__action {
    text-align: start;
  }
}
</style>
