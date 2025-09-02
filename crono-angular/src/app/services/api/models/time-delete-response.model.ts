export class TimeDeleteResponse {
  message?: string;

  constructor(json: TimeDeleteResponse) {
    this.message = json.message;
  }
}
