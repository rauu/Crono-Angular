export class TaskGetResponse {
  id?: string;
  name?: string;
  description?: string;
  customer?: string;

  constructor(json: TaskGetResponse) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.customer = json.customer;
  }
}
