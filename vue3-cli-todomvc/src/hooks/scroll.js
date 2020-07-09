import {
    ref,
    onMounted,
    onUnmounted
} from 'vue'
export default function useScroll() {

    const top = ref(0);

    function update() {
        top.value = window.scrollY;
    }

    onMounted(() => {
        window.addEventListener('scroll', update)
    })

    onUnmounted(() => {
        window.addEventListener('scroll', update)
    })

    return {
        top
    }
}