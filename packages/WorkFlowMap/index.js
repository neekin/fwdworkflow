import WorkFlowMap from "./src/work-flow-map.vue";

WorkFlowMap.install = (App) => {
  App.component(WorkFlowMap.__name, WorkFlowMap);
};

export default WorkFlowMap;
