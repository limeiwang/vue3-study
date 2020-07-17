// 需求：
// 当改变一个数据的时候，自动执行所有依赖这个数据的函数
// 也就是观察者模式


const state = {
    name: 'lmw'
}

let myTitle = '';

function update() {
    myTitle = state.name + 'Title'
}

// 1、手动调用
// update();
// console.log(myTitle); // lmwTitle
// state.name = "abc";
// update();
// console.log(myTitle); // abcTitle

// 1.需要收集对当前数据的依赖函数
//    怎么收集，收集到哪里？
//    这个依赖函数要怎么获取到呢？
// 2.更改数据的时候调用收集好的依赖函数
//    如何知道数据的更改呢？
//    如何获取到之前收集好的依赖函数呢


// 2、依赖收集
const dependencies = {};
dependencies.data = {}
dependencies.data.name = []
dependencies.data.name.push(update)

// 触发依赖 vue2
function defineReactive(target, key, value) {
    // 深度监听
    observer(value);
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            // 获取值
            return value
        },
        set(newValue) {
            // 深度监听
            observer(newValue);
            // 修改值
            value = newValue;
            dependencies.data.name.forEach(fn => fn());
        }
    })
}

function observer(target) {
    if (typeof target !== "object" || target === null) {
        // 不是对象或数组
        return target;
    }
    for (let key in target) {
        defineReactive(target, key, target[key]);
    }
}
observer(state);
state.name = "abc";
console.log(myTitle);

// 触发依赖 vue3
const baseHandler = {
    get(obj, prop) {
        return Reflect.get(obj, prop);
    },
    set(obj, prop, value) {
        const result = Reflect.set(obj, prop, value);
        // 触发依赖当前数据的函数
        dependencies.data.name.forEach((fn) => fn());
        return result;
    }
}

let observed = new Proxy(state, baseHandler);
observed.name = "abcd";
console.log(myTitle);