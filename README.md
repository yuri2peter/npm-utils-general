# utilsV3

## index

```javascript

/**
 * 添加一个延迟。await wait(1000)
 * @param {number} delay 毫秒数
 */
function wait(after = 0)

/**
 * 等待...直到条件成立
 * @param {function} checker 成立条件检测函数，可以是异步函数
 * @param {number} interval 检测间隔毫秒数
 * @param {number} timeout 超时毫秒数
 */
export async function waitUntil(checker, interval = 100, timeout = 10000)

/**
 * 测试是否为一个低频操作
 * @param {string} operationKey 操作标识符
 * @param {number} seconds 一定秒数内
 * @param {number} count 一定次数
 * @returns {boolean}
 */
function opFrequencyTest(operationKey, seconds, count)

/**
 * 简单判断一个语言标识符是否是中文
 * @param {string} lang 语言标识，如"zh-CN"
 * @returns {boolean}
 * */
function isZh(lang)

/**
 * 临界资源锁
 * @param {function} work 工作函数，获得临界资源后被执行，执行完毕后释放临界资源
 * @param {array<string>} locks 锁名数组
 */
async function lock(work, locks = [])

/**
 * 返回一个计时器，一般用于测出性能瓶颈
 * tick()方法单次计时并返回所花时间
 * 成员taking返回总耗时
 */
class Timer()

/**
 * 返回一个Base64解析工具
 * encode() / decode()
 */
class Base64()

/**
 * 对字符串中正则关键字作转义，常用于拼接正则的一部分
 *
 * @param {string} str regular expression pattern to be escaped
 * @return {*}
 */
export function escapeForRegex(str)

/**
 * 判断对象是否是一个Promise
 * 警告：目前没有准确的判断机制，只能通过是否有.then(*)方法判断
 * @param {*} subject
 * @return {boolean}
 */
function isPromiseAlike(subject)

/**
 * 判断对象是否为空对象
 * @param {object} obj
 * @return {boolean}
 */
function isEmptyObject(obj)

/**
 * Deep copy
 * @param {object|array} subject
 * @return {object|array}
 */
function deepCopy(subject)

/**
 * 字符串模板
 * @param {string} template 模板形如 'Dear ${name},...'
 * @param {object} params 参数集，对应填充到变量，如 { name: 'yuri2' }
 * @return {string}
 * */
function parseStrTemplate(template, params = {})

function md5(text)

// 生成唯一 id
function uuid()

/**
 * 对象数组转csv表格
 * @param {array<object>} data
 * @returns {string}
 */
function dataToCsv(data)

/**
 * csv表格转对象数组
 * @param {string}
 * @returns {array<object>}
 */
function csvToData(csv)

/**
 * 取随机数
 * @param {number} n 最小值
 * @param {number} m 最大值
 * @returns {number}
 */
function randomInt(n, m)


/**
 * markdown转html，可附加样式
 * @param {*} markdownText markdown纯文本
 * @param {*} options 配置。styles: css纯文本；className：css根节点类名
 */
async function markdownToHtml(
  markdownText,
  options = {
    className: 'markdown-body',
    styles,
  },
)

```
