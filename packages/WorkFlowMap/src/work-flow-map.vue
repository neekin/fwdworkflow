<template>
  <div @click="add">添加节点1</div>
  <div ref="container" id="container"></div>
</template>

<script setup name="WorkFlowMap">
import G6 from "@antv/g6";
// import data from "./data";
import { defineComponent, nextTick, onMounted, ref  } from "vue";
const props = defineProps({
  foo: String
})
const fittingString = (str, maxWidth, fontSize) => {
  const ellipsis = "...";
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
  str.split("").forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};

const globalFontSize = 12;

const container = ref(null);

const nodesList = {
  nodes: [
    {
      id: "0",
      label:
        "1. Dr.xalkdfjladdddxdkdf... \n2. Klajdflkadsjflkdjsfkasj... \n ...",
      owners: [
        { role: "DR", name: "xxxxxxxxxxxxxxxxxxxx" },
        { role: "admin", name: "yyyyyyyyyyyyyyyyyyyyyy" },
        { role: "xxxx", name: "yyyyyyyyyyyyyyyyyyyyyy" },
      ],
      style: {
        stroke: "#5B8FF9",
        fill: "#0094ff",
      },
    },
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
    {
      id: "3",
      label: "3",
    },
    {
      id: "4",
      label: "4",
    },
    {
      id: "5",
      label: "5",
    },
    {
      id: "6",
      label: "6",
    },
    {
      id: "7",
      label: "7",
    },
  ],
  edges: [
    {
      source: "0",
      target: "1",
    },
    {
      source: "0",
      target: "2",
    },
    {
      source: "1",
      target: "3",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "3",
      target: "4",
    },
    {
      source: "4",
      target: "5",
    },
    {
      source: "4",
      target: "6",
    },
    {
      source: "5",
      target: "7",
    },
    {
      source: "6",
      target: "7",
    },
  ],
};

onMounted(() => {
  const graph = new G6.Graph({
    container: "container",
    width: 800,
    height: 600,
    fitView: true,
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "click-select",
        {
          type: "tooltip",
          formatText(model) {
            const owners = model.owners;
            const text = [];
            owners.forEach((row) => {
              text.push(row.role + ":" + row.name + "<br>");
            });
            return text.join("\n");
          },
          offset: 30,
          textAlign: "left",
        },
      ],
    },
    layout: {
      type: "dagre",
      rankdir: "LR",
      controlPoints: true,
      nodesepFunc: () => 30,
      ranksepFunc: () => 30,
    },
    defaultNode: {
      type: "rect",
      size: [180, 60],
      style: {
        lineWidth: 2,
        stroke: "#5B8FF9",
        fill: "#C6E5FF",
        radius: 8,
      },
      labelCfg: {
        style: {
          fill: "#000",
          fontSize: 12,
          textAlign: "left",
          textBaseline: "middle",
          fontWeight: "bold",
        },
        position: "left",
        offset: -8,
      },
    },
    defaultEdge: {
      type: "polyline",
      size: 1,
      color: "#e2e2e2",
      style: {
        endArrow: true,
        // startArrow: true,
        radius: 20,
      },
    },
  });

  graph.data(nodesList);
  graph.render();
});
</script>

<style>
.g6-tooltip {
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
  background-color: #000;
  padding: 2px 8px;
  text-align: center;
  text-align: left;
}
</style>
