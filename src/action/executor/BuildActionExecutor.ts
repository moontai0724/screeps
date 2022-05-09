import ActionExecutor from "./ActionExecutor";

export default class BuildActionExecutor extends ActionExecutor {
  /**
   * Build a construction site or clear target when finished
   * @param {Creep} creep
   */
  public static run(creep: Creep): ScreepsReturnCode {
    const targetId = (creep.memory.target as BuildActionTarget).id;
    const target = Game.getObjectById(targetId);

    if (!target) {
      return this.clearTarget(creep, "target not found");
    }

    if (target.progress === target.progressTotal) {
      return this.clearTarget(creep, "target finished");
    }

    if (creep.store[RESOURCE_ENERGY] === 0) {
      return this.clearTarget(creep, "creep has no more energy");
    }

    const result = creep.build(target);

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(target, this.MOVE_OPTIONS);
    }

    if (result !== OK) {
      this.log(creep, "ERROR", "Failed to build: ", result.toString(), JSON.stringify(creep));
    }

    return result;
  }
}
