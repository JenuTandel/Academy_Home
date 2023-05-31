export class CourseData {
  id: string;
  authorName: string;
  courseName: string;
  courseDetails: string;
  courseDate: string;
  timeDuration: number;
  courseImage: CourseImage;
  learningPoints?: LearningPoint[];

  constructor(
    id: string,
    authorName: string,
    courseName: string,
    courseDetails: string,
    courseDate: string,
    timeDuration: number,
    courseImage: CourseImage,
    learningPoints?: LearningPoint[]
  ) {
    this.id = id;
    this.authorName = authorName;
    this.courseName = courseName;
    this.courseDetails = courseDetails;
    this.courseDate = courseDate;
    this.timeDuration = timeDuration;
    this.courseImage = courseImage;
    this.learningPoints = learningPoints;
  }
}

export class CourseImage {
  _value: string;
  constructor(_value: string) {
    this._value = _value;
  }
}

export class LearningPoint {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

// export class TopicData {
//   contentId: string;
//   topic: Topic[];
//   constructor(contentId: string, topic: Topic[]) {
//     this.contentId = contentId;
//     this.topic = topic;
//   }
// }

export class Topic {
  fileType: string;
  topicname: string;
  videolink: string;

  constructor(fileType: string, topicname: string, videolink: string) {
    this.fileType = fileType;
    this.topicname = topicname;
    this.videolink = videolink;
  }
}
