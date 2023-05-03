import { LoDashStatic } from "lodash";

declare global {
  const _: LoDashStatic;

  type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";
  type RoleConstant = "carrier" | "harvester" | "worker";
  type ActionConstant = "build" | "harvest" | "repair" | "transfer" | "upgrade" | "withdraw";
  type RequestTypeConstant = "creep" | "energy";

  interface Memory {
    targets: {
      assigned: Map<Id<Creep>, ActionTarget<_HasId>>;
      idle: Map<Id<_HasId>, ActionTarget<_HasId>>;
      available: {
        withdraw: Map<Id<_HasId>, WithdrawActionTarget>;
        harvest: Map<Id<_HasId>, HarvestActionTarget>;
        upgrade: Map<Id<_HasId>, UpgradeActionTarget>;
        repair: Map<Id<_HasId>, RepairActionTarget>;
        build: Map<Id<_HasId>, BuildActionTarget>;
        transfer: Map<Id<_HasId>, TransferActionTarget>;
      };
    };
    requests: {
      [key in RequestTypeConstant]: BasicRequestData;
    };
  }

  interface CreepMemory {
    role: RoleConstant;
    target?: ActionTarget<_HasId> | null;
  }
}
