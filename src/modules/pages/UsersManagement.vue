<template>
  <div class="container" v-loading="loading">
    <h1 class="title">Users Management</h1>
    <UsersManagementFormVue
      @add:user="addUser"
      :loadingActionSubmit="loadingActionSubmit"
    />
    <UsersManagementTableVue
      :listUsers="listUsers"
      @delete:user="onDeleteUser"
    />
  </div>
</template>

<script>
import UsersManagementFormVue from "../components/UsersManagementForm.vue";
import UsersManagementTableVue from "../components/UsersManagementTable.vue";
import { $api } from "@/services";

export default {
  name: "UsersManagement",
  components: { UsersManagementFormVue, UsersManagementTableVue },
  data() {
    return {
      listUsers: [],
      loading: false,
      loadingActionSubmit: false,
    };
  },
  methods: {
    async init() {
      this.loading = true;
      const [err, res] = await $api.userService.getUsers();
      this.loading = false;
      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      }
      this.listUsers = this.orderListUsersByName(res);
    },

    async addUser(data) {
      this.loadingActionSubmit = true;
      const [err] = await $api.userService.createUser(data);
      this.loadingActionSubmit = false;
      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      } else {
        this.showNotify("Success", "Add user successfully", "success");
      }
      this.init();
    },

    async onDeleteUser(id) {
      this.loading = true;
      const [err] = await $api.userService.deleteUser(id);
      this.loading = false;
      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      } else {
        this.showNotify("Success", "Delete user successfully", "success");
        this.init();
      }
    },

    showNotify(title, message, type) {
      this.$notify({
        title,
        message,
        type,
      });
    },
  },
  computed: {
    orderListUsersByName() {
      return (listUsers) => {
        return listUsers.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
      };
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped></style>
