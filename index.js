const opFrequencyTest = require('./opFrequencyTest');
const Timer = require('./Timer.js');
const Base64 = require('./Base64.js');
const markdownToHtml = require('./markdown/markdownToHtml.js');

async function wait(after = 100) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, after);
  });
}

async function waitUntill(checker, interval = 100, timeout = 10000) {
  return new Promise(async (resolve, reject) => {
    const checked = await checker();
    if (checked) {
      resolve();
      return;
    }
    let passed = false;
    const itv = setInterval(async () => {
      const checked = await checker();
      if (checked) {
        clearInterval(itv);
        passed = true;
        resolve();
      }
    }, interval);
    setTimeout(() => {
      if (!passed) {
        clearInterval(itv);
        reject(new Error('Wait timeout.'));
      }
    }, timeout);
  });
}

function isZh(lang) {
  return lang.toLowerCase().startsWith('zh');
}

const LOCK_POOL = new Set();
/**
 * 临界资源锁
 * @param {function} work 工作函数，获得临界资源后被执行，执行完毕后释放临界资源
 * @param {array<string>} locks 锁名数组
 */
async function lock(work, locks = []) {
  while (locks.find(t => LOCK_POOL.has(t))) {
    await wait(1);
  }
  locks.forEach(t => LOCK_POOL.add(t));
  try {
    return await work();
  } catch (e) {
    throw e;
  } finally {
    locks.forEach(t => LOCK_POOL.delete(t));
  }
}

/**
 * 对字符串中正则关键字作转义，常用于拼接正则的一部分
 *
 * @param {string} str regular expression pattern to be escaped
 * @return {*}
 */
function escapeForRegex(str) {
  const specials = '.\\+*?[^]$(){}=!<>|:-';
  const chars = str.trim().split('');
  chars.forEach((t, i) => {
    if (specials.indexOf(t) >= 0) {
      chars[i] = `\\${t}`;
    }
  });
  return chars.join('');
}

/**
 * 判断对象是否是一个Promise
 * 警告：目前没有准确的判断机制，只能通过是否有.then(*)方法判断
 * @param {*} subject
 * @return {boolean}
 */
function isPromiseAlike(subject) {
  return typeof subject.then === 'function';
}

/**
 * 判断对象是否为空对象
 * @param {object} obj
 * @return {boolean}
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Deep copy
 * @param {object|array} subject
 * @return {object|array}
 */
function deepCopy(subject) {
  return JSON.parse(JSON.stringify(subject));
}

/**
 * 字符串模板
 * @param {string} template 模板形如 'Dear ${name},...'
 * @param {object} params 参数集，对应填充到变量，如 { name: 'yuri2' }
 * @return {string}
 * */
function parseStrTemplate(template, params = {}) {
  let str = template;
  Object.keys(params).forEach(k => {
    const pattern = `\\$\\{${k}\\}`;
    const re = new RegExp(pattern, 'g');
    str = str.replace(re, params[k]);
  });
  return str;
}

function md5(text) {
  return require('crypto')
    .createHash('md5')
    .update(text)
    .digest('hex');
}

// 生成唯一 id
function uuid() {
  return require('shortid').generate();
}

/**
 * 对象数组转csv表格
 * @param {array<object>} data
 * @returns {string}
 */
function dataToCsv(data) {
  const { parse } = require('json2csv');
  return String.fromCharCode(0xfeff) + parse(data);
}

/**
 * csv表格转对象数组
 * @param {string}
 * @returns {array<object>}
 */
function csvToData(csv) {
  const { parse } = require('csv/lib/sync');
  return parse(csv.replace(/^\ufeff/, ''), {
    columns: true,
    skip_empty_lines: true,
  });
}

/**
 * 取随机数
 * @param {number} n 最小值
 * @param {number} m 最大值
 * @returns {number}
 */
function randomInt(n, m) {
  const c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}

/**
 * 类似于Object.assign,但是不会覆盖原对象不存在的属性，返回旧对象
 * @param {object} obj1 被覆盖对象
 * @param {object} obj2 覆盖对象
 * @return {object}
 * */
function objectAssignNoNewField(obj1, obj2) {
  const data = Object.assign({}, obj2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  keys2.forEach(t => {
    if (!keys1.includes(t)) {
      delete data[t];
    }
  });
  Object.assign(obj1, data);
  return obj1;
}

module.exports = {
  wait,
  waitUntill,
  isZh,
  opFrequencyTest,
  lock,
  Timer,
  Base64,
  escapeForRegex,
  isPromiseAlike,
  isEmptyObject,
  deepCopy,
  parseStrTemplate,
  md5,
  uuid,
  dataToCsv,
  csvToData,
  randomInt,
  objectAssignNoNewField,
  markdownToHtml,
};
