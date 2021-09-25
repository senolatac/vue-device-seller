<template>
  <div class="container">
    <div class="pt-5">

      <div class="alert alert-danger" v-if="errorMessage">
        {{errorMessage}}
      </div>

      <div class="card">
        <div class="card-header">

          <div class="row">
            <div class="col-6">
              <h3>All Devices</h3>
            </div>

            <div class="col-6 text-end">
              <button class="btn btn-primary" @click="createDeviceRequest">Create Device</button>
            </div>
          </div>

        </div>
        <div class="card-body">
          <table class="table table-striped">

            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(device, ind) in deviceList" :key="ind">
              <th scope="row">{{ind + 1}}</th>
              <td>{{device.name}}</td>
              <td>{{`$ ${device.price}`}}</td>
              <td>{{device.deviceType}}</td>
              <td>{{new Date(device.createTime).toLocaleDateString()}}</td>
              <td>
                <button class="btn btn-primary me-1" @click="editDeviceRequest(device)">Edit</button>
                <button class="btn btn-danger" @click="deleteDeviceRequest(device, ind)">Delete</button>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>

  <device-modal
      ref="deviceModal"
      :selected-device="selectedDevice"
      @saved="deviceSaved"
  />

  <device-delete-modal
      ref="deleteDeviceModal"
      @confirmed="deleteDevice"
  />
</template>

<script>
import DeviceService from '../services/device.service';
import DeviceModal from '../components/Device';
import Device from '../models/device';
import { nextTick } from 'vue';
import DeviceDeleteModal from '../components/DeviceDeleteConfirm';

export default {
  name: 'admin',
  components: { DeviceDeleteModal, DeviceModal },
  data() {
    return {
      deviceList: [],
      selectedDevice: new Device(),
      errorMessage: '',
      selectedIndex: undefined,
    };
  },
  mounted() {
    DeviceService.getAllDevices().then(response => {
      this.deviceList = response.data;
    });
  },
  methods: {
    createDeviceRequest() {
      this.selectedDevice = new Device();

      nextTick(() => {
        this.$refs['deviceModal'].showDeviceModal();
      });
    },
    editDeviceRequest(device) {
      this.selectedDevice = Object.assign({}, device);

      //sure pre-data is ready.
      nextTick(() => {
        this.$refs['deviceModal'].showDeviceModal();
      });
    },
    deleteDeviceRequest(device, ind) {
      this.selectedDevice = device;
      this.selectedIndex = ind;

      nextTick(() => {
        this.$refs['deleteDeviceModal'].showDeleteModal();
      })
    },
    deviceSaved(device) {
      const itemIndex = this.deviceList.findIndex(item => item.id === device.id);
      if (itemIndex !== -1) {
        this.deviceList[itemIndex] = device;
      } else {
        this.deviceList.push(device);
      }
    },
    deleteDevice() {
      DeviceService.deleteDevice(this.selectedDevice).then(() => {
        this.deviceList.splice(this.selectedIndex, 1);
      }).catch((err) => {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      })
    },
  }
};
</script>

<style scoped>

</style>
