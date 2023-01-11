import { OrderIF } from "./orderInterface";

export interface DashboardIF {
  totalSales: number;
  totalOrders: number;
  recentOrders: OrderIF[];
}
