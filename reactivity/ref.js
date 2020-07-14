let activeEffect;

class Dep {
  subs = new Set()
  tarck() {
    // 收集依赖
    if(activeEffect){
      this.subs.add(activeEffect)
    }
  }
  trigget() {
    // 数据变化，触发effect执行
    this.subs.forEach(effect => effect())
  }
}

function effect(fn){
  activeEffect = fn;
  fn();
}

const dep = new Dep() // vue3就变成一个大的map

// ref 大概的原理
function ref(val){
  let _value = val;
  // 拦截.value操作
  let state = {
    get vaule(){
      dep.tarck()
      return _value
    },
    set vaule(newValue){
      // 修改，通知dep，执行有这个依赖的effect函数
      _value = newValue
      dep.trigget()
    }
  }
  return state
}

const state = ref(0)

effect(() => {
  // 这个函数内部，依赖state的变化
  console.log(state.vaule, '--------effect--------');
})

setInterval(() => {
  state.vaule++
}, 1000);