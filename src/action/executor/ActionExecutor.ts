export default class ActionExecutor {
  protected static MOVE_OPTIONS = {
    visualizePathStyle: { stroke: "#ffaa00" },
    reusePath: 5,
  };

  public static run(creep: Creep): ScreepsReturnCode {
    this.log(creep, "ERROR", "Creep is executing default Action.run(creep)");
    throw new Error("Not implemented");
  }

  public static getName(): string {
    return this.prototype.constructor.name;
  }

  public static clearTarget(creep: Creep, reason: string): ScreepsReturnCode {
    this.log(creep, "INFO", `Clearing target because ${reason}`);
    delete creep.memory.target;
    return OK;
  }

  public static log(creep: Creep, level: LogLevel, ...message: string[]): void {
    console.log(`[${level}][ACTION:${creep.memory.target?.action}]`, ...message);
  }
}
