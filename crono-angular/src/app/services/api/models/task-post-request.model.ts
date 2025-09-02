export class TaskPostRequest {
  name?: string;
  description?: string;
  customer?: string;

  constructor(json: TaskPostRequest) {
    this.name = json.name;
    this.description = json.description;
    this.customer = json.customer;
  }
}
