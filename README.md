# 这是一个基于小程序开发的图书借阅系统

这是一个基于小程序开发的图书借阅系统，其中包含了管理员用户上传书籍信息以及对系统用户的管理；普通用户则具有预定图书馆书籍的功能。

规则：1.普通用户在该系统可以预约图书馆的图书，如果超过24小时没有来图书馆领取图书，属于违约行为。
2.每本借出去的图书有效期只有一个月，超过一个月用户没有来归还图书，则属于逾期未还行为。（后面可优化成自定义时间）
3.系统会记录用户的违约及逾期未还行为。如果超过一定的次数，管理员可以禁止该用户继续使用该系统预定图书的功能。
4.当用户被限制使用，可以通过联系管理员来解除限制
5.当管理员下架某本书籍的时候，普通用户就不能在首页查看到这本书籍，但是管理员依然能看到

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

