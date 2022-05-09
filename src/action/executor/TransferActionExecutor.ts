import ActionExecutor from "./ActionExecutor";

export default class TransferActionExecutor extends ActionExecutor {
  /**
   * Transfer energy to a target or clear target when fulled
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as TransferActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (target.store.getFreeCapacity() === 0) {
      return this.clearTarget(creep, "target fulled");
    }

    if (creep.store[RESOURCE_ENERGY] === 0) {
      return this.clearTarget(creep, "creep has no more energy");
    }

    const result = creep.transfer(target, RESOURCE_ENERGY);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to transfer: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
