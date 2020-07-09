<template>
  <div class="position">
    <div>滚动条Y坐标---{{top}}</div>
    <div>鼠标X坐标---{{x}}</div>
    <div>鼠标Y坐标---{{y}}</div>
  </div>
  <button @click="increase">count is: {{count}} double is: {{double}}</button>
  <h3>{{state.name}}</h3>

  <ul class="list">
    <li>li</li>
    <li>li</li>
    <li>li</li>
    <li>li</li>
    <li>li</li>
    <li>li</li>
    <li>li</li>
    <li>li</li>
  </ul>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  watchEffect,
  watch,
  readonly,
  onMounted,
  onUnmounted
} from "vue";
import useMousePosition from "../hooks/mouse";

// vue2
// export default {
//     data() {},
//     methods: {},
//     computed: {},
//     watch: {},
// }

// 特有逻辑函数剥离 vue3.0的好处
function useScroll() {
  // 实时获取滚动条位置
  const top = ref(0);

  function update() {
    top.value = window.scrollY;
  }
  onMounted(() => {
    window.addEventListener("scroll", update);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
  });

  return {
    top
  };
}

export default {
  name: "Demo",
  components: {},

  setup() {
    let { top } = useScroll();
    let { x, y } = useMousePosition();
    let count = ref(0);
    let state = reactive({
      name: "张三",
      age: 26,
      sex: "男"
    });
    const copy = readonly(state);

    let increase = () => {
      count.value++;
    };

    let double = computed(() => count.value * 2);

    watch(double, (oldVal, newVal) => {
      console.log("watch:", oldVal, newVal);
    });

    // 在反应性地跟踪其依赖关系时立即运行一个函数，并在依赖关系发生变化时重新运行它。
    watchEffect(() => {
      //   console.log("watchEffect:", copy.age);
      console.log("watchEffect:", count.value);
    });

    // Set operation on key "count" failed: target is readonly.
    // copy.count++;

    return {
      count,
      double,
      state,
      increase,
      x,
      y,
      copy,
      top
    };
  }
};
</script>

<style lang="less">
.list {
  li {
    height: 500px;
  }
}
</style>
