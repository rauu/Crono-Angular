export class TaskPostResponse {
  id?: string;
  name?: string;
  description?: string;
  customer?: string;

  constructor(json: TaskPostResponse) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.customer = json.customer;
  }
}
