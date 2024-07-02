<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'

const props = defineProps({
  lang: String
})



const nodes = ref([]);
const edges = ref([]);
const chartRef = ref();
const chartInstance = ref();

const emit = defineEmits(["info"])


function creGraph() {
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
        nodes: nodes.value,
        symbolSize: [32, 32],//大小
        edges: edges.value,
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
            } else {
              return 'rgb(0, 0, 0)'
            }
          },
          borderWidth: 5, // 边框宽度
          borderColor: 'rgba(0, 0, 0, 0.1)', // 边框颜色，这里设置为黑色带有透明度},
        },
        // lineStyle: {
        //     color: 'black',
        //     width: 1,
        //     type: 'solid',
        //     curveness: 0.3,
        // },
      },
    ],
  }
  chartInstance.value = echarts.init(chartRef.value);
  chartInstance.value.setOption(option);



  // 监听节点的点击事件
  // chartInstance.value.getZr().on('click', (params: any) => {
  //   console.log('Click event triggered:', params); // 添加这行日志语句
  //   console.log('Target:', params.target); // 添加这行日志语句
  //   if (params.target && params.target instanceof Node) {
  //     const idata = {
  //       open: true,
  //       mess: params.target.data
  //     };
  //     emit("info", idata);
  //   } else {
  //     const idata = {
  //       open: false,
  //       mess: {}
  //     };
  //     emit("info", idata);
  //     console.log(idata);
  //   }
  // });
  // 修改点击事件处理函数
  chartInstance.value.on('click', (params: any) => {
    if (!params.event) {
      // 没有鼠标事件对象，无法确定点击位置
      console.log('Unable to determine click position');
      return;
    }

    const offsetX = params.event.offsetX;
    const offsetY = params.event.offsetY;
    const chartRect = chartInstance.value.getDom().getBoundingClientRect();

    if (offsetX < chartRect.left || offsetX > chartRect.right || offsetY < chartRect.top || offsetY > chartRect.bottom) {
      // 点击位置不在图表区域内，可以判断为点击了空白位置
      console.log('Clicked on blank space');
      return;
    }

    if (params.dataType === 'node') {
      // 点击节点的处理逻辑
      const node = params.data;
      if (node.open) {
        // 如果节点已展开，则收起组件
        const idata = { open: false, mess: {} };
        emit("info", idata);
      } else {
        // 如果节点未展开，则显示相应组件
        const idata = { open: true, mess: node };
        emit("info", idata);
      }

      // 切换节点的展开状态
      node.open = !node.open;
    } else {
      // 点击其他类型元素的处理逻辑
      const idata = { open: false, mess: {} };
      emit("info", idata);
      console.log(idata);
    }
  });


  chartInstance.value.on('click', function (params: { dataType: string; data: { id: any; }; }) {
    if (params.dataType === 'node') {
      const selectedNodeId = params.data.id;
      const option = chartInstance.value.getOption();
      const nodes = option.series[0].nodes;
      const edges = option.series[0].edges;

      // 将所有节点和边的emphasis设置为普通状态
      nodes.forEach((node: { emphasis: { focus: string; }; }) => {
        node.emphasis = { focus: 'none' };
      });
      edges.forEach((edge: { emphasis: { focus: string; }; }) => {
        edge.emphasis = { focus: 'none' };
      });

      // 设置被点击节点及其相连的节点和边的emphasis为突出显示状态
      nodes.forEach((node: { id: any; emphasis: { focus: string; }; }) => {
        if (node.id === selectedNodeId) {
          node.emphasis = { focus: 'adjacency' };
        }
      });
      edges.forEach((edge: { source: any; target: any; emphasis: { focus: string; }; }) => {
        if (edge.source === selectedNodeId || edge.target === selectedNodeId) {
          edge.emphasis = { focus: 'adjacency' };
        }
      });

      chartInstance.value.setOption(option);
    }
  });


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


const fetchData = async () => {
  const params = {
    q: props.lang
  };

  try {
    const response = await axios.get('http://127.0.0.1:8017/backend/chat/get_KG', {
      params,
      headers: {
        'accept': 'application/json',
      },
    });

    nodes.value = response.data["nodes"];
    edges.value = response.data["edges"];
    // 假设 creGraph() 是一个更新图表的函数
    creGraph();
  } catch (error) {
    console.error('Error:', error);
  }
};

// 在组件挂载时初始请求数据
onMounted(() => {
  fetchData();
});

// 使用 watch 监听 props.lang 的变化
watch(() => props.lang, () => {
  fetchData();
});

</script>

<template>
  <div ref="chartRef" class="b1"></div>

</template>

<style>
.b1 {
  margin: 0;
  display: block;
  border: 0;
  padding: 0;
  /* width: 100%; */
  height: calc(100vh - 130px);
  background-color: rgba(240, 196, 196, 0);
  z-index: 0;
}
</style>