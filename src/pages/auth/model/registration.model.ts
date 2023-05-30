export class RegistrationData {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  fullname?: string;
  phoneno?: number;
  skills?: string;
  enrolledCourses?: EnrolledCourse[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    country: string,
    state: string,
    city: string,
    fullname: string,
    phoneno: number,
    skills: string,
    enrolledCourses?: EnrolledCourse[]
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.country = country;
    this.state = state;
    this.city = city;
    this.fullname = fullname;
    this.phoneno = phoneno;
    this.skills = skills;
    this.enrolledCourses = enrolledCourses;
  }
}

export class EnrolledCourse {
  courseId?: string;
  enrolledText?: string;

  constructor(courseId: string, enrolledText: string) {
    this.courseId = courseId;
    this.enrolledText = enrolledText;
  }
}
