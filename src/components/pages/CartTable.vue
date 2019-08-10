<template>
<div class="mt-3">
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
      <td></td>
      <td>{{item.product.title}}</td>
      <td>{{item.product.num}} / {{item.product.unit}}</td>
      <td>{{item.product.price}}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>總計</td>
      <td>{{cartTotalPrice}}
      </td>
    </tr>
  </tbody>
</table>
</div>  
</template>


<script>
export default {
  props:['cartData','cartTotalPrice']
}
</script>