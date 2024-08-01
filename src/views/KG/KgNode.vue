<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl'
import kg from "./KG.json"

const glContainer = ref(null);
const nodes = ref(kg.nodes)
const links = ref(kg.edges)

const initChart = () => {

    const chart = echarts.init(document.getElementById('kgContainer'));

    const option = {
        series: [
            {
                type: 'graphGL',
                coordinateSystem: 'view3D',
                data: nodes.value,
                links: links.value,
                layout: 'force',
                itemStyle: {
                    color: '#ff0000', // 节点颜色  
                    opacity: 0.8,     // 节点透明度  
                    borderColor: '#ffffff', // 节点边框颜色  
                    borderWidth: 2,     // 节点边框宽度  
                    size: 50          // 节点大小（在3D图中可能表现为球体的半径或类似尺寸）  
                },
                forceAtlas2: {
                    steps: 5,
                    stopThreshold: 20,
                    jitterTolerence: 10,
                    edgeWeight: [0.2, 1],
                    gravity: 5,
                    edgeWeightInfluence: 0
                    // preventOverlap: true
                }
            }
        ]

    };


    chart.setOption(option);
}

onMounted(() => {
    nextTick(() => {
        initChart();
    });
});

</script>

<template>
    <div id="kgContainer" style="width: 800px; height: 500px"></div>
</template>

<style scoped></style>