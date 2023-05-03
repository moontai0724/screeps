import {
  ActionChecker,
  BuildActionChecker,
  HarvestActionChecker,
  RepairActionChecker,
  TransferActionChecker,
  UpgradeActionChecker,
  WithdrawActionChecker,
} from "./checker";
import {
  ActionExecutor,
  BuildActionExecutor,
  HarvestActionExecutor,
  RepairActionExecutor,
  TransferActionExecutor,
  UpgradeActionExecutor,
  WithdrawActionExecutor,
} from "./executor";

export default class ActionManager {
  public static init(force = false): void {
    if (Memory.targets && !force) return;

    Memory.targets = {
      assigned: new Map(),
      idle: new Map(),
      available: {
        withdraw: new Map(),
        harvest: new Map(),
        upgrade: new Map(),
        repair: new Map(),
        build: new Map(),
        transfer: new Map(),
      },
    };
  }

  public static getChecker(action: ActionConstant): typeof ActionChecker {
    switch (action) {
      case "build":
        return BuildActionChecker;
      case "harvest":
        return HarvestActionChecker;
      case "repair":
        return RepairActionChecker;
      case "transfer":
        return TransferActionChecker;
      case "upgrade":
        return UpgradeActionChecker;
      case "withdraw":
        return WithdrawActionChecker;
      default:
        throw new Error(`[ERROR] Getting checker of unknown action: ${action}`);
    }
  }

  public static getExecutor(action: ActionConstant): typeof ActionExecutor {
    switch (action) {
      case "build":
        return BuildActionExecutor;
      case "harvest":
        return HarvestActionExecutor;
      case "repair":
        return RepairActionExecutor;
      case "transfer":
        return TransferActionExecutor;
      case "upgrade":
        return UpgradeActionExecutor;
      case "withdraw":
        return WithdrawActionExecutor;
      default:
        throw new Error(`[ERROR] Getting executor of unknown action: ${action}`);
    }
  }
}
