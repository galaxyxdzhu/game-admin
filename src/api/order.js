import request from "@/utils/request";

export function getOrders() {
  return request({
    url: "/order/getOrders",
    method: "get",
  });
}
