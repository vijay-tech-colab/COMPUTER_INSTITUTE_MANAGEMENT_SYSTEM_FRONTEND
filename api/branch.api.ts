import { getData } from "./api";

export const BranchAPI = {
  getAll: async () => {
    const response = await getData("/branch");
    return response.data;
  },
};
