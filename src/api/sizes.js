import request from "@/utils/request";

export function getSizes() {
  return request({
    url: "/size/sizes",
    method: "get",
  });
}
export function addSize(data) {
  return request({
    url: "/size/add",
    method: "post",
    data,
  });
}
export function deleteSize(data) {
  return request({
    url: "/size/delete",
    method: "post",
    data,
  });
}
