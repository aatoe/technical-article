## vue + element 导出excel表

整理了一下，特别简单，不过这仅仅是导出普通的表格，如果比较复杂的还是不行，业务还没有涉及，我在看看什么时候实现一下。

```js
这里用了一个第三方包 Export2Excel（下面复制），然后它里面又引入 Blob.js（下面复制） file-saver xlsx script-loader（npm包）

cnpm install -S file-saver xlsx
cnpm install -D script-loader

import Vue from 'vue'
/* 
excelData :准备导出数据
tHeader ： 表头
headerfilterVal : 表头对应的字段
exportName:导出的文件名
*/
downloadExcel.js ,这个方法是我们封装的方法。
export function downloadExcel(excelData, tHeader, headerfilterVal, exportName = '导出的文件') {
  require.ensure([], () => {
    const { export_json_to_excel } = require('./Export2Excel')
    const data = excelData.map((v) => headerfilterVal.map((j) => v[j]))
    export_json_to_excel(tHeader, data, exportName) //导出Excel 文件名
  })
}

1.导出去使用的地方就可以使用了，
2.我是挂载到vue上面了。
比如
import { downloadExcel } from './excel/downloadExcel'

 async exportExcel() {
      // excelData :准备导出数据
      // tHeader : 表头
      // headerfilterVal : 表头对应的字段
      // exportName:导出的文件名
      let excelData = [
        { index: '999', nickName: '的旧时光', name: '98491231841251' },
        { index: '1', nickName: '高贵', name: '张' },
        { index: '2', nickName: '海aaa灰尘', name: '小兰' },
      ]
      let tHeader = ['序号', '昵称', '姓名']
      let headerfilterVal = ['index', 'nickName', 'name']
      let exportName = '导出文件名'
      downloadExcel(excelData, tHeader, headerfilterVal, exportName)
    },
```

```js
Export2Excel.js 

/* eslint-disable */
require('script-loader!file-saver');
require('./Blob.js');
require('script-loader!xlsx/dist/xlsx.core.min');
function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({s: {r: R, c: outRow.length}, e: {r: R + rowspan - 1, c: outRow.length + colspan - 1}});
            }
            ;

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {v: data[R][C]};
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    console.log('a')
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";
    console.log(data);

    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});

    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "test.xlsx")
}

function formatJson(jsonData) {
    console.log(jsonData)
}
export function export_json_to_excel(th, jsonData, defaultTitle) {

    /* original data */

    var data = jsonData;
    data.unshift(th);
    var ws_name = "SheetJS";

    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);


    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
    var title = defaultTitle || '列表'
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), title + ".xlsx")
}

```

```js
Blob.js（复制就完事了）

(function (view) {
  'use strict'

  view.URL = view.URL || view.webkitURL

  if (view.Blob && view.URL) {
    try {
      new Blob()
      return
    } catch (e) {}
  }

  // Internally we use a BlobBuilder implementation to base Blob off of
  // in order to support older browsers that only have BlobBuilder
  var BlobBuilder =
    view.BlobBuilder ||
    view.WebKitBlobBuilder ||
    view.MozBlobBuilder ||
    (function (view) {
      var get_class = function (object) {
          return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1]
        },
        FakeBlobBuilder = function BlobBuilder() {
          this.data = []
        },
        FakeBlob = function Blob(data, type, encoding) {
          this.data = data
          this.size = data.length
          this.type = type
          this.encoding = encoding
        },
        FBB_proto = FakeBlobBuilder.prototype,
        FB_proto = FakeBlob.prototype,
        FileReaderSync = view.FileReaderSync,
        FileException = function (type) {
          this.code = this[(this.name = type)]
        },
        file_ex_codes = (
          'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR ' + 'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'
        ).split(' '),
        file_ex_code = file_ex_codes.length,
        real_URL = view.URL || view.webkitURL || view,
        real_create_object_URL = real_URL.createObjectURL,
        real_revoke_object_URL = real_URL.revokeObjectURL,
        URL = real_URL,
        btoa = view.btoa,
        atob = view.atob,
        ArrayBuffer = view.ArrayBuffer,
        Uint8Array = view.Uint8Array
      FakeBlob.fake = FB_proto.fake = true
      while (file_ex_code--) {
        FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1
      }
      if (!real_URL.createObjectURL) {
        URL = view.URL = {}
      }
      URL.createObjectURL = function (blob) {
        var type = blob.type,
          data_URI_header
        if (type === null) {
          type = 'application/octet-stream'
        }
        if (blob instanceof FakeBlob) {
          data_URI_header = 'data:' + type
          if (blob.encoding === 'base64') {
            return data_URI_header + ';base64,' + blob.data
          } else if (blob.encoding === 'URI') {
            return data_URI_header + ',' + decodeURIComponent(blob.data)
          }
          if (btoa) {
            return data_URI_header + ';base64,' + btoa(blob.data)
          } else {
            return data_URI_header + ',' + encodeURIComponent(blob.data)
          }
        } else if (real_create_object_URL) {
          return real_create_object_URL.call(real_URL, blob)
        }
      }
      URL.revokeObjectURL = function (object_URL) {
        if (object_URL.substring(0, 5) !== 'data:' && real_revoke_object_URL) {
          real_revoke_object_URL.call(real_URL, object_URL)
        }
      }
      FBB_proto.append = function (data /*, endings*/) {
        var bb = this.data
        // decode data to a binary string
        if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
          var str = '',
            buf = new Uint8Array(data),
            i = 0,
            buf_len = buf.length
          for (; i < buf_len; i++) {
            str += String.fromCharCode(buf[i])
          }
          bb.push(str)
        } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
          if (FileReaderSync) {
            var fr = new FileReaderSync()
            bb.push(fr.readAsBinaryString(data))
          } else {
            // async FileReader won't work as BlobBuilder is sync
            throw new FileException('NOT_READABLE_ERR')
          }
        } else if (data instanceof FakeBlob) {
          if (data.encoding === 'base64' && atob) {
            bb.push(atob(data.data))
          } else if (data.encoding === 'URI') {
            bb.push(decodeURIComponent(data.data))
          } else if (data.encoding === 'raw') {
            bb.push(data.data)
          }
        } else {
          if (typeof data !== 'string') {
            data += '' // convert unsupported types to strings
          }
          // decode UTF-16 to binary string
          bb.push(unescape(encodeURIComponent(data)))
        }
      }
      FBB_proto.getBlob = function (type) {
        if (!arguments.length) {
          type = null
        }
        return new FakeBlob(this.data.join(''), type, 'raw')
      }
      FBB_proto.toString = function () {
        return '[object BlobBuilder]'
      }
      FB_proto.slice = function (start, end, type) {
        var args = arguments.length
        if (args < 3) {
          type = null
        }
        return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding)
      }
      FB_proto.toString = function () {
        return '[object Blob]'
      }
      FB_proto.close = function () {
        this.size = this.data.length = 0
      }
      return FakeBlobBuilder
    })(view)

  view.Blob = function Blob(blobParts, options) {
    var type = options ? options.type || '' : ''
    var builder = new BlobBuilder()
    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        builder.append(blobParts[i])
      }
    }
    return builder.getBlob(type)
  }
})((typeof self !== 'undefined' && self) || (typeof window !== 'undefined' && window) || this.content || this)

```

