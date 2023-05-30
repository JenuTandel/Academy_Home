<template>
  <section class="p-3">
    <h1 class="mb-3">Users</h1>
    <base-dialog :show="deleteDialogVisibility" title="Delete">
      <template #header> </template>
      <template #default>
        <p>Are you sure to delete this course?</p>
      </template>
      <template #action>
        <button class="btn btn-success me-3" @click="onDeleteConfirm">
          Ok
        </button>
        <button class="btn btn-dark" @click="onDeleteCancel">Cancel</button>
      </template>
    </base-dialog>
    <div class="search mb-3">
      <input
        type="text"
        v-model="searchInput"
        class="form-control"
        placeholder="Search user by name or email"
      />
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Learner</th>
          <th>Joining Date</th>
          <th>Skill</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span class="d-block">
              {{ user.firstname }} {{ user.lastname }}
            </span>
            <span>
              {{ user.email }}
            </span>
          </td>
          <td>{{ user.joiningDate }}</td>
          <td>{{ user.skills }}</td>
          <td>{{ user.phoneno }}</td>
          <td class="text-nowrap">
            <button
              type="button"
              class="btn btn-danger me-2"
              @click="onRemove(user.id)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import authService from "../auth/services/auth.services";
export default {
  setup() {
    const $store = useStore();
    const deletedId = ref();
    const deleteDialogVisibility = ref(false);
    const searchInput = ref();
    const users = ref();
    // $store.dispatch("getUsers");
    authService.getUsers().then((res) => {
      $store.dispatch("getUsers", res);
    });
    const usersData = computed(() => {
      return $store.getters["getUsers"];
    });

    watch(usersData, () => {
      users.value = usersData.value;
    });

    watch(searchInput, () => {
      const searchValue = searchInput.value.toLowerCase();
      if (!searchInput.value) {
        users.value = usersData.value;
      } else {
        users.value = usersData.value.filter(
          (res: any) =>
            res.firstname.toLowerCase().includes(searchValue) ||
            res.lastname.toLowerCase().includes(searchValue) ||
            res.email.toLowerCase().includes(searchValue)
        );
      }
    });

    function onRemove(id: any) {
      deletedId.value = id;
      deleteDialogVisibility.value = true;
    }
    async function onDeleteConfirm() {
      // $store.dispatch("removeUser", deletedId.value);
      await authService.removeUser(deletedId.value);
      const index = usersData.value.findIndex(
        (res: any) => res.id == deletedId.value
      );
      usersData.value.splice(index, 1);
      deleteDialogVisibility.value = false;
    }
    function onDeleteCancel() {
      deleteDialogVisibility.value = false;
    }
    return {
      users,
      usersData,
      onRemove,
      onDeleteConfirm,
      onDeleteCancel,
      deleteDialogVisibility,
      searchInput,
    };
  },
};
</script>

<style scoped lang="scss">
.search {
  width: 25%;
}
</style>
