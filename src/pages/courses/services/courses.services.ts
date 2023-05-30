const baseUrl = process.env.VUE_APP_BASE_URL;
import http from "@/interceptor/http.interceptor";
import { CourseData, LearningPoint, Topic } from "../model/courses.model";

class CourseService {
  // add course
  addCourse(course: CourseData) {
    return http.post(`${baseUrl}courses.json`, course);
  }

  //get all courses
  getCourses() {
    return http.get(`${baseUrl}courses.json`);
  }

  //delete course
  deleteCourse(courseId: string) {
    return http.delete(`${baseUrl}courses/${courseId}.json`);
  }

  //get course by Id
  getCourseById(courseId: string) {
    return http.get(`${baseUrl}/courses/${courseId}.json`);
  }

  //update course
  updateCourse(course: CourseData) {
    return http.patch(`${baseUrl}courses/${course.id}.json`, course);
  }

  //add course learning points
  addLearningPoints(courseId: string, learningPoint: LearningPoint) {
    return http.patch(`${baseUrl}courses/${courseId}.json`, {
      learningPoints: learningPoint,
    });
  }

  //add content title
  addContentTitle(courseId: string, title: string) {
    return http.post(`${baseUrl}courseDetails.json`, {
      courseId: courseId,
      contentTitle: title,
    });
  }

  //get content title
  getContentTitle() {
    return http.get(`${baseUrl}courseDetails.json`);
  }

  //delete content tile
  deleteContentTitle(contentId: string) {
    return http.delete(`${baseUrl}courseDetails/${contentId}.json`);
  }

  //update content title
  editContentTitle(courseId: string, contentId: string, title: string) {
    return http.put(`${baseUrl}courseDetails/${contentId}.json`, {
      courseId: courseId,
      contentTitle: title,
    });
  }

  //add topic
  addTopic(contentId: string, topic: Topic) {
    return http.post(`${baseUrl}Topics.json`, {
      contentId: contentId,
      topic: topic,
    });
  }

  //get all topics
  getTopics() {
    return http.get(`${baseUrl}Topics.json`);
  }

  //delete topic
  deleteTopic(topicId: string) {
    return http.delete(`${baseUrl}Topics/${topicId}.json`);
  }

  //update topic
  editTopic(contentId: string, topicId: string, topic: Topic) {
    return http.put(`${baseUrl}Topics/${topicId}.json`, {
      contentId: contentId,
      topic: topic,
    });
  }
}
const courseService = new CourseService();
export default courseService;
