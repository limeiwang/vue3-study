const {effect, reactive, ref} = require('@vue/reactivity');


let a = reactive({
	value: 1
})
let b;
let c = ref();

effect(() => {
	// 函数
	// 一上来会执行一下
	b = a.value + 10;
	console.log(b);
});
// a 响应式发生变化之后 再次执行effect
a.value = 30;