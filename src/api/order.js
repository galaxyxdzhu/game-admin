import request from "@/utils/request";

export function getOrders() {
  return request({
    url: "/order/getOrders",
    method: "get",
  });
}

export function getOrderDetail(params) {
  return request({
    url: "/order/orderDetail",
    method: "get",
    params,
  });
}
