import ActionExecutor from "./ActionExecutor";

export default class HarvestActionExecutor extends ActionExecutor {
  /**
   * Harvest energy from a source or clear target when no energy is available
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as HarvestActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (creep.store.getCapacity() > 0 && creep.store.getFreeCapacity() === 0) {
      return this.clearTarget(creep, "creep has no more energy");
    }

    if (target instanceof Source && target.energy === 0) {
      // return this.clearTarget(creep, "target source empty");
      this.log(creep, "INFO", "Target source is empty, waiting regeneration: ", target.ticksToRegeneration.toString());
      return OK;
    }

    if (target instanceof Mineral && target.mineralAmount === 0) {
      return this.clearTarget(creep, "target mineral empty");
    }

    if (target instanceof Deposit && target.cooldown > 0) {
      this.log(creep, "INFO", "Deposit is cooling down: ", target.cooldown.toString());
      return OK;
    }

    const result = creep.harvest(target);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to harvest: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
