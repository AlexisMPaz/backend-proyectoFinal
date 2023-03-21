import { getManagerMessages } from "../dao/daoManager.js";

const data = await getManagerMessages();
export const managerMessages = new data();