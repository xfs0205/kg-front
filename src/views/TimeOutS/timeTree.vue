<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { request_time } from '../../utils/request'
import { useTokenStore } from '@/stores/loginToken'
import axios from 'axios'
import tree from './timetree.json'
import * as d3 from 'd3'

const store = useTokenStore()
// 获取时间
const scrollbarRef = ref(null);


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


onMounted(async () => {

  const chartDom = document.getElementById('main')
  if (!chartDom) return
  // const myChart = echarts.init(chartDom)
  let data // 声明数据变量
  // myChart.showLoading() // 显示加载动画
  data = tree

  if (!container.value) return;
  // 定义初始平移偏移量
  const initialTranslateX = 0;
  const initialTranslateY = -1200;
  const containerNode = container.value;
  let isLeftMouseDown = false;
  let lastMouseY = 0;
  let lastMouseX = 0;

  // 创建 SVG 容器
  const svg = d3.select(containerNode)
    .append("svg")
    .attr("width", 5800)
    .attr("height", 5800)
    .attr("transform", `translate(${initialTranslateX},${initialTranslateY})`);

  const drag = d3.drag()
    .on("start", function (event) {
      isLeftMouseDown = true;
      lastMouseX = event.x;
      lastMouseY = event.y;
      svg.style("cursor", "grabbing");
    })
    .on("drag", function (event) {
      if (isLeftMouseDown) {
        const deltaX = event.x - lastMouseX;
        const deltaY = event.y - lastMouseY;

        // 将SVG中的所有元素一起移动
        svg.attr("transform", function () {
          const currentTransform = d3.select(this).attr("transform");
          const translateRegex = /translate\(([-.\d]+),([-.\d]+)\)/;
          const match = translateRegex.exec(currentTransform);
          if (match) {
            const currentX = parseFloat(match[1]);
            const currentY = parseFloat(match[2]);
            const newX = currentX + deltaX;
            const newY = currentY + deltaY;
            return `translate(${newX},${newY})`;
          } else {
            return `translate(${deltaX},${deltaY})`;
          }
        });

        lastMouseX = event.x;
        lastMouseY = event.y;
      }
    })
    .on("end", function (event) {
      isLeftMouseDown = false;
      svg.style("cursor", "default");
    });
  // 禁止右键默认菜单
  svg.on('contextmenu', function (event) {
    event.preventDefault();
  });


  // 缩放 containerNode
  containerNode.style.transform = `scale(${0.6})`;
  // 初始缩放比例
  let scale = 1;
  // 监听滚轮事件
  containerNode.addEventListener('wheel', function (event) {
    // 检测滚轮方向
    const delta = Math.sign(event.deltaY);

    // 调整缩放比例
    if (delta > 0) {
      scale *= 0.9; // 缩小容器
    } else {
      scale *= 1.1; // 放大容器
    }

    // 缩放 containerNode
    containerNode.style.transform = `scale(${scale})`;

    // 防止滚动事件冒泡
    event.preventDefault();
  });



  const k_x = 50
  const k_y = 1400
  const p_x = 80

  // 计算时间轴上的位置
  var xScale = d3.scaleLinear()
    .domain([1921, 2024]) // 根据实际数据范围设定
    .range([50, 750]); // 根据SVG宽度设定

  // 绘制时间轴
  svg.append("line")
    .attr("x1", 50)
    .attr("y1", k_y)
    .attr("x2", 5750)
    .attr("y2", k_y)
    .attr("stroke", "black")
    .attr("stroke-width", 10);

  var offsetX = 500; // 初始偏移量
  data.forEach(function (d, index) {
    var time = parseInt(d.time);
    var xPos = xScale(time) + index * offsetX; // 根据索引动态计算偏移量
    // 绘制时间节点
    var circle = svg.append("circle")
      .attr("cx", xPos)
      .attr("cy", k_y)
      .attr("r", 15)
      .attr("fill", "red")
      .on("mouseover", function () {
        // 当鼠标悬停在圆圈上时，改变鼠标样式为小手
        d3.select(this)
          .style("cursor", "pointer")
          .attr("r", 20); // 改变圆圈的半径为10
      })
      .on("mouseout", function () {
        // 当鼠标离开圆圈时，将半径改回原来的大小
        d3.select(this)
          .attr("r", 15); // 改变圆圈的半径为5
      });


    svg.append("text")
      .attr("x", xPos)
      .attr("y", k_y - 10)
      .text(d.time)

    let time_nodes: any[] = []
    let p_y = 0
    // 绘制纵向数据
    d.titles.forEach(function (title, i) {
      var y1, y2: number
      if (!(index % 2)) {
        y1 = k_y + 4
        y2 = k_y + 56 + i * 50 + p_y+150
      }
      else {
        y1 = k_y - 4
        y2 = k_y - 56 - i * 50 - p_y-150
      }
      var truncatedTitle = title.title.substring(0, 4); // 对标题进行截断操作
      const points = [
        [xPos, y1],
        [xPos, y2],
        [xPos + 50, y2]
      ];

      const lineGenerator = d3.line()

      var time_node = svg.append("g")

      time_node.append("path")
        .attr("d", lineGenerator(points))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      time_node.append("text")
        .attr("x", xPos + 12)
        .attr("y", y2 - 15)
        .text(truncatedTitle + "···");

      var node = time_node.append("g")

      var nc = node.append("circle")
        .attr("cx", xPos + 50)
        .attr("cy", y2)
        .attr("r", 5)
        .attr("fill", "red")
        .on("mouseover", function () {
          // 当鼠标悬停在圆圈上时，改变鼠标样式为小手
          d3.select(this)
            .style("cursor", "pointer")
            .attr("r", 10); // 改变圆圈的半径为10
        })
        .on("mouseout", function () {
          // 当鼠标离开圆圈时，将半径改回原来的大小
          d3.select(this)
            .attr("r", 5); // 改变圆圈的半径为5
        });



      if (title.grade == 1) {
        var infoGroup = node.append("g")
          .attr("class", "info-group")
          .attr("transform", "translate(" + (xPos + 50) + "," + y2 + ")"); // 使 info 节点偏移以防重叠
        // 遍历 info 对象的属性
        let pp_y = 0
        // Object.keys(title.info).forEach((key, ii) => {
        //   let pp: any[] = []
        //   if (!(index % 2)) {
        //     pp = [
        //       [4, 0],
        //       [34, 0],
        //       [34, ii * 35+pp_y],
        //       [42, ii * 35+pp_y]
        //     ]
        //   }
        //   else {
        //     pp = [
        //       [4, 0],
        //       [34, 0],
        //       [34, -ii * 35+pp_y],
        //       [42, -ii * 35+pp_y]
        //     ]
        //   }

        //   infoGroup.append("path")
        //     .attr("d", lineGenerator(pp))
        //     .attr("fill", "none")
        //     .attr("stroke", "black")
        //     .attr("stroke-width", 2);

        //   infoGroup.append("text")
        //     .attr("x", 38)
        //     .attr("y", pp[3][1])
        //     .text(title.info[key]);
        // });
        Object.keys(title.info).forEach((key, ii) => {
          let text = info_zh(key) + title.info[key];
          let pp: any[] = [];
          let lineLength = 25; // 设置每行的字符数

          // 计算字符串的行数
          let lines = Math.ceil(text.length / lineLength);

          // 遍历每一行
          for (let i = 0; i < lines; i++) {
            let start = i * lineLength;
            let end = start + lineLength;
            let subText = text.substring(start, end);
            let yOffset = i * 35;
            let kong = 0
            if (i != 0) {
              kong = 44
            }

            if (!(index % 2)) {
              pp = [
                [4, 0],
                [34, 0],
                [34, -90+yOffset + pp_y],
                [42, -90+yOffset + pp_y]
              ];
            } else {
              pp = [
                [4, 0],
                [34, 0],
                [34, 90-yOffset - pp_y],
                [42, 90-yOffset - pp_y]
              ];
            }

            infoGroup.append("path")
              .attr("d", lineGenerator(pp))
              .attr("fill", "none")
              .attr("stroke", "black")
              .attr("stroke-width", 2);

            infoGroup.append("text")
              .attr("x", 38 + kong)
              .attr("y", pp[3][1])
              .text(subText);
          }

          // 更新垂直偏移量
          pp_y += lines * 35;

        });
        p_y += pp_y
        node.on("click", function () {
          var displayMode = infoGroup.style("display") === "none" ? "block" : "none";
          infoGroup.style("display", displayMode)
        })

      }
      else if (title.grade == 2) {
        let infoGroups: any[] = []
        let pp_y = 0
        title.info.forEach((info: { info: { [x: string]: string }; title: string }, ii: number) => {
          var infoGroup = node.append("g")
            .attr("class", "info-group")
            .attr("transform", "translate(" + (xPos + 50) + "," + y2 + ")"); // 使 info 节点偏移以防重叠
          let pp = []
          console.log("第", ii, "次：", pp_y)
          if (!(index % 2)) {
            pp = [
              [4, 0],
              [40, 0],
              [40, -130+ii * 35 + pp_y],
              [90, -130+ii * 35 + pp_y]
            ]
          }
          else {
            pp = [
              [4, 0],
              [45, 0],
              [45, 90-ii * 35 - pp_y],
              [90, 90-ii * 35 - pp_y]
            ]
          }
          console.log("第", ii, "次：", pp)

          // pp_y += 7 * Object.keys(info.info).length + (Object.keys(info.info).length - 1) * 35
          infoGroup.append("path")
            .attr("d", lineGenerator(pp))
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2);

          infoGroup.append("text")
            .attr("x", pp[2][0] + 12)
            .attr("y", pp[3][1] - 15)
            .text(info.title.substring(0, 4) + "···");

          var info_node = infoGroup.append("g")
          info_node.append("circle")
            .attr("cx", pp[3][0] + 3)
            .attr("cy", pp[3][1])
            .attr("r", 5)
            .attr("fill", "red")
            .on("mouseover", function () {
              // 当鼠标悬停在圆圈上时，改变鼠标样式为小手
              d3.select(this)
                .style("cursor", "pointer")
                .attr("r", 10); // 改变圆圈的半径为10
            })
            .on("mouseout", function () {
              // 当鼠标离开圆圈时，将半径改回原来的大小
              d3.select(this)
                .attr("r", 5); // 改变圆圈的半径为5
            });

          var info_infoGroup = info_node.append("g")
            .attr("class", "info-info-group")
            .attr("transform", "translate(" + (pp[3][0] + 2) + "," + pp[3][1] + ")");

          info_node.on("click", function () {
            var displayMode = info_infoGroup.style("display") === "none" ? "block" : "none";
            info_infoGroup.style("display", displayMode)
          })
          let ppp_y = 0
          Object.keys(info.info).forEach((key, iii) => {
            let text = info_zh(key) + info.info[key];
            let ppp: any[] = [];
            let lineLength = 25; // 设置每行的字符数

            // 计算字符串的行数
            let lines = Math.ceil(text.length / lineLength);
            for (let i = 0; i < lines; i++) {
              let start = i * lineLength;
              let end = start + lineLength;
              let subText = text.substring(start, end);
              let yOffset = i * 35;
              let kong = 0
              if (i != 0) {
                kong = 44
              }
              if (!(index % 2)) {
                ppp = [
                  [4, 0],
                  [34, 0],
                  [34, -70+yOffset + ppp_y],
                  [42, -70+yOffset + ppp_y]
                ];
              } else {
                ppp = [
                  [4, 0],
                  [34, 0],
                  [34, 70-yOffset - ppp_y],
                  [42, 70-yOffset - ppp_y]
                ];
              }

              info_infoGroup.append("path")
                .attr("d", lineGenerator(ppp))
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2);

              info_infoGroup.append("text")
                .attr("x", 38 + kong)
                .attr("y", ppp[3][1])
                .text(subText);
            }

            // 更新垂直偏移量
            ppp_y += lines * 35;

          })
          pp_y += ppp_y

          infoGroups.push(infoGroup)
        })
        p_y += pp_y
        nc.on("click", function () {
          var displayMode = infoGroups[0].style("display") === "none" ? "block" : "none";
          infoGroups.forEach((infoGroup) => {
            infoGroup.style("display", displayMode)
          })
        })
      }



      time_nodes.push(time_node)
    });
    circle.on("click", function () {

      var displayMode = time_nodes[0].style("display") === "none" ? "block" : "none";
      time_nodes.forEach((time_node) => {
        time_node.style("display", displayMode)
      })
    });
  });


  // 应用拖拽行为到 SVG 元素
  svg.call(drag);


})
</script>



<template>
  <el-scrollbar ref="scrollbar">
    <div ref="container" id="main" style="height: calc(100vh - 200px)"></div>
  </el-scrollbar>
</template>


<style lang="scss" scoped>
#main {
  user-select: none;
  /* 禁止文本选择 */
}
</style>
