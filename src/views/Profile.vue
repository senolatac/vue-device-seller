<template>
  <div class="container">
    <div class="pt-5">

      <div v-if="errorMessage" class="alert alert-danger">
        {{errorMessage}}
      </div>

      <div class="card">
        <div class="card-header">

          <div class="row">
            <div class="col-6">
              <h3>All Purchased Items</h3>
            </div>
            <div class="col-6 text-end">
              Current role is <strong>{{currentUser?.role}} </strong>
              <button class="btn btn-primary" @click="changeRole">Change Role</button>
            </div>
          </div>

        </div>
        <div class="card-body">
          <table class="table table-striped">

            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Color</th>
              <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, ind) in purchaseItemList" :key="ind">
              <th scope="row">{{ind + 1}}</th>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>{{`$ ${item.price}`}}</td>
              <td>{{item.color}}</td>
              <td>{{new Date(item.purchaseTime).toLocaleDateString()}}</td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import vuex from 'vuex';
import PurchaseService from '../services/purchase.service';
import Role from '../models/role';
import UserService from '../services/user.service';


export default {
  name: 'profile',
  data() {
    return {
      purchaseItemList: [],
      errorMessage: '',
    };
  },
  computed: {
    ...vuex.mapGetters(['currentUser']),
  },
  mounted() {
    PurchaseService.getAllPurchaseItems().then((response) => {
      this.purchaseItemList = response.data;
    });
  },
  methods: {
    ...vuex.mapActions(['clearUser']),
    changeRole() {
      const newRole = this.currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

      UserService.changeRole(newRole).then(() => {
        this.clearUser();
        this.$router.push('/login');
      }).catch((err) => {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      })
    },
  },
};
</script>

<style scoped>

</style>
