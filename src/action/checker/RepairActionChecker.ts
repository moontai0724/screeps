import ActionChecker from "./ActionChecker";

export default class RepairActionChecker extends ActionChecker {
  public static check(action: RepairActionTarget): ScreepsReturnCode {
    const target = Game.getObjectById(action.id);
  }
}
