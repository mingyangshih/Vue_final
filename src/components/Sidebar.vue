<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column text-left">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="home"></span>
            管理員
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link font-weight-bold">
            <i class="fas fa-box-open mr-1"></i>產品列表
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
      </h6>
      <ul class="nav flex-column mb-2 text-left">
        <li class="nav-item">
          <router-link to="/customer_orders" class="nav-link font-weight-bold">
            <i class="fas fa-shopping-cart mr-1"></i>模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>