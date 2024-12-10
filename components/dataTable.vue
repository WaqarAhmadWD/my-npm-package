<template>
    <div class="w-full h-full" v-if="cols && rows">
        <div class="w-full flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">{{ title }}</h2>
            <div>{{ extraInfo }}</div>
        </div>
        <div class="overflow-x-auto">
            <div class="min-w-full bg-white border border-gray-300">
                <div>
                    <div class="bg-gray-100 flex">
                        <div v-for="(col, index) in cols" :key="index" class="py-2 px-4 border-b w-full">
                            <slot :name="`header-${colFun(col)}`" :column="col">
                                {{ col?.title ? col.title : col }}
                            </slot>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="(row, rowIndex) in rows" :key="rowIndex"
                        class="hover:bg-gray-50 flex justify-around items-center">
                        <div v-for="(col, colIndex) in cols" :key="colIndex"
                            :class="`py-2  px-4 border-b flex w-full text-center`">
                            <slot :name="`cell-${colFun(col)}`" :value="row[col]" :row="row" :column="col">
                                {{ row[colFun(col)]?.length > 200 / cols?.length ? row[colFun(col)].slice(0, 200 /
                                    cols?.length) + "..." : row[colFun(col)] }}
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="rows.length === 0" class="text-center py-4 text-gray-500">
            No data available
        </div>
    </div>
    <div v-else>
        cols and rows, both are required
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Data Table'
    },
    extraInfo: {
        type: String,
        default: ''
    },
    cols: {
        type: Array,
        required: true,
        default: () => []
    },
    rows: {
        type: Array,
        required: true,
        default: () => []
    },
})
const colFun = (col) => col?.field ? col.field : col;
</script>

<style scoped>
/* ... existing styles ... */
</style>