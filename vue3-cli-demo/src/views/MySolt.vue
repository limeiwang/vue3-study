
<template>
    <div>
        <catalog :list="list">
            <template v-slot:title>
                <span class="col-tit index center">序号</span>
                <span class="col-tit name">用户</span>
                <span class="col-tit dep">部门</span>
            </template>
            <template v-slot:column="{data, index}">
                <span
                :title="index + 1"
                class="catalog-col index center"
                >
                    {{ index + 1 }}
                </span>
                <span
                    :title="data.name"
                    class="catalog-col name"
                >
                    {{ data.name }}
                </span>
                <span
                    :title="data.dep"
                    class="catalog-col dep"
                >
                    {{ data.dep }}
                </span>
            </template>
        </catalog>
    </div>
</template>

<script>
import Catalog from "../components/Catalog";
import HTTPRequest from "../use/HTTPRequest";
export default {
    components: {
        Catalog
    },

    setup() {

        return {
            list: HTTPRequest('list.json')
        }
    }
    // data() {
    //     return {
    //         list: HTTPRequest('list.json')
    //     }
    // }
}
</script>
