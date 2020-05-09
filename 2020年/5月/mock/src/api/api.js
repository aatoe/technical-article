import request from "../utils/request";

/**
 * mock 案例
 */
export function testMock(data) {
  return request({
    url: "/sp/loan/mockData",
    method: "post",
    data
  });
}

export function addComment(data) {
  return request({
    url: "/sp/loan/addComment",
    method: "post",
    data
  });
}