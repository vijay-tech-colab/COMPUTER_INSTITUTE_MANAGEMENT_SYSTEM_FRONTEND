import { getData } from "./api";

export const CourseAPI = {
  getAll: async (branchId?: string) => {
    const url = branchId ? `/courses?branch=${branchId}` : "/courses";
    const response = await getData(url);
    return response.data;
  },
};
