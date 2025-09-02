export class TimeGetResponse {
  id?: string;
  description?: string;
  begin_date?: string;
  end_date?: string | null;
  spent_time?: number;

  constructor(json: TimeGetResponse) {
    this.id = json.id;
    this.description = json.description;
    this.begin_date = json.begin_date;
    this.end_date = json.end_date;
    this.spent_time = json.spent_time;
  }
}
