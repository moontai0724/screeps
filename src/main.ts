import ActionManager from "action/ActionManager";
import CreepController from "core/CreepController";
import { ErrorMapper } from "utils/ErrorMapper";
import TargetController from "core/TargetController";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  if (Game.time % 20 === 0) every20Ticks();

  everyTick();
});

function every20Ticks() {
  ActionManager.init();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

function everyTick() {
  TargetController.execute();
  CreepController.execute();
}
