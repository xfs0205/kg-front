<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    'data': {
        type: Array,
        default: () => [],
        validator: (value) => {
            return Array.isArray(value);
        },
    }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const truncateText = (text: string | undefined, maxLength: number) => {
    if (text) return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-main>
                <el-space wrap size="large" justify="center">
                    <el-link v-for="(i, index) in props['data']" :key="index" :href="(i as { 'link': string })['link']" target="_blank">
                        <el-card class="box-card" style="width: 270px">
                            <template #header>
                                <div class="card-header">
                                    <span>{{ (i as { 'title': string })['title'] }}</span>
                                </div>
                            </template>
                            <span>{{ truncateText((i as { 'body': string })['body'], 80) }}</span>
                        </el-card>
                    </el-link>
                </el-space>
            </el-main>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.el-main {
    margin-top: 20px;
    background-color: reb(0,0,0,0);
}
</style>