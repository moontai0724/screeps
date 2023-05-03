export default class BasicRequest {
  public static process(request: BasicRequestData): void {
    this.log(request, "ERROR", "Processing request by using default Request.process(request)");
    throw new Error("Not implemented");
  }

  public static getName(): string {
    return this.prototype.constructor.name;
  }

  public static log(actionTarget: BasicRequestData, level: LogLevel, ...message: string[]): void {
    console.log(`[${level}][REQUEST:${actionTarget.type}]`, ...message);
  }
}
