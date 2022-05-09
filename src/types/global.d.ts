import { LoDashStatic } from "lodash";

declare global {
  const _: LoDashStatic;

  type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";
  type RoleConstant = "worker" | "harvester" | "carrier";
  type ActionConstant = "build" | "harvest" | "repair" | "transfer" | "upgrade" | "withdraw";

  interface Memory {
    idleTargets: Map<Id<_HasId>, ActionTarget<_HasId>>;
    availableTargets: {
      withdraw: WithdrawActionTarget[];
      harvest: HarvestActionTarget[];
      upgrade: UpgradeActionTarget[];
      repair: RepairActionTarget[];
      build: BuildActionTarget[];
      transfer: TransferActionTarget[];
    };
  }

  interface CreepMemory {
    role: RoleConstant;
    target?: ActionTarget<_HasId>;
  }
}
