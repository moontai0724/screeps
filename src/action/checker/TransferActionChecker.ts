import ActionChecker from "./ActionChecker";

export default class TransferActionChecker extends ActionChecker {
  public static check(action: TransferActionTarget): ScreepsReturnCode {
    const target = Game.getObjectById(action.id);
  }
}
