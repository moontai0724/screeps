import ActionExecutor from "./executor/ActionExecutor";
import BuildActionExecutor from "./executor/BuildActionExecutor";
import HarvestActionExecutor from "./executor/HarvestActionExecutor";
import RepairActionExecutor from "./executor/RepairActionExecutor";
import TransferActionExecutor from "./executor/TransferActionExecutor";
import UpgradeActionExecutor from "./executor/UpgradeActionExecutor";
import WithdrawActionExecutor from "./executor/WithdrawActionExecutor";

export default class ActionManager {
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
        throw new Error(`[ERROR] Unknown action: ${action}`);
    }
  }
}
