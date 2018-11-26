function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

 /**
  * 防抖函数
  * @param {*} fn  需要执行的函数
  * @param {*} interval  时间，默认300
  */
const debounce =(fn, interval = 300) => {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}

/**
 * 限流函数
 * @param {*} fn  需要执行的函数
 * @param {*} interval   时间，默认300
 */
const throttle = (fn, interval = 300) => {
    var canRun = true;
    return function() {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
};
export default {
  formatNumber,
  formatTime,
  throttle,
  debounce
}
