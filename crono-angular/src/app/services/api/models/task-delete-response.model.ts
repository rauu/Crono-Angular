export class TaskDeleteResponse {
  message?: string;

  constructor(json: TaskDeleteResponse) {

    this.message = json.message;

  }
}
