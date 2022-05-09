import ActionExecutor from "./ActionExecutor";

export default class UpgradeActionExecutor extends ActionExecutor {
  /**
   * Upgrade the controller
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as UpgradeActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (creep.store[RESOURCE_ENERGY] === 0) {
      return this.clearTarget(creep, "creep has no more energy");
    }

    const result = creep.upgradeController(target);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to upgrade: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
