import { getManagerCarts } from "../dao/daoManager.js";

const data = await getManagerCarts();
export const managerCarts = new data();