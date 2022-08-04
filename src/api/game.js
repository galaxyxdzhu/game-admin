import request from "@/utils/request";

export function getGames(params) {
  return request({
    url: "/game/games",
    method: "get",
    params,
  });
}
// 获取游戏类型
export function getGameTypes() {
  return request({
    url: "/game/gameTypes",
    method: "get",
  });
}

// 获取游戏类型
export function updateGame(data) {
  return request({
    url: "/game/updateGame",
    method: "post",
    data,
  });
}
// 获取游戏类型
export function addGame(data) {
  return request({
    url: "/game/addGame",
    method: "post",
    data,
  });
}
