<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'


const container = ref(null);

function info_zh(a: string) {
    let s = ''
    if (a == "time") { s = '时间：' }
    else if (a == "place") { s = '地点：' }
    else if (a == "people") { s = '人物：' }
    else if (a == "background") { s = '背景：' }
    else if (a == "main") { s = "事件：" }
    else if (a == "meaning") { s = "意义：" }
    return s
}

const data = ref([
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5}
])

onMounted(async () => {

    const initialTranslateX = 0;
    const initialTranslateY = 0;

    const svg = d3.select(container.value)
        .append("svg")
        .attr("width", 580)
        .attr("height", 580)
        .attr("transform", `translate(${initialTranslateX},${initialTranslateY})`);

    // 定义弧形生成器
    const r = 450
    var arcGenerator = d3.arc()
        .innerRadius(r-1)
        .outerRadius(r)
        .startAngle(0) // 开始角度
        .endAngle(Math.PI); // 结束角度，这里是半圆


    const cline = svg.append("g")

    // 在SVG中绘制路径
    cline.append("path")
        .attr("transform", "translate(-80,290)") // 将路径移动到圆心位置
        .attr("d", arcGenerator) // 使用弧形生成器生成路径
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    
    data.value.forEach((node,index)=>{
        const angle = (1/3)*Math.PI+(index/(data.value.length-1))*(1/3)*Math.PI
        const x = -80+r*Math.sin(angle)
        const y = 290+r*Math.cos(angle)
        console.log("x:",x,"y:",y)
        cline.append("circle")
            .attr("cx",x)
            .attr("cy",y)
            .attr("r",10)
            .style("fill", "red") 
    })
    

    svg.on()
})
</script>


<template>
    <div ref="container">

    </div>
</template>