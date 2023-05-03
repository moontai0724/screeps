interface HarvestActionTarget extends ActionTarget<Source | Mineral | Deposit> {
  action: "harvest";
  resourceType: ResourceConstant;
}
