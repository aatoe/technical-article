const Mock = require("mockjs");
module.exports = {
  project: Mock.mock({
    // project 就是我们路由的路径
    data: {
      mobile: "admin",
      token: "af6146b61eff44748d294002d70b20a5",
    },
    errcode: 200,
    errmsg: "ok",
  }),
  push_comment: Mock.mock({
    data: {
      "items|5-20": [
        {
          id: "@integer(60, 10000)",
          name: "@cname",
          spId: 3073,
          spType: 2,
          moneyUseto: '@date("yy")',
          sex: "1",
          belongsDealer: "张三阿萨德",
          datetime: '@datetime("T")',
          province: "@province()",
          city: "@city()",
          county: "@county()",
        },
      ],
      page: {
        currentPage: 1,
        totalPage: 10,
        totalCount: 77,
      },
      errcode: 200,
      errmsg: "ok",
    },
  }),
};
