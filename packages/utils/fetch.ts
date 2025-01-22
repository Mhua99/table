import { settings } from './collect';

interface Result {
  code: number
  msg: string
  data: Array<unknown[]>
}

/**
 * 默认请求方法
 * @param url 请求地址
 * @returns
 */
function sysRequestFetch(url: string) {
  return new Promise<Result>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then(data => resolve(data)).catch(error => reject(error))
  });
}

/**
 * 判断获取用户传入的方法，还是自带的方法
 * @param url
 * @returns
 */
export function requestFun(url: string) {
  if (settings.request) {
    return settings.request.get(url)
  }
  else {
    return sysRequestFetch(url)
  }
}
