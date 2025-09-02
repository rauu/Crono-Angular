export class TimeDeleteRequest {
  id?: string;

  constructor(json: TimeDeleteRequest) {
    this.id = json.id;
  }
}
