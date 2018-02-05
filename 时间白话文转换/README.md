# 时间白话文转换
##### 最近准备面试的时候，投了一家，HR经理直接发来个链接告诉我，做完了没问题截图给他。进去一瞧，哦，原来就是时间转白话文（个人说法）以前做过，也没啥难度。但是里面有一句
```
* 考虑输入可能是数值型或者日期型
* 请尽可能少用if-else方式完成
```
##### 第一句个人理解应该是要考虑到传进去的值是时间戳或者类似2008-08-08 12:00:00 类似格式。

这个其实方法已经自带了。
```
new Date('2008-08-08: 12:00:00').getTime() //1218168000000

new Date(1218168000000).getTime() //1218168000000
```
最开始，代码写出来的第一版为：
```
function DateStr(t1,t2) {
    var time1 = new Date(t1).getTime()
    var time2 = new Date(t2 || new Date()).getTime();
    var time = time2-time1
    if (time < 60) {
        str = parseInt(time) + '秒前';
        return str
    }
    if (time > 59 && time < 3600) {
        str = parseInt(time / 60) + '分钟前';
        return str
    }
    if (time > 3599 && time < 86400) {
        str = parseInt(time / 3600) + '小时前';
        return str
    }
    if (time > 86399 && time < 2592000) {
        str = parseInt(time / 86400) + '天前';
        return str
    }
    if (time > 2591999 && time < 31104000) {
        str = parseInt(time / 2592000) + '个月前';
        return str
    }
    if (time > 31103999 && time < 62208000) {
        str = parseInt(time / 31104000) + '年前';
        return str
    } else {
        str = '很久之前';
        return str
    }
}
function DateStrs(t1,t2) {
    var time1 = new Date(t1).getTime()
    var time2 = new Date(t2 || new Date()).getTime();
    var time = time1-time2
    if (time < 60) {
        str = parseInt(time) + '秒后';
        return str
    }
    if (time > 59 && time < 3600) {
        str = parseInt(time / 60) + '分钟后';
        return str
    }
    if (time > 3599 && time < 86400) {
        str = parseInt(time / 3600) + '小时后';
        return str
    }
    if (time > 86399 && time < 2592000) {
        str = parseInt(time / 86400) + '天后';
        return str
    }
    if (time > 2591999 && time < 31104000) {
        str = parseInt(time / 2592000) + '个月后';
        return str
    }
    if (time > 31103999 && time < 62208000) {
        str = parseInt(time / 31104000) + '年后';
        return str
    } else {
        str = '很久之后';
        return str
    }
}

```