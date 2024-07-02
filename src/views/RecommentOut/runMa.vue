<script setup lang="ts">
import {ref,defineEmits } from 'vue'

const emit = defineEmits(['deal-clicked']);
const ims = ref([
"../../../public/recommend/re01.png",
"../../../public/recommend/re02.png",
"../../../public/recommend/re03.png",
"../../../public/recommend/re04.png"
])

function getDeal(index: any){
    emit('deal-clicked', index)
}
</script>

<template>
    <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <img :src="ims[item-1]" alt="placeholder image" @click="getDeal(item)">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

</style>