interface BuildActionTarget extends ActionTarget<ConstructionSite> {
  action: "build";
  progress: {
    current: number;
    pending: number;
  };
}
