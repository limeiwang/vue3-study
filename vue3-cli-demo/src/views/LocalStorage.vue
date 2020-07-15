
<template>
    <div @mousedown="start" :style="{
        background: 'limegreen',
        width: '100px',height: '100px',
        left: ops.x + 'px', top: ops.y + 'px', position: 'absolute'
    }">
    </div>
</template>

<script>
import LocalStorage from "../use/LocalStorage";
export default {
    data() {
        return {
        //    ops: {x: 150, y: 150}
            ops: LocalStorage('ops', {x: 150, y: 150})
        }
    }, 
    methods: {
        start(event) {
            this.startX = event.clientX;
            this.startY = event.clientY;
            
            this.startValue = {...this.$data.ops}
            console.log(this.startValue);
            this.dargging = false;
            var move = event => {
                if (Math.abs(event.clientX - this.startX) > 3 || 
                    Math.abs(event.clientY - this.startY) > 3)
                    this.dargging = true;    
                if (this.dargging) {
                    this.$data.ops.x = this.startValue.x + event.clientX - this.startX
                    this.$data.ops.y = this.startValue.y + event.clientY - this.startY 
                }
            }
            var end = () => {
                document.removeEventListener('mousemove', move, false);
                document.removeEventListener('mouseup', end, false);
                this.dargging = false;
            }
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', end, false)
        }
    }
}
</script>
