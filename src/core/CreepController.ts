import ActionManager from "action/ActionManager";
import Controller from "./Controller";

export default class CreepController extends Controller {
  public static creepAmount: { [key in RoleConstant]: number } = {
    harvester: 0,
    worker: 0,
    carrier: 0,
  };

  public static execute(): void {
    for (const creep of Object.values(Game.creeps)) {
      this.creepAmount[creep.memory.role]++;
      if (creep.memory.target) {
        const action = ActionManager.getExecutor(creep.memory.target.action);
        action.run(creep);
        continue;
      }
      if (creep.spawning) continue;

      // Todo: Get target task here
      creep.memory.target = { id: "" as Id<Source>, pos: creep.pos, action: "harvest" };

      creep.say(`🔄 ${creep.memory.target.action}`);
      console.log(`${creep.name} is going to ${creep.memory.target.action}`, JSON.stringify(creep.memory.target));
    }
  }
}
