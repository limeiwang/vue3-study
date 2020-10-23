import * as PIXI from "pixi.js";
// mount 需要 根容器
// createApp(App).mount('#app')
// pixi.js
// 初始化
const game = new PIXI.Application({
    width: 750,
    height: 1080,
    backgroundColor: "0x1099bb"
});

document.body.appendChild(game.view);

export function getCanvasRootContainer() {
    return game.stage;
}