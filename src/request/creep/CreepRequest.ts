import BasicRequest from "../basic/BasicRequest";
import EnergyRequest from "../energy/EnergyRequest";

export default class CreepRequest extends BasicRequest {
  public constructor(
    public room: Room,
    public body: BodyPartConstant[],
    public role: RoleConstant,
    public name: string,
  ) {
    super();
    if (!name) name = `${role}-${room.name}-${Game.time}`;
  }

  /**
   * Executable function when in a tick loop
   *
   * @returns `ERR_NOT_ENOUGH_ENERGY` if the room does not have enough energy to spawn the creep
   * @returns `OK` when the creep is spawned, or any possible return values of spawn creep method
   */
  public execute(): ScreepsReturnCode {
    if (!this.isRoomEnergyAvailable()) {
      EnergyManager.addRequest(new EnergyRequest(this.room, this.getCost()));

      return ERR_NOT_ENOUGH_ENERGY;
    }

    const spawns = this.room.find(FIND_MY_SPAWNS);
    if (spawns.length < 1) {
      console.error("No spawn found in room!");
      throw new Error("No spawn found in room!");
    }

    const memory: CreepMemory = {
      role: this.role,
      target: null,
    };

    return spawns[0].spawnCreep(this.body, `${this.role}-${this.room.name}`, { memory });
  }

  /**
   * Serialize the creep request to string.
   *
   * @returns The serialized string of the creep request to store in memory
   */
  public serialize(): string {
    return `${this.name}|${this.room.name}|${this.body.join(",")}|${this.role}`;
  }

  /**
   * Parse and get the creep request from the serialized string.
   *
   * @param serialized The serialized string of the creep request
   * @returns The parsed creep request object
   */
  public static deserialize(serialized: string): CreepRequest {
    const [creepName, roomName, rawBodyParts, role] = serialized.split("|");
    const bodyParts = rawBodyParts.split(",") as BodyPartConstant[];

    return new CreepRequest(Game.rooms[roomName], bodyParts, role as RoleConstant, creepName);
  }

  /**
   * Get the cost of the creep spawn.
   *
   * @returns The cost of the creep spawn
   */
  public getCost(): number {
    return this.body.reduce((total, part) => total + BODYPART_COST[part], 0);
  }

  /**
   * Check if the room has enough energy to spawn the creep.
   *
   * @returns true if the room has enough energy to spawn the creep
   */
  public isRoomEnergyAvailable(): boolean {
    return this.room.energyAvailable >= this.getCost();
  }
}
