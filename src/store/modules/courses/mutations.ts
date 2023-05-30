export default {
  getCoursesData(state: any, payload: any) {
    state.courses = payload;
  },
  courseData(state: any, payload: any) {
    state.course = payload;
  },
  getContentTitle(state: any, payload: any) {
    state.contentTitles = payload;
  },
  getContentTopics(state: any, payload: any) {
    state.topics = payload;
  },
};
