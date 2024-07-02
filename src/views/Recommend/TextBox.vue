<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    title: String,
    text: String,
    link: String
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const truncateText = (text: string | undefined, maxLength: number) => {
    if (text) return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
</script>

<template>
    <el-link :href="props['link']" target="_blank">
        <div class="container" style="padding-left: 4px;padding-right: 6px;font-size: 14px;">
            <h2>{{ props.title }}</h2>
            <p>&emsp;&emsp;{{ truncateText(props.text, 170) }}</p>
        </div>
    </el-link>
</template>

<style lang="scss" scoped>
.el-link {
    border-radius: 5px;
    background-color: rgb(0,0,0,0);
}
</style>
