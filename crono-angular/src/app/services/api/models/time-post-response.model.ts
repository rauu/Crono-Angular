export class TimePostResponse {
  id?: string;
  description?: string;
  begin_date?: string;
  end_date?: string | null;

  constructor(json: TimePostResponse) {
    this.id = json.id;
    this.description = json.description;
    this.begin_date = json.begin_date;
    this.end_date = json.end_date;
  }
}
