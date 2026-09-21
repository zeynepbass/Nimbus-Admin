import { sumBy } from "@/lib/stats";

export const isCriticalStock = (product) => product.stock <= product.criticalStock;

export const getProductRevenue = (product) => product.price * product.sold;

export const getTotalRevenue = (products) => sumBy(products, getProductRevenue);
