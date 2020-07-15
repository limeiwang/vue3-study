
<template>
<div class="catalog">
    <div class="catalog-title">
        <slot name="title" v-if="$slots.title"/>
        <template v-else>
            <span class="col-tit index center">序号</span>
            <span class="col-tit name">用户</span>
            <span class="col-tit dep">部门</span>
            <span class="col-tit email">邮箱</span>
        </template>
    </div>
    <!-- <slot name="body" v-if="$slots.body"/> -->
    <!-- <transition-group
        v-if="list.length > 0"
        ref="list"
        tag="ul"
        name="list"
        appear
    >
        <li
            v-for="(item, index) in list"
            :key="`${index}-key`">
            <span
                :title="index + 1"
                class="catalog-col index center"
            >
                {{ index + 1 }}
            </span>
            <span
                :title="item.name + item.email"
                class="catalog-col name"
            >
                {{ item.name }}
            </span>
            <span
                :title="item.dep"
                class="catalog-col dep"
            >
                {{ item.dep }}
            </span>
            <span
                :title="item.email"
                class="catalog-col email"
            >
                {{ item.email }}
            </span>
        </li>
    </transition-group> -->
    <ul class="catalog-list">
        <slot 
            v-for="(item, index) in list"
            :data="item"
            name="item">
            <catalog-item
                :data="item"
                :key="item.id">
                <slot
                    :data="item"
                    :index="index"
                    name="column"/>
            </catalog-item>
        </slot>
    </ul>
</div>
</template>

<script>
import CatalogItem from "./CatalogItem";
export default {
    name: 'Catalog',

    components: {
        CatalogItem
    },

    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="less">
.catalog {
    height: 260px;
    border: 1px solid #DDDEE4;
    background-color: #FFFFFF;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    .catalog-title {
        height: 34px;
        line-height: 34px;
        background-color: #F5F5F5;
        border-bottom: 1px solid #DDDEE4;
        border-radius: 4px 4px 0 0;
        font-size: 12px;
        color: #333333;
        font-weight: 500;
        flex-shrink: 0;
    }
    ul {
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        flex-grow: 1;
        padding: 0;
        margin: 0;
    }
    li {
        width: 100%;
        height: 39px;
        line-height: 39px;
        border-bottom: 1px solid #DDDEE4;
        color: #666666;
        list-style: none;
        &:hover {
            background-color: #F7F8FA;
        }
        &:last-child {
            margin-bottom: -1px;
        }
    }

    .catalog-title > span,
    li > span {
        display: block;
        float: left;
        font-size: 12px;
    }
    .col-tit, .catalog-col {
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        height: 100%;
        padding: 0 10px;
        &.center {
            text-align: center;
        }
        &.index {
            width: 56px;
        }
        &.name, &.email, &.dep {
            width: 200px;
        }
    }
}
</style>