export default class ActionChecker {
  public static check(actionTarget: ActionTarget<_HasId>): ScreepsReturnCode {
    this.log(actionTarget, "ERROR", "Checking actionTarget by using default Checker.check(actionTarget)");
    throw new Error("Not implemented");
  }

  public static getName(): string {
    return this.prototype.constructor.name;
  }

  public static log(actionTarget: ActionTarget<_HasId>, level: LogLevel, ...message: string[]): void {
    console.log(`[${level}][ACTION:${actionTarget.action}]`, ...message);
  }
}
