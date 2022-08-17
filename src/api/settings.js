import request from "@/utils/request";

export function getSetting(params) {
  return request({
    url: `/set/name`,
    method: "get",
    params,
  });
}

export function updateSetting(data) {
  return request({
    url: "/set/update",
    method: "post",
    data,
  });
}
