<template>
  <el-table :data="listUsers" class="fill-width table-users">
    <el-table-column
      v-for="column in columns"
      :key="column.id"
      :label="column.label"
      :prop="column.prop"
    >
      <template v-slot="{ row }" v-if="column.prop === 'gender'">
        <el-tag
          class="table-users__gender"
          :type="!!row.gender ? 'success' : 'warning'"
        >
          {{ displayGender(row.gender) }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template v-slot="{ $index, row }">
        <el-button size="mini" @click="handleEdit($index, row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete($index, row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Columns } from "../models/users-management.model";
export default {
  data() {
    return {
      columns: Columns,
    };
  },

  props: {
    listUsers: {
      type: Array,
    },
  },

  methods: {
    handleEdit(index, record) {
      const { id } = record;
      console.log(index, id);
    },
    handleDelete(index, record) {
      const { id } = record;
      this.$emit("delete:user", id);
    },
  },

  computed: {
    displayGender() {
      return (value) => {
        const gender = {
          0: "Male",
          1: "Female",
        };
        return gender[value];
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
