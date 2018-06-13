# wepy+koa2+mangoose


1. mangodb启动时候出现差错，导致原因是不正常退出，生成了mango.lock，删除了就好了
2. 数据库存储不进，是由于Schema写的格式出差错
3. koa需要在node高版本运行，需要安装node版本切换工具
4. 连接数据库在model的时候就已经安装，则连接的时候直接引入model文件即可
5. 爬虫使用的是cheerio和superagent这两个，目前还未写入定时爬取数据