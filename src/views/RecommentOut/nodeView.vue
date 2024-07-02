<script setup lang="ts">
import {defineProps, ref, onMounted, watch} from 'vue'
import * as echarts from 'echarts';

const props = defineProps({
    nodes:Array,
    edges:Array
})

const chartInstance = ref();
const chartRef = ref();
function creGraph() {
  if (chartInstance.value) {
    chartInstance.value.dispose(); // 销毁已有的图表实例
  }
  const option = {
    tooltip: {                  // 提示框的配置
      formatter: function (param: { data: { name: any; }; }) {
        //return param.data.category + ': ' + param.data.name;
        return param.data.name;
      }
    },

    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',

    series: [
      {
        type: 'graph',
        layout: 'force',
        nodes: props.nodes,
        symbolSize: [32, 32],//大小
        edges: props.edges,
        shape: 'circle', //形状
        roam: true,//平移，漫游
        scaleLimit: true,//滚轮缩放
        draggable: true,//结点是否可拖动
        hideOverlap: true,
        adaptive: true,
        force: {
          repulsion: 500,
          edgeLength: 120,
          gravity: 0.2
        },
        label: {
          show: true,
          position: "inside",
          fontSize: 8,
          formatter: function (params: { data: { name: string; }; }) {
            if (params.data.name.length > 5) {
              var c = params.data.name.slice(0, 4) + "...";
              return c;
            }
            else return params.data.name;
          },
        },
        edgeLabel: {
          show: false,
          position: 'middle',
          formatter: function (params: { data: { label: any; }; }) {
            return params.data.label
          }
        },
        emphasis: {
          focus: 'none',
          label: { show: true },
          edgeLabel: { show: true }
        },
        itemStyle: {
          cursor: 'pointer',
          color: function (params: { data: { type: string; }; }) {
            // 根据节点类型设置颜色
            if (params.data.type === 'person') {
              return 'rgb(239, 127, 127)'
            } else if (params.data.type === 'place') {
              return 'rgb(127, 127, 239)'
            } else if (params.data.type === 'event') {
              return 'rgb(127, 239, 127)'
            } else if (params.data.type === 'main') {
              return 'rgb(120, 120, 122)'
            }else {
              return 'rgb(0, 0, 0, 0.3)'
            }
          },
          borderWidth: 5, // 边框宽度
          borderColor: 'rgba(0, 0, 0, 0.1)', // 边框颜色，这里设置为黑色带有透明度},
        },
      },
    ],
  }
  chartInstance.value = echarts.init(chartRef.value);
  chartInstance.value.setOption(option);

  // 使用 ResizeObserver 来监听 chartRef 的大小变化
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target === chartRef.value) {
        if (chartInstance.value) {
          chartInstance.value.resize();
        }
        break;
      }
    }
  });
  // 开始监听 chartRef
  resizeObserver.observe(chartRef.value);
}

onMounted(()=>{
  creGraph();
  watch(() => props.nodes, () => {
    creGraph();
});
})
</script>

<template>
<div ref="chartRef" class="b1"></div>
</template>


<style scoped>

</style>



