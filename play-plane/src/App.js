// template -> render
import {
    defineComponent,
    h,
    reactive,
    onMounted,
    onUnmounted,
    watch
} from "@vue/runtime-core";
export default defineComponent({
    setup(,) {
        const planeInfo = reactive({
            y: 150,
            x: 150
        })
        const speed = 15;
        window.addEventListener('keydown', (e) => {
            console.log(e)
            switch (e.code) {
                case 'ArrowUp':
                    planeInfo.y -= speed;
                    break;
                case 'ArrowDown':
                    planeInfo.y += speed;
                    break;
                case 'ArrowLeft':
                    planeInfo.x -= speed;
                    break;
                case 'ArrowRight':
                    planeInfo.x += speed;
                    break;
            }
        })

        onMounted(() => {

        });

        onUnmounted(() => {})

        return {
            planeInfo
        }
    },
    render(ctx) {
        // 创建虚拟节点
        // <div x="20" y="20">小球</div>
        // const vnode = h("circle", { x: 200, y: 200 },"小球");
        console.log(ctx, '------------ctx-------------');
        const vnode = h("circle", {
                x: ctx.planeInfo.x,
                y: ctx.planeInfo.y
            },
            "小球");
        console.log(vnode);
        return vnode;
    },
});