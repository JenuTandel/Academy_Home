export class Contact {
  id?: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;

  constructor(
    id: string,
    name: string,
    email: string,
    message: string,
    date: string,
    time: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.date = date;
    this.time = time;
  }
}
