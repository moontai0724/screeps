import ActionChecker from "./ActionChecker";

export default class BuildActionChecker extends ActionChecker {
  public static check(action: BuildActionTarget): ScreepsReturnCode {
    const target = Game.getObjectById(action.id);
  }
}
