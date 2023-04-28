export default {
  getCoursesData(state: any, payload: any) {
    state.courses = payload;
  },
  courseData(state: any, payload: any) {
    state.course = payload;
  },
};
