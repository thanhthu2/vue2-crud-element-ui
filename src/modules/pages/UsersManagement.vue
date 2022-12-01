<template>
  <div class="container" v-loading="loading">
    <HeaderUsersManagement
      @open:dialog="openDialogForm"
      @filter:listUsers="fiteredUsers"
      @resetForm="init()"
    />

    <UsersManagementTableVue
      ref="UsersManagementTableVue"
      :listUsers="listUsers"
      :isFinishEdit="isFinishEdit"
      @delete:user="onDeleteUser"
      @update:user="onEditUser"
    />
    <DialogUsersManagementForm
      ref="DialogUsersManagementForm"
      :title="titleDialog"
      :loadingAction="loadingAction"
      :isFormEdit="false"
      @onSave="addUser"
    />
  </div>
</template>

<script>
import UsersManagementTableVue from "../components/UsersManagementTable.vue";
import HeaderUsersManagement from "../components/HeaderUsersManagement.vue";
import DialogUsersManagementForm from "../components/DialogUsersManagementForm.vue";
import { $api } from "@/services";

export default {
  name: "UsersManagement",
  components: {
    UsersManagementTableVue,
    HeaderUsersManagement,
    DialogUsersManagementForm,
  },
  data() {
    return {
      listUsers: [],
      loading: false,
      loadingAction: false,
      titleDialog: "",
      isFinishEdit: false,
    };
  },
  methods: {
    openDialogForm(type) {
      this.titleDialog = type;
      //data from child component DialogUsersManagementForm
      let childCompData = this.$refs.DialogUsersManagementForm;
      childCompData.outerVisible = true;
    },

    async init() {
      this.loading = true;
      const [err, res] = await $api.userService.getUsers();
      this.loading = false;
      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      }
      this.listUsers = this.orderListUsersByCreatedAt(res);
    },

    async addUser(data) {
      this.loadingAction = true;
      //data from child component DialogUsersManagementForm
      let childCompData = this.$refs.DialogUsersManagementForm;
      const [err] = await $api.userService.createUser(data);
      childCompData.outerVisible = false;
      this.loadingAction = false;
      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      } else {
        this.showNotify("Success", "Add user successfully", "success");
      }
      this.init();
    },

    async onEditUser(data) {
      this.isFinishEdit = true;
      const [err] = await $api.userService.editUser(data);
      this.isFinishEdit = false;

      if (err) {
        this.showNotify("Error", err.message, "error");
        return;
      } else {
        this.showNotify("Success", "Edit user successfully", "success");
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

    fiteredUsers({ gender, department, position, name }) {
      if ([gender, department, position].every((item) => !item)) return;

      const filterd = (user) =>
        user.gender === gender &&
        user.department === department &&
        user.position === position;

      if (name) {
        this.listUsers = this.listUsers.filter((user) =>
          user.name.includes(name)
        );
      }

      this.listUsers = this.listUsers.filter(filterd);
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
    orderListUsersByCreatedAt() {
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
