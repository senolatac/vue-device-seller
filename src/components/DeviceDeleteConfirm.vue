<template>
  <div class="modal fade" id="deleteModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          Are you sure to delete the selected device?
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-danger" type="button" @click="deleteDevice">I'm sure!</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'device-delete-modal',
  methods: {
    showDeleteModal() {
      $('#deleteModal').modal('show');
    },
    deleteDevice() {
      this.$emit('confirmed');
      $('#deleteModal').modal('hide');
    }
  }
};
</script>

<style scoped>

</style>
