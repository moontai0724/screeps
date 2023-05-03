import ActionManager from "action/ActionManager";
import Controller from "./Controller";

export default class TargetController extends Controller {
  public static execute() {
    for (const target of Memory.targets.idle.values()) {
      const action = ActionManager.getChecker(target.action);
      const obj = Game.getObjectById(target.id);
      if (!obj) {
        Memory.targets.idle.delete(target.id);
        this.log("INFO", `Target ${target.id} not found, clearing it from idle list`);
        continue;
      }
    }
  }
}
