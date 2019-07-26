<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" id="addModal" @click.prevent="openModal">建立新的產品</button>
    </div>
    <table class="table text-left mt-3">
      <thead>
        <th width="120">分類</th>
        <th>商品名稱</th>
        <th width="120" class="text-right">原價</th>
        <th width="120" class="text-right">售價</th>
        <th width="100">是否啟用</th>
        <th width="80">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/products`;
      const vm = this;
      this.$http.get(api).then(response => {
        // console.log(data.data.products);
        vm.products = response.data.products;
      });
    },
    openModal() {
      $("#addProductModal").modal("show");
    }
  },
  created() {
    this.getProducts();
  }
};
</script>