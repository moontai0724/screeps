import ActionChecker from "./ActionChecker";

export default class HarvestActionChecker extends ActionChecker {
  public static check(action: HarvestActionTarget): ScreepsReturnCode {
    const source = Game.getObjectById(action.id);
    if (!source) {
      this.log(action, "ERROR", "Target not found!");
      return ERR_NOT_FOUND;
    }
  }

  /**
   * To judge is there already has container nearby or not, which is needed to collect dropped sources harvested by harvester.
   *
   * @throws When there are more than one container nearby
   *
   * @returns null when no container is found
   */
  public static getNearbyContainer(source: Source): StructureContainer | ConstructionSite | null {
    const structures = [
      ...source.pos.findInRange<StructureContainer>(FIND_STRUCTURES, 1),
      ...source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1),
    ].filter(structure => structure.structureType === STRUCTURE_CONTAINER);

    if (structures.length > 1) {
      console.error("Containers or its construction sites nearby energy source is more than one!", source);
      throw new Error("Containers or its construction sites nearby energy source is more than one!");
    }

    return structures.length ? structures[0] : null;
  }

  /**
   * Get empty plain positions nearby the energy source.
   */
  public static getNearbyEmptyPlain(source: Source): RoomPosition[] {
    const area = source.room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1);

    const emptyArea = [];

    for (const y in area) {
      const yArea = area[y];
      for (const x in yArea) {
        const position = yArea[x];
        if (position.length > 1) continue;

        const terrain = position.find(pos => pos.type === "terrain");
        if (!terrain) continue;
        if (terrain.terrain !== "plain") continue;

        emptyArea.push(new RoomPosition(parseInt(x, 10), parseInt(y, 10), source.room.name));
      }
    }

    return emptyArea;
  }

  /**
   * Set a construction site to build container.
   *
   * @param positions Possible positions to place construction sites
   *
   * @returns Result of placement
   */
  public static setContainerConstructionSite(positions: RoomPosition[]): ScreepsReturnCode {
    const result = positions[0].createConstructionSite(STRUCTURE_CONTAINER);

    if (result !== OK) {
      console.error("Failed to set container construction site!", result, positions[0]);
    }

    return result;
  }
}
