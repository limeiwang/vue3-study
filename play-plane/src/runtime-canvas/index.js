import {
    createRenderer
} from "@vue/runtime-core";
import {
    Graphics,
    Text
} from "pixi.js";
// 创建渲染器
// 实现渲染接口
const renderer = createRenderer({
    createElement(type) {
        console.log(type);
        // 基于 type 去创建视图
        let element;
        if (type === "circle") {
            // 画圆
            // pixi
            element = new Graphics();
            element.beginFill(0xff0000, 1);
            element.drawCircle(0, 0, 100);
            element.endFill();
        }
        return element;
    },
    insert(el, parent) {
        console.log("-----insert ------");
        console.log(el);
        parent.addChild(el);
    },
    patchProp(el, key, prevValue, nextValue) {
        console.log("----patchProp-----");
        console.log(el);
        console.log(key);
        console.log(prevValue);
        console.log(nextValue);
        // pixi
        // el.x = nextValue
        el[key] = nextValue;
    },
    setElementText(node, text) {
        console.log("elementText");
        console.log(node);
        console.log(text);
        const canvasText = new Text(text);
        node.addChild(canvasText);
    },
    createText(text) {
        return new Text(text);
    },
    parentNode(node) {
        console.log('parentNode');
        console.log(node);
    },
    nextSibling(node) {
        console.log('nextSibling');
        console.log(node);
    }
});

export function createApp(rootComponent) {
    // 调用 renderer
    return renderer.createApp(rootComponent);
}