import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
export const managerProducts = new data();