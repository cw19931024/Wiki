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
##### 写完后，其实已经功能算完成了，那么接下来就要考虑怎么尽可能少用if于是将2个方法整成了一个

```
const timeAgo = function (t1, t2) { //两个时间差 中文显示函数
    var time1 = new Date(t1).getTime()
    var time2 = new Date(t2 || new Date()).getTime();
    return timeStr(time1, time2);
};

const timeStr = function (time1, time2) {
    var str = time1 > time2 ? '后' : '前';
    var time = time1 > time2 ? parseInt((time1 - time2) / 1000) : parseInt((time2 - time1) / 1000);
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
##### 做完后，发现优化了一半的if，但是个人感觉还是很多。于是继续优化
```
const timeStr = function (time1, time2) {
    var str = time1 > time2 ? '后' : '前';
    var time = time1 > time2 ? parseInt((time1 - time2) / 1000) : parseInt((time2 - time1) / 1000);
    const number = 60;
    var timeDate = '';
    var strList = [
        { str: '秒', start: 0, end: number, and: 1 },
        { str: '分钟', start: number - 1, end: number * 60, and: number },
        { str: '小时', start: number * 60 - 1, end: number * 60 * 24, and: number * 60 },
        { str: '天', start: number * 60 * 24 - 1, end: number * 60 * 24 * 30, and: number * 60 * 24 },
        { str: '个月', start: number * 60 * 24 * 30 - 1, end: number * 60 * 24 * 30 * 12, and: number * 60 * 24 * 30 },
        { str: '年', start: number * 60 * 24 * 30 * 12 - 1, end: number * 60 * 24 * 30 * 12 * 2, and: number * 60 * 24 * 30 * 12 },
        { str: '很久之', start: number * 60 * 24 * 30 * 12 * 2 - 1, end: number * 60 * 24 * 30 * 12 * 999, and: number * 60 * 24 * 30 * 12 * 2 },
    ]

    if (time == 0) {
        return '刚刚'
    }
    strList.every(function (e, i) {
        if (time > e.start && time < e.end) {
            timeDate = i == 6 ? e.str + str : parseInt(time / e.and) + e.str + str
            return false
        }
        return true
    })
    return timeDate
}
const timeAgo = function (t1, t2) { //两个时间差 中文显示函数
    var time1 = new Date(t1).getTime()
    var time2 = new Date(t2 || new Date()).getTime();
    return timeStr(time1, time2);
};
```
##### 恩，只剩两个if了。其实这段
```
 var strList = [
    { str: '秒', start: 0, end: number, and: 1 },
    { str: '分钟', start: number - 1, end: number * 60, and: number },
    { str: '小时', start: number * 60 - 1, end: number * 60 * 24, and: number * 60 },
    { str: '天', start: number * 60 * 24 - 1, end: number * 60 * 24 * 30, and: number * 60 * 24 },
    { str: '个月', start: number * 60 * 24 * 30 - 1, end: number * 60 * 24 * 30 * 12, and: number * 60 * 24 * 30 },
    { str: '年', start: number * 60 * 24 * 30 * 12 - 1, end: number * 60 * 24 * 30 * 12 * 2, and: number * 60 * 24 * 30 * 12 },
    { str: '很久之', start: number * 60 * 24 * 30 * 12 * 2 - 1, end: number * 60 * 24 * 30 * 12 * 999, and: number * 60 * 24 * 30 * 12 * 2 },
]

if (time == 0) {
    return '刚刚'
}
```
##### 本来还可以继续优化的，但是由于这里我没啥时间了。就此作罢~下次再尝试，我认为这个功能是次要的，我觉得是别人想考的是如何少用if来优化代码。取出冗余。源码在里面。