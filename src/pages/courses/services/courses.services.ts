import axios from "axios";
const baseUrl = process.env.VUE_APP_BASE_URL;
import { CourseData, LearningPoint, Topic } from "../model/courses.model";

class CourseService {
  // add course
  addCourse(course: CourseData) {
    return axios.post(`${baseUrl}courses.json`, course);
  }

  //get all courses
  getCourses() {
    return axios.get(`${baseUrl}courses.json`);
  }

  //delete course
  deleteCourse(courseId: string) {
    return axios.delete(`${baseUrl}courses/${courseId}.json`);
  }

  //get course by Id
  getCourseById(courseId: string) {
    return axios.get(`${baseUrl}/courses/${courseId}.json`);
  }

  //update course
  updateCourse(course: CourseData) {
    return axios.patch(`${baseUrl}courses/${course.id}.json`, course);
  }

  //add course learning points
  addLearningPoints(courseId: string, learningPoint: LearningPoint) {
    return axios.patch(`${baseUrl}courses/${courseId}.json`, {
      learningPoints: learningPoint,
    });
  }

  //add content title
  addContentTitle(courseId: string, title: string) {
    return axios.post(`${baseUrl}courseDetails.json`, {
      courseId: courseId,
      contentTitle: title,
    });
  }

  //get content title
  getContentTitle() {
    return axios.get(`${baseUrl}courseDetails.json`);
  }

  //delete content tile
  deleteContentTitle(contentId: string) {
    return axios.delete(`${baseUrl}courseDetails/${contentId}.json`);
  }

  //update content title
  editContentTitle(courseId: string, contentId: string, title: string) {
    return axios.put(`${baseUrl}courseDetails/${contentId}.json`, {
      courseId: courseId,
      contentTitle: title,
    });
  }

  //add topic
  addTopic(contentId: string, topic: Topic) {
    return axios.post(`${baseUrl}Topics.json`, {
      contentId: contentId,
      topic: topic,
    });
  }

  //get all topics
  getTopics() {
    return axios.get(`${baseUrl}Topics.json`);
  }

  //delete topic
  deleteTopic(topicId: string) {
    return axios.delete(`${baseUrl}Topics/${topicId}.json`);
  }

  //update topic
  editTopic(contentId: string, topicId: string, topic: Topic) {
    return axios.put(`${baseUrl}Topics/${topicId}.json`, {
      contentId: contentId,
      topic: topic,
    });
  }
}
const courseService = new CourseService();
export default courseService;
