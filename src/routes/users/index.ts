import { ElysiaApp } from "../..";
import { refetchMe, signIn, signUp } from "../../controllers/authController";
import { sendResponse } from "../../utils/responseGenerator";

const demoU = { name: "rafi", id: 6556135468 };
export default (app: ElysiaApp) =>
  app
    .get("/", async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      return sendResponse(false, "something went wront");
    })
    .post("/login", async (body) => {
      return await signIn(body);
    })
    .get("/my-profile", async (headers) => {
      return await refetchMe(headers);
    })
    .post("/register", async (body) => {
      return await signUp(body);
    });
