<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{$store.state.count}}</h2>
    <button @click="click">count++</button>
  </div>
</template>

<script>
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
    methods: {
        click() {
            this.$store.commit('addCount');
        }
    }
}
</script>