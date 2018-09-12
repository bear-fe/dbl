<template>
<transition name="slide">
  <router-view></router-view>
</transition>
</template>

<script>
  export default {}
</script>

<style>
.router-link-exact-active {
  color: blue;
}
</style>
