<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // const api = ` ${process.env.APIPATH}/api/${process.env.PATHNAME}/products`;
    // this.$http.get(api).then(data => {
    //   console.log(data);
    // });
  }
};
</script>

<style lang="scss">
@import "./assets/all.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
