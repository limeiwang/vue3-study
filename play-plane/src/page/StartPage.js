import {
    defineComponent,
    h
} from "@vue/runtime-core";
// TODO 引入图片
import startPageImg from '../../assets/'


export default defineComponent({
    render() {
        return h('Container', [h('Sprite', {
            texture: startPageImg
        })])
    }
})