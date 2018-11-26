 /**
  * 防抖函数
  * @param {*} fn  需要执行的函数
  * @param {*} interval  时间，默认300
  */
 export const debounce =(fn, interval = 300) => {
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
 export const throttle = (fn, interval = 100) => {
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