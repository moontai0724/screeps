import BasicRequest from "../basic/BasicRequest";

export default class EnergyRequest extends BasicRequest {
  public constructor(public room: Room, public amount: number) {
    super();
  }

  public execute(): ScreepsReturnCode {
    const remainRequired = this.amount - this.room.energyAvailable;
    const unfulfilledExtensions = this.room.find(FIND_MY_STRUCTURES, {
      filter: structure =>
        structure.structureType === STRUCTURE_EXTENSION && (structure.store.getFreeCapacity() ?? 0 > 0),
    });

    if (unfulfilledExtensions.length < 1) {
      console.error("No unfulfilled extensions found in room!");
      throw new Error("No unfulfilled extensions found in room!");
    }
  }
}
