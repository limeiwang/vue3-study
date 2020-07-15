
<template>
    <li class="catalog-item">
        <slot/>
    </li>
</template>

<script>
export default {
    name: 'CatalogItem',

    props: {
        data: {},
    }
}
</script>
