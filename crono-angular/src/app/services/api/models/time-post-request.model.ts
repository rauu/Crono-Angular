export class TimePostRequest {
  description?: string;
  begin_date?: string;
  end_date?: string | null;

  constructor(json: TimePostRequest) {
    this.description = json.description;
    this.begin_date = json.begin_date;
    this.end_date = json.end_date;
  }
}
