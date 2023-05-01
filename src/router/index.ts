import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "@/pages/HomeView.vue";
import AboutView from "@/pages/AboutView.vue";
import ContactView from "@/pages/ContactView.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
// import CourseForm from "@/components/courses/CourseForm.vue";
import CourseDetails from "@/pages/courses/CourseDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/about-us",
    component: AboutView,
  },
  {
    path: "/contact-us",
    component: ContactView,
  },
  {
    path: "/login",
    component: () => import("@/pages/auth/LoginView.vue"),
  },
  {
    path: "/registration",
    component: () => import("@/pages/auth/RegistrationView.vue"),
  },
  {
    path: "/courses",
    component: () => import("@/pages/courses/CoursesList.vue"),
  },
  {
    path: "/courses/details/:id",
    component: CourseDetails,
    props: true,
  },
  {
    path: "/users",
    component: () => import("@/pages/admin/UsersView.vue"),
  },
  {
    path: "/:notfound(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  // linkExactActiveClass: "bg-success",
});

export default router;
