<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in orders" :key="item.id">
          <td>{{`${new Date(item.create_at*1000).getFullYear()}/${new Date(item.create_at*1000).getMonth()+1}/${new Date(item.create_at*1000).getDate()}`}}</td>
          <td>{{users[index].email}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [],
      users: []
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/orders?page=${page}`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response);
        if (response.data.success) {
          this.orders = response.data.orders;
          response.data.orders.forEach(element => {
            this.users.push(element.user);
          });
        }
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>