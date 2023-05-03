interface TransferActionTarget extends ActionTarget<Creep | PowerCreep | AnyStoreStructure> {
  action: "transfer";
  resourceType: ResourceConstant;
  progress: {
    current: number;
    pending: number;
    final: number;
  };
}
