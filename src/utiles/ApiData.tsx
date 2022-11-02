import axios from "axios";

export const ApiGet = (Url: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(Url)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error) {
          reject(error);
        }
      });
  });
};
