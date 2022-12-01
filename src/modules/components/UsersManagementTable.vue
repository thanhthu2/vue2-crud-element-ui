<template>
  <div>
    <el-table :data="listUsers" class="fill-width table-users">
      <el-table-column
        v-for="column in columns"
        :key="column.id"
        :label="column.label"
        :prop="column.prop"
      >
        <template v-slot="{ row }">
          <el-tag
            v-if="column.prop === 'gender'"
            class="table-users__gender"
            :type="!!row.gender ? 'success' : 'warning'"
          >
            {{ displayGender(row.gender) }}</el-tag
          >
          <el-tag
            v-else-if="column.prop === 'position'"
            class="table-users__gender"
            :type="displayPosition(row.position).color"
          >
            {{ displayPosition(row.position).label }}</el-tag
          >
          <span v-else>
            {{ row[column.prop] || "N/A" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="{ $index, row }">
          <el-button size="mini" @click="openDialogUser($index, row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete($index, row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <DialogUsersManagementForm
      ref="DialogUsersManagementForm"
      :formUsers="form"
      :title="'Edit user'"
      :isFormEdit="true"
      @onSave="onSave"
    />
  </div>
</template>

<script>
import {
  Columns,
  EnumGenders,
  EnumPositions,
  Colors,
  Departments,
  Genders,
  Postions,
  Rules,
} from "../models/users-management.model";

import DialogUsersManagementForm from "./DialogUsersManagementForm.vue";
export default {
  components: { DialogUsersManagementForm },
  data() {
    return {
      genders: Genders,
      listDepartments: Departments,
      listPositions: Postions,
      columns: Columns,
      loadingAction: false,
      form: {
        email: "",
        phone: null,
        gender: null,
        dob: "",
        department: "",
        name: "",
        address: "",
      },
      rules: Rules,
    };
  },

  props: {
    listUsers: {
      type: Array,
    },
    isFinishEdit: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isFinishEdit() {
      if (!this.isFinishEdit) {
        //data from child component DialogUsersManagementForm
        let childCompData = this.$refs.DialogUsersManagementForm;
        childCompData.outerVisible = false;
      }
    },
  },

  methods: {
    openDialogUser(index, record) {
      const { id } = record;
      //data from child component DialogUsersManagementForm
      let childCompData = this.$refs.DialogUsersManagementForm;
      childCompData.outerVisible = true;
      this.form = { ...this.listUsers.find((user) => user.id === id) };
    },

    openDialogDeleteUser(id) {
      this.$confirm("Are you sure you want to delete user?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        this.$emit("delete:user", id);
      });
    },

    handleDelete(index, record) {
      const { id } = record;
      this.openDialogDeleteUser(id);
    },

    onSave(data) {
      this.$emit("update:user", data);
    },
  },

  computed: {
    displayGender() {
      return (value) => {
        return EnumGenders[value];
      };
    },

    displayPosition() {
      return (value) => {
        return {
          label: EnumPositions[value],
          color: Colors[value],
        };
      };
    },
  },
};
</script>

<style scoped lang="scss">
.table-users {
  &__gender {
    min-width: 62px;
    text-align: center;
  }
}
</style>
