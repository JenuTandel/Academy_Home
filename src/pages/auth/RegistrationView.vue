<template>
  <!-- start: row -->
  <div class="row gx-0 h-100 bg-light">
    <!-- start: column1 -->
    <div class="col-6">
      <img src="../../assets/images/login_bg.png" class="h-100 w-100" />
    </div>
    <!-- end: column1 -->
    <!-- start: column2 -->
    <div
      class="col-6 d-flex flex-column p-4 align-items-center justify-content-center"
    >
      <!-- logo -->
      <img class="logo" src="../../assets/images/logo.png" />
      <!-- start: form -->
      <form class="rounded border p-3">
        <h4 class="text-white text-center font-weight-normal mb-3">
          Create Account
        </h4>
        <div class="mb-3">
          <input
            type="text"
            id="firstname"
            class="form-control"
            placeholder="Firstname"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            id="lastname"
            class="form-control"
            placeholder="Lastname"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            id="email"
            class="form-control"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            id="password"
            class="form-control mb-3"
            placeholder="Password"
            autocomplete=""
          />
        </div>
        <table class="mb-3">
          <tr>
            <td><label class="text-white me-2">Country</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><select>
                <option value="">Select Country</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">State</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><select>
                <option value="">Select State</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">City</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><select>
                <option value="">Select City</option>
              </select>
            </td>
          </tr>
        </table>

        <div class="mb-3">
          <input
            type="phone"
            id="contactno"
            class="form-control"
            placeholder="Contact Number"
          />
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
        <div class="mb-3">
          <input
            type="text"
            id="skill"
            class="form-control"
            placeholder="Add your skill here"
          />
        </div>

        <button
          class="form-control bg-secondary text-white mb-3 border-0"
          type="button"
        >
          Create Account
        </button>
        <div class="text-center text-white">
          Already Logged In???
          <router-link to="/login" class="text-danger">click Here</router-link>
        </div>
      </form>
      <!-- end: form -->
    </div>
    <!-- end: column2 -->
  </div>
  <!-- end:row -->
</template>
<script lang="ts"></script>
<style scoped>
.logo {
  height: 100px;
  width: 200px;
}
form {
  width: 400px;
  height: 580px;
}
</style>
