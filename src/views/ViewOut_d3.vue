<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, defineEmits } from 'vue'
import { request_per } from "../utils/request";

// const data = {
//   nodes: [
//     { id: '1', name: "11111", type: "person", info: "nihaohdhfaooahfhdhuahaosh" },
//     { id: '2', name: "22222", type: "person", options: ['Option 3', 'Option 4'] },
//     { id: '3', name: "33333", type: "person", options: ['Option 1', 'Option 2'] },
//     { id: '4', name: "44444", type: "place", options: ['Option 3', 'Option 4'] },
//     { id: '5', name: "55555", type: "person", options: ['Option 1', 'Option 2'] },
//     { id: '6', name: "66666", type: "person", options: ['Option 3', 'Option 4'] },
//     { id: '7', name: "77777", type: "person", options: ['Option 1', 'Option 2'] },
//     { id: '8', name: "88888", type: "place", options: ['Option 3', 'Option 4'] }
//   ],
//   links: [
//     { source: '1', target: '2' },
//     { source: '1', target: '3' },
//     { source: '1', target: '4' },
//     { source: '5', target: '2' },
//     { source: '3', target: '6' },
//     { source: '7', target: '8' },
//     { source: '1', target: '8' },
//   ]
// };

const data = ref({
  nodes:[],
  edges:[]
})



const drag = (simulation: { alphaTarget: (arg0: number) => { (): any; new(): any; restart: { (): void; new(): any; }; }; }) => {

  function dragstarted(event: { active: any; }, d: { fx: any; x: any; fy: any; y: any; }) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: { x: any; y: any; }, d: { fx: any; fy: any; }) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: { active: any; }, d: { fx: null; fy: null; }) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

function setNodeFill(selection: { attr: (arg0: string, arg1: (d: { type: string; }) => "rgb(239, 127, 127)" | "rgb(127, 127, 239)" | "rgb(127, 239, 127)" | "#fff") => void; }) {
  selection.attr("fill", function (d: { type: string; }) {
    if (d.type === 'person') {
      return "rgb(239, 127, 127)";
    } else if (d.type === 'place') {
      return "rgb(127, 127, 239)";
    } else if (d.type === '') {
      return "rgb(127, 239, 127)";
    } else {
      return "#fff";
    }
  });
}

const jjj = ref<HTMLElement>()
const emit = defineEmits(["info"])
onMounted(() => {
  request_per({
    method: 'GET',
    url: '/backend/groups/person'
  }).then((res) => {
    data.value.nodes = res.data['nodes']
    data.value.links = res.data['edges']
    console.log(data.value)
    if (jjj.value) {

      const width = 1200;
      const height = 600;
      const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .on("click", function (event: { target: { closest: (arg0: string) => any; }; }) {
          // 检查点击的目标是否是节点
          if (!event.target.closest("circle")) {
            const idata = {
              open: false
            }
            emit("info", idata)
          }
        })
        .attr("style", "max-width: 100%; height: 100%;");

      jjj.value.appendChild(svg.node());

      const simulation = d3.forceSimulation(data.value.nodes)
        .force("link", d3.forceLink(data.value.links).id((d: { id: any; }) => d.id).distance(250).strength(1))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(data.value.links)
        .join("line");

      const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "rgba(0,0,0,0.2)")
        .attr("stroke-width", 5)
        .selectAll("circle")
        .data(data.value.nodes)
        .join("circle")
        .attr("stroke", "rgba(0,0,0,0.2)")
        .attr("r", 25)
        .on("mouseover", function () {
          d3.select(this)
            .style("cursor", "pointer")
        })
        .on("click", function () {
          var node = d3.select(this).datum()
          const idata = {
            open: true,
            mess: node
          }
          emit("info", idata)
        })
        .call(drag(simulation))
        .call(setNodeFill);


      const text = svg.append("g")
        .selectAll("text")
        .data(data.value.nodes)
        .join("text")
        .attr("dy", "3")
        .attr("dx", "-15")
        .text((d: { name: any; }) => d.name)
        .on("mouseover", function () {
          d3.select(this)
            .style("cursor", "pointer")
        })
        .call(drag(simulation));



      simulation.on("tick", () => {
        link
          .attr("x1", (d: { source: { x: any; }; }) => d.source.x)
          .attr("y1", (d: { source: { y: any; }; }) => d.source.y)
          .attr("x2", (d: { target: { x: any; }; }) => d.target.x)
          .attr("y2", (d: { target: { y: any; }; }) => d.target.y);

        node
          .attr("cx", (d: { x: any; }) => d.x)
          .attr("cy", (d: { y: any; }) => d.y);

        text
          .attr("x", (d: { x: any; }) => d.x)
          .attr("y", (d: { y: any; }) => d.y);
      });
    }

  }).catch((error) => {
    // 处理任何可能出现的错误
    console.error("There was an error fetching the buttons data:", error);
  });

})

</script>

<template>
  <div ref="jjj" style="user-select: none;margin-left: 0;"></div>
</template>

<style scoped>
.place-info {
  border-radius: 3px;
  height: 600px;
  width: 400px;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0);
  border: 2px solid black;
  /* 添加此行以显示边框 */
}
</style>
