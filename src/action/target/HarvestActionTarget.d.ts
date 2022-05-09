interface HarvestActionTarget extends ActionTarget<Source | Mineral | Deposit> {
  action: "harvest";
  resourceType: ResourceConstant;
  progress: {
    current: number;
    pending: number;
  };
}
