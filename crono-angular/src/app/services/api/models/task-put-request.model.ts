export class TaskPutRequest {
  name?: string;
  description?: string;
  customer?: string;

  constructor(json: TaskPutRequest) {
    this.name = json.name;
    this.description = json.description;
    this.customer = json.customer;
  }
}
