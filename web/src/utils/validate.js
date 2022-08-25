/**
 * @param {string} path  判断是否已https、mailto、tel开头
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
// 时间
import _moment from 'moment'
export const date_format = (data, _format = 'YYYY-MM-DD') => {
    return data ? _moment(data).format(_format) : ''
}
