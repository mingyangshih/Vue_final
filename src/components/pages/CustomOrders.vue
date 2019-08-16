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
    <hr />
    <!-- 購物車資料 -->
    <cartTable
      :cartData="cartData"
      :cartTotalPrice="cartTotalPrice"
      :cartFinalTotalPrice="cartFinalTotalPrice"
      @removeCart="removeCartItem"
      @addCouponCode="addCoupon"
    />
    <!-- 表單驗證 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail" class="text-left w-100">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid' : errors.has('email')}"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
            data-vv-as="信箱"
          />
          <span class="text-danger d-block w-100 text-left">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username" class="text-left w-100">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid' : errors.has('name')}"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
            data-vv-as="姓名"
          />
          <span class="text-danger d-block w-100 text-left">{{ errors.first('name') }}</span>
        </div>

        <div class="form-group">
          <label for="usertel" class="text-left w-100">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            :class="{'is-invalid' : errors.has('tel')}"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
            v-validate="'required|length:10'"
            name="tel"
            data-vv-as="電話"
          />
          <span class="text-danger d-block w-100 text-left">{{ errors.first('tel') }}</span>
        </div>

        <div class="form-group">
          <label for="useraddress" class="text-left w-100">收件人地址</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid' : errors.has('address')}"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            v-validate="'required'"
            data-vv-as="地址"
          />
          <span class="text-danger d-block w-100 text-left">{{ errors.first('address') }}</span>
        </div>

        <div class="form-group">
          <label for="comment" class="text-left w-100">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
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
import cartTable from "../CartTable";
export default {
  components: {
    cartTable
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      cartData: [],
      cartTotalPrice: 0,
      cartFinalTotalPrice: 0,
      status: {
        loadingSingleItem: "", //透過id確認是否讀取成功，關閉轉圈動畫
        addtocart: ""
      },
      form: {
        user: {},
        message: ""
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
        // console.log(response);
        vm.status.loadingSingleItem = "";
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty: qty
      };
      vm.status.addtocart = id;
      this.$http.post(api, { data: cart }).then(response => {
        // console.log(response);
        $("#productModal").modal("hide");
        vm.status.addtocart = "";
        // 新增完後再取一次購物車資料
        this.getCart();
      });
      this.getCart();
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        // console.log(response);
        this.cartData = response.data.data.carts;
        this.cartTotalPrice = response.data.data.total;
        this.cartFinalTotalPrice = response.data.data.final_total;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCoupon(coupon_code) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/coupon`;
      const vm = this;
      const coupon = { code: coupon_code };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then(response => {
        // vm.getCart();
        this.getCart();
        // console.log(response);
        vm.isLoading = false;
      });
    },
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/order`;
      const vm = this;
      vm.isLoading = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          // do stuff if not valid.
          this.$http.post(api, { data: vm.form }).then(response => {
            // console.log(response);
            if (response.data.success) {
              this.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
            this.getCart();
          });
        } else {
          console.log("欄位不完整");
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>