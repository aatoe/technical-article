# ios发布上线步骤

#### 1.开发者账号

```
1.1 首先的有苹果账号，申请注册，https://developer.apple.com/account。
1.2 在苹果手机App Store搜索Apple Developer，填写相关信息，并且付费。
```

#### 2.生成证书

```
去这个网站 https://www.yunedit.com/
1、在这里生成csr文件
2、到苹果开发者中心创建Certificates，过程中会要求上传第一步生成的csr，成功后下载生成的cer文件到你电脑（Certificates） https://developer.apple.com/account/resources/certificates/add
3、在这里上传下载的cer文件
4、生成p12文件
5、描述文件

也可以使用此链接完成上面步骤 http://www.appuploader.net/

就可以打包了。
```

#### 3.安装测试

```
使用香蕉提供的二维码安装测试
```

#### 4.上线

```
创建app https://itunesconnect.apple.com/login
在 appuploader 上传ipa 
添加密码 https://appleid.apple.com/zh_CN  上传ipa之前先、配置上传专用密码 ejai-scrh-ryts-osdw（永久有效）
```

