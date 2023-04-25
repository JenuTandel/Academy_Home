export class RegistrationData {
  id: number;
  firstname: string;
  lastname: string;
  emailId: string;
  password: string;
  country: string;
  state: string;
  city: string;
  fullname: string;
  phoneno: number;
  skills: Skills[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    emailId: string,
    password: string,
    country: string,
    state: string,
    city: string,
    fullname: string,
    phoneno: number,
    skills: Skills[]
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.emailId = emailId;
    this.password = password;
    this.country = country;
    this.state = state;
    this.city = city;
    this.fullname = fullname;
    this.phoneno = phoneno;
    this.skills = skills;
  }
}

export class Skills {
  skill: string;
  constructor(skill: string) {
    this.skill = skill;
  }
}
