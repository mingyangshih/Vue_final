<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" loader="dots"></loading>
    </div>
    <div class="text-right">
      <button class="btn btn-primary" id="addModal" @click.prevent="openModal(true)">建立新的優惠券</button>
    </div>
    <table class="table text-left mt-3">
      <thead>
        <th>名稱</th>
        <th width="200" class="text-right">折扣百分比</th>
        <th width="200" class="text-right">到期日</th>
        <th width="150" class="text-center">是否啟用</th>
        <th width="120" class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td class="text-right">{{item.percent}}</td>
          <td
            class="text-right"
          >{{`${new Date(item.due_date*1000).getFullYear()}/${new Date(item.due_date*1000).getMonth()+1}/${new Date(item.due_date*1000).getDate()}`}}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click.prevent="openModal(false,item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- add coupon modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="d-flex">
                  <label for="recipient-name" class="col-form-label font-weight-bold">標題</label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  v-model="couponData.title"
                />
              </div>
              <div class="form-group">
                <div class="d-flex">
                  <label for="message-text" class="col-form-labe font-weight-bold">優惠碼</label>
                </div>
                <input type="text" class="form-control" id="message-text" v-model="couponData.code" />
              </div>
              <div class="form-group">
                <div class="d-flex">
                  <label for="message-text" class="col-form-labe font-weight-bold">到期日</label>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="message-text"
                  v-model="couponData.due_date"
                />
              </div>
              <div class="form-group">
                <div class="d-flex">
                  <label for="message-text" class="col-form-labe font-weight-bold">折扣百分比</label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="message-text"
                  v-model="couponData.percent"
                />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="couponData.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="modifyCoupon(couponData.id)"
            >更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ couponData.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="deleteCoupon(couponData.id)"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁component -->
    <pagination :pagination="pagination" @pageTrigger="getCoupons" />
  </div>
</template>
<script>
import pagination from "../Pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      couponData: {},
      coupons: [],
      pagination: {},
      isLoading: false,
      isNew: false
    };
  },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.couponData = {};
        this.isNew = true;
      } else {
        this.couponData = { ...item };
        //調整日期格式
        const month =
          new Date(item.due_date * 1000).getMonth() < 10
            ? "0" + (new Date(item.due_date * 1000).getMonth() + 1)
            : new Date(item.due_date * 1000).getMonth() + 1;
        const date =
          new Date(item.dut_date * 1000).getDate() < 10
            ? "0" + new Date(item.due_date * 1000).getDate()
            : new Date(item.due_date * 1000).getDate();
        this.couponData.due_date = `${new Date(
          item.due_date * 1000
        ).getFullYear()}-${month}-${date}`;
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    openDelModal(item) {
      this.couponData = { ...item };
      $("#delCouponModal").modal("show");
    },
    addNewCoupon() {
      const vm = this;
      const timestamp = new Date(vm.couponData.due_date).getTime(); //Date 內無值的話為當前時間
      vm.couponData.due_date = Math.floor(timestamp / 1000); //改成API所需格式
      const postCoupon = vm.couponData;

      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupon`;
      let httpMethod = "post";
      this.$http[httpMethod](api, { data: postCoupon }).then(response => {
        $("#couponModal").modal("hide");
        this.getCoupon();
        vm.couponData = {};
      });
    },
    modifyCoupon(id) {
      const vm = this;
      const timestamp = new Date(vm.couponData.due_date).getTime(); //Date 內無值的話為當前時間
      vm.couponData.due_date = Math.floor(timestamp / 1000); //改成API所需格式
      const postCoupon = vm.couponData;

      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupon/${id}`;
      let httpMethod = "put";
      this.$http[httpMethod](api, { data: postCoupon }).then(response => {
        $("#couponModal").modal("hide");
        console.log(response);
        this.getCoupon();
        vm.couponData = {};
      });
    },
    deleteCoupon(id) {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupon/${id}`;
      let httpMethod = "delete";
      vm.isLoading = true;
      this.$http[httpMethod](api).then(response => {
        // console.log(response);
        $("#delCouponModal").modal("hide");
        vm.isLoading = false;
        this.getCoupon();
        vm.couponData = {};
      });
    },
    getCoupon() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupons`;
      let httpMethod = "get";
      vm.isLoading = true;
      this.$http[httpMethod](api).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        }
        vm.isLoading = false;
      });
    },
    getCoupons(page) {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupons/page=${page}`;
      let httpMethod = "get";
      this.$http[httpMethod](api).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        }
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>