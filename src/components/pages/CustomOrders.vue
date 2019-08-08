<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" loader="dots"></loading>
    </div>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage : `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">原價{{item.origin_price | currency}}</div>
              <del class="h6" v-if="item.price">原價{{item.origin_price | currency}}</del>
              <div class="h5" v-if="item.price">現在只要{{item.price | currency}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click.prevent="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingSingleItem == item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click.prevent="addToCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.addtocart == item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- detail modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="productModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              style="height: 200px; background-size: cover; background-position: center"
              :style="{backgroundImage : `url(${product.imageUrl})`}"
            ></div>
            <p>{{product.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">原價{{product.origin_price | currency}}</div>
              <del class="h6" v-if="product.price">原價{{product.origin_price | currency}}</del>
              <div class="h5" v-if="product.price">現在只要{{product.price | currency}}</div>
            </div>

            <select class="form-control mt-3" id="exampleFormControlSelect1" v-model="product.num">
              <option v-for="item in 10" :key="item" :value="item">選購{{item}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{product.num * product.price}}</strong>元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="addToCart(product.id,product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingSingleItem: "", //透過id確認是否讀取成功，關閉轉圈動畫
        addtocart: ""
      }
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // console.log(response.data.products);
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/product/${id}`;
      const vm = this;
      vm.status.loadingSingleItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;

        $("#productModal").modal("show");
        console.log(response);
        vm.status.loadingSingleItem = "";
        // vm.product.num = 1;
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.addtocart = id;
      this.$http.post(api, { data: cart }).then(response => {
        // vm.product = response.data.product;
        $("#productModal").modal("hide");
        console.log(response);
        vm.status.addtocart = "";
      });
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const vm = this;
      // const cart = {
      //   product_id: id,
      //   qty
      // };
      // vm.status.addtocart = id;
      this.$http.get(api).then(response => {
        // vm.product = response.data.product;
        // $("#productModal").modal("hide");
        console.log(response);
        // vm.status.addtocart = "";
      });
    }
  },
  created() {
    this.getProducts();
    // this.getCart();
  }
};
</script>