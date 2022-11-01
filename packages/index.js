import WorkFlowMap from "./WorkFlowMap";

export { WorkFlowMap };

const components = [WorkFlowMap];

const install = (App) => {
  components.forEach((item) => {
    App.components(item.__name, item);
  });
};

export default {
  install,
};
