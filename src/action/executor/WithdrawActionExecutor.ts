import ActionExecutor from "./ActionExecutor";

export default class WithdrawActionExecutor extends ActionExecutor {
  /**
   * Withdraw energy from a container or storage, or clear target when empty
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as WithdrawActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (target.store[RESOURCE_ENERGY] === 0) {
      return this.clearTarget(creep, "target empty");
    }

    if (creep.store.getFreeCapacity() === 0) {
      return this.clearTarget(creep, "creep fulled");
    }

    const result = creep.withdraw(target, RESOURCE_ENERGY);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to withdraw: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
