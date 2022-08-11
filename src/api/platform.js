import request from "@/utils/request";

export function getPlatforms() {
  return request({
    url: "/platform/platforms",
    method: "get",
  });
}
export function addPlatform(data) {
  return request({
    url: "/platform/add",
    method: "post",
    data,
  });
}
export function deletePlatform(data) {
  return request({
    url: "/platform/delete",
    method: "post",
    data,
  });
}
