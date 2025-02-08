import { axiosInstance } from "./axiosInstance";

export const apiResearcherHomePage = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(``)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
