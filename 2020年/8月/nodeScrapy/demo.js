const superagent = require("superagent")
const charset = require("superagent-charset")
charset(superagent)
const baseUrl = "https://www.wonadea.com/" //输入任何网址都可以
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const request = require("request")

// url  https://www.wonadea.com/forum-2-1.html
/* 
https://www.wonadea.com/thread-144071-1-1.html  === thread-144071-1-1.html 
https://www.wonadea.com/thread-143998-1-1.html === thread-143998-1-1.html
https://www.wonadea.com/thread-143935-1-1.html === thread-143935-1-1.html


src="https://img.wonadea.com/forum/202008/03/143117m2f92s3oc9tmfftx.jpg"
src="https://img.wonadea.com/forum/202008/03/143118xyjmq44f3zyr4fuv.jpg"
src="https://img.wonadea.com/forum/202008/03/143119jdhvtvsxhxid77o7.jpg"
*/
let start = 144000 // 设置开始数值
let end = 144072 // 结束数值
for (let i = start; i < end; i++) {
  let route = `thread-${i}-1-1.html`
  //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
  // console.log(baseUrl + route, "baseUrl + route")
  superagent
    .get(baseUrl + route)
    .charset("gb2312")
    .end(function (err, sres) {
      let items = []
      if (err) {
        console.log("ERR: " + err)
        // res.json({ code: 400, msg: err, sets: items })
        return
      }
      let $ = cheerio.load(sres.text)
      $(".plc .pct .pcb tbody .t_f div ignore_js_op img").each(function (
        index,
        element
      ) {
        let $element = $(element)
        let imgUrl = $element["0"]["attribs"]["zoomfile"]

        items.push({
          title: imgUrl,
        })

        // 写入到images里面
        let filename = imgUrl.split("/").pop() // 已原网络图片的名称命名本地图片

        let writeStream = fs.createWriteStream(`./images/${filename}`)
        let readStream = request(imgUrl)
        readStream.pipe(writeStream)
        // readStream.on("end", function () {
        //   console.log("文件下载成功")
        // })
        readStream.on("error", function () {
          console.log("错误信息:" + err)
        })
        writeStream.on("finish", function () {
          console.log("文件写入成功", filename)
          writeStream.end()
        })
      })
      // res.json({ code: 200, msg: "", data: items })
      // })
      // console.log(items[0].attr("type"), "items")
    })
}
