interface WithdrawActionTarget extends ActionTarget<AnyStoreStructure | Tombstone | Ruin> {
  action: "withdraw";
  resourceType: ResourceConstant;
  progress: {
    current: number;
    pending: number;
    final: number;
  };
}
