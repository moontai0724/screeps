interface ActionTarget<T extends _HasId> {
  id: Id<T>;
  pos: RoomPosition;
  action: ActionConstant;
}
