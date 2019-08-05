<template>
  <div class="justify-content-end d-flex">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ 'disabled' : !pagination.has_pre }"
          @click.prevent="pagination_renew(pagination.current_page - 1)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active' : page == pagination.current_page}"
        >
          <a class="page-link" href="#" @click.prevent="pagination_renew(page)">{{page}}</a>
        </li>
        <li
          class="page-item"
          :class="{ 'disabled' : !pagination.has_next }"
          @click.prevent="pagination_renew(pagination.current_page + 1)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  props: ["pagination"],
  data() {
    return {
      page: 1
    };
  },
  methods: {
    pagination_renew(page) {
      const vm = this;
      vm.page = page;
      this.$emit("pageTrigger", Number(vm.page));
      console.log(vm.page);
    }
  }
};
</script>