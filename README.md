# tibetan_analysis
**一、前言**

喝水不忘挖井人，大部分思路和代码，来自https://github.com/puntsokCN/tibetan_analysis，不过这个是python版本的，对前端同学不友好，另外好多年没更新了，于是写了一个js版本的，用法一样，函数名也保持了一致



**二、安装**

```bash
# 使用 yarn
npm install tibetan_analysis

# 使用 yarn
yarn add tibetan_analysis
```



**三、使用**

```javascript
import tibetan from 'tibetan_analysis';

const s = tibetan("བསྒྲིགས")     

// 若存在元素，返回对应藏文字符； 若不存在返回 None
console.log("前加字(སྔོན་འཇུག་):    ", s.front())
console.log("上加字(མགོ་ཅན་):     ", s.top())
console.log("基字(མིང་གཞི་):       ", s.basic())
console.log("下加字(མདོགས་ཅན་):   ", s.below())
console.log("音标(དབྱངས་):        ", s.symbol())
console.log("后加字(རྗེས་འཇུག་):    ", s.behind())
console.log("重后加字(ཡང་འཇུག་):  ", s.repeat_behind())

# 1.得到一个元素数组：[前加字，上加字，基字，下加字，音标，后加字， 又后加字]
# 2.数组内对应元素若存在存储着：对应藏文字符；若不存在存储着： None
# 3.以上获取各项元素的方法，实则是对该数组进行查询
console.log("查看全部:         ", s.get_all())

```



**四、联系方式**

有任何建议，可以联系本人2524741048@qq.com
