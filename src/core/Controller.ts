export default class Controller {
  public static log(level: LogLevel, ...message: string[]): void {
    console.log(`[${level}][CONTROLLER:${this.name}]`, ...message);
  }
}
