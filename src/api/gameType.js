import request from "@/utils/request";

export function getGameTypes() {
  return request({
    url: "/gameType/gameTypes",
    method: "get",
  });
}
export function addGameType(data) {
  return request({
    url: "/gameType/add",
    method: "post",
    data,
  });
}
export function updateGameType(data) {
  return request({
    url: "/gameType/update",
    method: "post",
    data,
  });
}
export function deleteGameType(data) {
  return request({
    url: "/gameType/delete",
    method: "post",
    data,
  });
}
