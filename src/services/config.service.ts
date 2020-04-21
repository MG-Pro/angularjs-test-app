export default class ConfigService {
  private _priorityGamesId: string[] = [
    "1477175", "1535560", "1544893", "1528769", "99767"
  ]

  get priorityGamesId() {
    return this._priorityGamesId.slice(0, 5)
  }
}
