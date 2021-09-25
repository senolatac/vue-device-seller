<template>
  <div class="container p-3">
    <div v-if="errorMessage" class="alert alert-danger">
      {{errorMessage}}
    </div>

    <div v-if="infoMessage" class="alert alert-success">
      {{infoMessage}}
    </div>

    <div class="d-flex flex-wrap">
      <div
          v-for="(device, ind) in deviceList" :key="ind"
          class="card m-3" style="width: 300px; background-color: #f6f6f6;">

        <div class="card-body">
          <h5 class="card-title text-uppercase">{{ device.name }}</h5>
          <h6 class="card-subtitle text-muted">
            {{device.description}}
          </h6>
        </div>

        <font-awesome-icon :icon="iconByDeviceType(device.deviceType)"
                           class="ms-auto me-auto mt-3 device-icon"
                           :style="{'color': device.color}"/>

        <div class="row pt-3 pb-3 ps-5 pe-5 mt-2">
          <div class="col-3 text-center" @click="device.color = colors.BLACK">
            <div class="color-item" :class="{active: device.color === colors.BLACK}" style="background-color: black;"></div>
          </div>
          <div class="col-3 text-center" @click="device.color = colors.ORANGE">
            <div class="color-item" :class="{active: device.color === colors.ORANGE}" style="background-color: orange;"></div>
          </div>
          <div class="col-3 text-center" @click="device.color = colors.RED">
            <div class="color-item" :class="{active: device.color === colors.RED}" style="background-color: red;"></div>
          </div>
          <div class="col-3 text-center" @click="device.color = colors.BLUE">
            <div class="color-item" :class="{active: device.color === colors.BLUE}" style="background-color: blue;"></div>
          </div>
        </div>

        <div class="row mt-2 p-3">
          <div class="col-6 mt-2 ps-4">
            {{`$ ${device.price}`}}
          </div>
          <div class="col-6">
            <button class="btn btn-outline-success w-100" @click="purchase(device)">
              Buy
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import DeviceService from '../services/device.service';
import vuex from 'vuex';
import Purchase from '../models/purchase';
import PurchaseService from '../services/purchase.service';
import DeviceType from '../models/device-type';
import Colors from '../models/colors';

export default {
  name: 'home',
  data() {
    return {
      deviceList: [],
      errorMessage: '',
      infoMessage: '',
      colors: Colors,
    };
  },
  computed: {
    ...vuex.mapGetters(['currentUser']),
  },
  mounted() {
    DeviceService.getAllDevices().then((response) => {
      this.deviceList = response.data;
      this.deviceList.forEach((d) => d.color = this.colors.BLACK);
    });
  },
  methods: {
    iconByDeviceType(type) {
      switch (type) {
        case DeviceType.DESKTOP:
          return 'desktop';
        case DeviceType.LAPTOP:
          return 'laptop';
        case DeviceType.PHONE:
          return 'mobile-alt';
        case DeviceType.TABLET:
          return 'tablet-alt';
      }
    },
    purchase(device) {
      if (!this.currentUser?.id) {
        this.errorMessage = 'You should log in to buy a device';
        return;
      }

      const purchase = new Purchase(this.currentUser.id, device.id, device.price, device.color);

      PurchaseService.savePurchase(purchase).then(() => {
        this.infoMessage = 'Mission is completed.';
      }).catch((err) => {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.device-icon {
  font-size: 100px;
  color: darkblue;
}
.color-item {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
}
.color-item.active:after {
  content: "";
  position: absolute;
  width: 36px;
  height: 36px;
  left: -4px;
  top: -4px;
  border-radius: 50%;
  border: 2px solid #8888;
}
</style>
