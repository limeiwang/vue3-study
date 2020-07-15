<template>
  <div class="about">
    <!-- <h1>This is an about page</h1>
    <h2>{{$store.state.count}}</h2>
    <button @click="click">count++</button> -->


    <h1>{{count}}</h1>
    <h2>双倍{{double}}</h2>
    <button @click="click">count++</button>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
export default {
    // composition
    // setup() {
    //     function click() {
    //         this.$store.commit('addCount')
    //     }
    //     return {
    //         click
    //     }
    // },

    // options
    // methods: {
    //     click() {
    //         this.$store.commit('addCount');
    //     }
    // }


    setup() {
        let {
            count,
            double,
            click
        } = useCount(0);


        return {
            count,
            double,
            click
        }
    }
};

function useCount(init) {
    let count = ref(init)

    let double = computed(() => count.value*2)

    watchEffect(() => {
        console.log(count.value);
    })

    function click() {
        count.value++
    }
    return {
        count,
        double,
        click
    }
}
</script>