interface RepairActionTarget extends ActionTarget<Structure> {
  action: "repair";
  progress: {
    current: number;
    pending: number;
    final: number;
  };
}
