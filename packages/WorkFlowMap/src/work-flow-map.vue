<template>
  <div @click="create">添加节点</div>
  <div @click="remove">删除节点</div>
  <div ref="container" id="container"></div>
</template>

<script setup name="WorkFlowMap">
import G6 from "@antv/g6";
// import data from "./data";
import { defineComponent, nextTick, onMounted, ref, render } from "vue";
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
const currentNode = ref(null);
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
    }
  ],
  edges: [

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
            const owners = model.owners ?? [];
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
  container.value = graph
  graph.on('node:click', (e) => {
    const model = e.item.getModel();
    currentNode.value = model
    console.log(model)
  });

});


const getId = () => {
  let arr = nodesList.nodes.map(item => item.id).sort((a,b)=>a-b)
  return `${parseInt(arr[arr.length - 1]) + 1}`
}

const isParallel = () => {
  if (!currentNode.value) { return }
  const edge = getEdge(currentNode.value.id)
  return nodesList.edges.filter(it => it.source == edge.source).length == 2
}
const getEdge = (id) => {
  if (!id) { return }
  return nodesList.edges.find(item => item.target == id)
}

const renderNode = () => {
  currentNode.value = null
  container.value.data(nodesList)
  container.value.render()
}
const remove = () => {
  if (!currentNode.value) { return }
  removeNode(currentNode.value.id)
}
const removeNode = (id) => {
  let removeEdges = []
  let removeSourceEdges = []
  let removeIndex = []
  let parallel = isParallel()
  nodesList.edges.forEach((item, index) => {
    if (item.target == id) {
      removeEdges.push(item)
      removeIndex.push(index)
      if (parallel) {
        removeIndex.push(nodesList.edges.findIndex(it => it.source == id))
      }
    }
    if (removeEdges.length > 0 && !parallel) {
      if (removeSourceEdges.some(it => {
        return it.target == item.source
      })) {
        removeSourceEdges.push(item)
        removeIndex.push(index)
      }
    }
    if (item.source == id && !parallel) {
      removeSourceEdges.push(item)
      removeIndex.push(index)
    }
  })

  removeEdges = removeEdges.concat(removeSourceEdges)
  let removeIds = Array.from(new Set(removeEdges.map(item => item.target)))
  if(removeIds.length==0){
    removeIds.push(currentNode.value.id)
  }
  nodesList.nodes = nodesList.nodes.filter(item => !removeIds.includes(item.id))
  removeIndex.forEach(item => {
    nodesList.edges[item] = null
  })

  nodesList.edges = nodesList.edges.filter(item => item != null)
  renderNode()
}

const create = () => {
  if(!currentNode.value){return}
  let node = createNode()
  nodesList.nodes.push(node)
  let edge = nodesList.edges.find(item => item.source == currentNode.value.id)
  let index = nodesList.edges.findIndex(item => item.source == currentNode.value.id)
  let target = edge?.target
  nodesList.edges.forEach(item => {
    if (item.target == target) {
      item.target = node.id
    }
  })
  let newEdge = {
    source: node.id,
    target: target
  }
  if(!target){
    newEdge.source = currentNode.value.id
    newEdge.target = node.id
    nodesList.edges.push(newEdge)
  }else{
    console.log(index,nodesList.edges.length)
    nodesList.edges.splice(index,0,newEdge)
  }
  renderNode()
}
const createNode = () => {
  let id = getId()
  return {
    id: id,
    label: id,
    owners: [
    ],
    style: {
    },
  }
}

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
