// 响应式

let currentEffect;
// 依赖
class Dep {
	constructor() {
		this.effects = new Set();
	}
	// 1.收集依赖
	track() {
		if (currentEffect) {
			console.log(effect);
			this.effects.add(effect)
		}
	}
	// 2.触发依赖
	trigger() {

	}
}

const dep = new Dep();

function effect(effect) {
	// 收集依赖
	currentEffect = effect;
	dep.track();
	currentEffect = null;
}

function reactive(target) {
    // target变为响应式
    const observed = new Proxy(target, baseHandler)
    return observed
}

const baseHandler = {
	get(target, key) {

	},
	set(target, key, value) {
		
	}
}