import ActionChecker from "./ActionChecker";

export default class WithdrawActionChecker extends ActionChecker {
  public static check(action: WithdrawActionTarget): ScreepsReturnCode {
    const target = Game.getObjectById(action.id);
  }
}
