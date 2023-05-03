import TargetTaker from "./TargetTaker";

export default class HarvesterTargetTaker extends TargetTaker {
  public static take(creep: Creep): ScreepsReturnCode {
    const availableHarvestTargets = Array.from(Memory.targets.available.harvest.values());
    if (!availableHarvestTargets.length) {
      this.log(creep, "INFO", "No any available harvest target");
      return ERR_NOT_FOUND;
    }

    const target = creep.pos.findClosestByPath(availableHarvestTargets);
    if (!target) {
      this.log(creep, "INFO", "No any harvest target is reachable");
      return ERR_INVALID_TARGET;
    }

    creep.memory.target = target;
    Memory.targets.available.harvest.delete(target.id);
    Memory.targets.assigned.set(creep.id, target);

    return OK;
  }
}
