import { ElysiaApp } from "..";

export default (app: ElysiaApp) =>
  app.get("/", { success: true, message: "hola!" });
