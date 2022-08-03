import request from "@/utils/request";

export function getGames(params) {
  return request({
    url: "/game/games",
    method: "get",
    params,
  });
}
