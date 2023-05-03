import ActionChecker from "./ActionChecker";

export default class UpgradeActionChecker extends ActionChecker {
  public static check(action: UpgradeActionTarget): ScreepsReturnCode {
    const target = Game.getObjectById(action.id);
  }
}
