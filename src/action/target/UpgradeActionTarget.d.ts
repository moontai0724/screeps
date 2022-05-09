interface UpgradeActionTarget extends ActionTarget<StructureController> {
  action: "upgrade";
  progress: {
    current: number;
    pending: number;
  };
}
