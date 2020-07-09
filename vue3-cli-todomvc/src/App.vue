<template>
  <div id="app">
    <!-- <Demo /> -->
    <Todo />
  </div>
</template>

<script>
// import { ref, reactive, computed, watchEffect, watch, readonly } from "vue";
// import Demo from "./components/Demo";
import Todo from "./components/Todo";

// vue2
// export default {
//     data() {},
//     methods: {},
//     computed: {},
//     watch: {},
// }
export default {
  name: "app",
  components: {
    // Demo,
    Todo
  },
  setup() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
