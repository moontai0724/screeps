import ActionExecutor from "./ActionExecutor";

export default class RepairActionExecutor extends ActionExecutor {
  /**
   * Repair a structure or clear target when fully repaired
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as RepairActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (target.hits === target.hitsMax) {
      return this.clearTarget(creep, "target fully repaired");
    }

    if (creep.store[RESOURCE_ENERGY] === 0) {
      return this.clearTarget(creep, "creep has no more energy");
    }

    const result = creep.repair(target);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to repair: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
