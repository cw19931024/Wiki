"use strict";
/*
编写timeAgo(t1,t2) 函数
* 不用考虑闰年情况
* 考虑输入可能是数值型或者日期型
* 请尽可能少用if-else方式完成
* 完成以下应该的输出

timeAgo('2016-1-1','2017-2-1') 								//1年前 
timeAgo('2016-1-1','2016-3-1') 								//2个月前
timeAgo('2016-1-1','2016-1-16') 							//15天前
timeAgo('2016-1-1','2016-1-1 1:13:01') 				//1小时前
timeAgo('2016-1-1','2016-1-1 0:13:01') 				//13分钟前
timeAgo('2016-1-1','2016-1-1 0:0:50') 				//50秒前

timeAgo('2018-1-1','2017-1-1') 								//1年后
timeAgo('2016-3-1','2016-1-1') 								//2个月后
timeAgo('2016-1-16','2016-1-1') 							//15天后
timeAgo('2016-1-1 1:13:01','2016-1-1') 				//1小时后
timeAgo('2016-1-1 0:13:01','2016-1-1') 				//13分钟后
timeAgo('2016-1-1 0:0:50','2016-1-1') 				//50秒后
*/

const timeStr = function(time1, time2) {
  var str = time1 > time2 ? "后" : "前";
  var time =
    time1 > time2
      ? parseInt((time1 - time2) / 1000)
      : parseInt((time2 - time1) / 1000);
  const number = 60;
  var timeDate = "";
  var strList = [
    { str: "秒", start: 0, end: number, and: 1 },
    { str: "分钟", start: number - 1, end: number * 60, and: number },
    {
      str: "小时",
      start: number * 60 - 1,
      end: number * 60 * 24,
      and: number * 60
    },
    {
      str: "天",
      start: number * 60 * 24 - 1,
      end: number * 60 * 24 * 30,
      and: number * 60 * 24
    },
    {
      str: "个月",
      start: number * 60 * 24 * 30 - 1,
      end: number * 60 * 24 * 30 * 12,
      and: number * 60 * 24 * 30
    },
    {
      str: "年",
      start: number * 60 * 24 * 30 * 12 - 1,
      end: number * 60 * 24 * 30 * 12 * 2,
      and: number * 60 * 24 * 30 * 12
    },
    {
      str: "很久之",
      start: number * 60 * 24 * 30 * 12 * 2 - 1,
      end: number * 60 * 24 * 30 * 12 * 999,
      and: number * 60 * 24 * 30 * 12 * 2
    }
  ];

  if (time == 0) {
    return "刚刚";
  }
  strList.every(function(e, i) {
    if (time > e.start && time < e.end) {
      timeDate = i == 6 ? e.str + str : parseInt(time / e.and) + e.str + str;
      return false;
    }
    return true;
  });
  return timeDate;
};
const timeAgo = function(t1, t2) {
  //两个时间差 中文显示函数
  var time1 = new Date(t1).getTime();
  var time2 = new Date(t2 || new Date()).getTime();
  return timeStr(time1, time2);
};

console.log(timeAgo("2016-1-1", "2017-2-1")); //1年前
console.log(timeAgo("2016-1-1", "2016-3-1")); //2个月前
console.log(timeAgo("2016-1-1", "2016-1-16")); //15天前
console.log(timeAgo("2016-1-1")); //很久之前
console.log(timeAgo("2016-1-1", "2016-1-1 1:13:01")); //1小时前
console.log(timeAgo("2016-1-1", "2016-1-1 0:13:01")); //13分钟前
console.log(timeAgo("2016-1-1", "2016-1-1 0:0:50")); //50秒前
console.log(timeAgo("2016-1-1 1:13:01", "2016-1-1")); //1小时后
console.log(timeAgo("2016-1-1 0:13:01", "2016-1-1")); //13分钟后
console.log(timeAgo("2016-1-1 0:0:50", "2016-1-1")); //50秒后
