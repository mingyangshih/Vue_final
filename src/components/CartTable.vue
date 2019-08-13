<template>
  <div class="d-flex justify-content-center" v-if="cartData.final_total !== 0">
    <div class="mt-3 col-6">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartData" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click.prevent="removeCart(item.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
            <td>
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td>{{item.product.num}} / {{item.product.unit}}</td>
            <td class="text-right">{{item.product.price}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{cartTotalPrice}}</td>
          </tr>
          <tr v-if="cartTotalPrice !== cartFinalTotalPrice">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{cartFinalTotalPrice}}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="Please enter coupon"
          v-model="coupon_code"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["cartData", "cartTotalPrice", "cartFinalTotalPrice"],
  data: function() {
    return {
      removeId: "",
      coupon_code: ""
    };
  },
  methods: {
    removeCart(id) {
      const vm = this;
      vm.removeId = id;
      // console.log(vm.removeId);
      this.$emit("removeCart", vm.removeId);
    },
    addCouponCode() {
      const vm = this;
      this.$emit("addCouponCode", vm.coupon_code);
    }
  }
};
</script>