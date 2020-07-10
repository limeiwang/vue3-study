// Vue2.0
// 基于Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
// Object.defineProperty 无法检测到对象属性的添加和删除 。
// 由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
// 深度监听需要一次性递归，对性能影响比较大。
// Vue3.0
// 基于Proxy和Reflect，<可以原生监听数组，可以监听对象属性的添加和删除。
// 不需要一次性遍历data的属性，可以显著提高性能。
// 因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11 。

// Proxy
//   对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。
//   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// Reflect 
//   是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。
//   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// WeakMap 
//   对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
//   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

const baseHandler = {
    get(target, key) {
        // const res = target[key]
        const res = Reflect.get(target, key)
        // 尝试获取值obj.age, 触发了getter
        track(target, key)
        return typeof res === 'object' ? reactive(res) : res
    },
    set(target, key, val) {
        const info = {
            oldValue: target[key],
            newValue: val
        }
        // Reflect.set
        // target[key] = val
        const res = Reflect.set(target, key, val)

        // @todo 响应式去通知变化 触发执行effect
        trigger(target, key, info)
    }
}


function reactive(target) {
    const observed = new Proxy(target, baseHandler)
    // 返回proxy代理后的对象
    return observed
}

function computed(fn) {
    // 特殊的effect
    const runner = effect(fn, {
        computed: true,
        lazy: true
    })
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}

function effect(fn, options = {}) {
    let e = createReactiveEffect(fn, options)
    // lazy是computed配置的
    if (!options.lazy) {
        // 不是懒执行
        e()
    }
    return e
}

function createReactiveEffect(fn, options) {
    // 构造固定格式的effect
    const effect = function effect(...args) {
        return run(effect, fn, args)
    }
    // effect的配置
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

function run(effect, fn, args) {
    // 执行effect
    // 取出effect 执行
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args) // 执行effect
        } finally {
            effectStack.pop() // effect执行完毕
        }
    }
}

let effectStack = [] // 存储effect
let targetMap = new WeakMap()

function track(target, key) {
    // 收集依赖
    const effect = effectStack[effectStack.length - 1]
    if (effect) {
        let depMap = targetMap.get(target)
        if (depMap === undefined) {
            depMap = new Map()
            targetMap.set(target, depMap)
        }
        let dep = depMap.get(key)
        if (dep === undefined) {
            dep = new Set()
            depMap.set(key, dep)
        }
        // 容错
        if (!dep.has(effect)) {
            // 新增依赖
            // 双向存储 方便查找优化
            dep.add(effect)
            effect.deps.push(dep)
        }
    }
}
// 怎么收集依赖，用一个巨大的map来收集
// {
//   target1:{
//      age,name
//     key: [包装之后的effect依赖的函数1，依赖的函数2]
//   }
//   target2:{
//     key2:
//   }
// }

function trigger(target, key, info) {
    // 数据变化后，通知更新 执行effect
    // 1. 找到依赖
    const depMap = targetMap.get(target)
    if (depMap === undefined) {
        return
    }
    // 分开，普通的effect，和computed有一个优先级
    // effects先执行，computet后执行
    // 因为computed会可能依赖普通的effects
    const effects = new Set()
    const computedRunners = new Set()
    if (key) {
        let deps = depMap.get(key)
        deps.forEach(effect => {
            if (effect.computed) {
                computedRunners.add(effect)
            } else {
                effects.add(effect)
            }
        })
        effects.forEach(effect => effect())
        computedRunners.forEach(computed => computed())
    }
}

// function reactive(data, cb) {
//     let res = null
//     let timer = null

//     res = data instanceof Array ? [] : {}

//     for (let key in data) {
//         if (typeof data[key] === 'object') {
//             res[key] = reactive(data[key], cb)
//         } else {
//             res[key] = data[key]
//         }
//     }

//     return new Proxy(res, {
//         get(target, key) {
//             return Reflect.get(target, key)
//         },
//         set(target, key, val) {
//             let res = Reflect.set(target, key, val)
//             clearTimeout(timer)
//             timer = setTimeout(() => {
//                 cb && cb()
//             }, 0)
//             return res
//         }
//     })
// }

// let data = {
//     foo: 'foo',
//     bar: [1, 2]
// }
// let p = reactive(data, () => {
//     console.log('trigger')
// })
// p.bar.push(3)

// console.log(p, ':p');