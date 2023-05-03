export default class TargetTaker {
  public static take(creep: Creep): ScreepsReturnCode {
    this.log(creep, "ERROR", "Creep is executing default Role.takeTarget(creep)");
    throw new Error("Not implemented");
  }

  public static log(creep: Creep, level: LogLevel, ...message: string[]): void {
    console.log(`[${level}][ROLE:${creep.memory.role}]`, ...message);
  }
}
