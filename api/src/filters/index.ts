import _moment from 'moment'
export const dateFormat = (data: object| string | number, _format = 'YYYY-MM-DD') => {
    return data ? _moment(data).format(_format) : ''
}

export const format_money = (value: number) => {
    if (value === 0) return '￥0.00'
    if (!value) return ''
    if (Number(1).toLocaleString()) {
        if (Number(value) < 0) {
            const tmp = Number(value * (-1)).toLocaleString('zh', { style: 'currency', currency: 'CNY' })
            return '¥-' + tmp.substr(1)
        }
        return Number(value).toLocaleString('zh', { style: 'currency', currency: 'CNY' })
    } else {
        return '¥' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
}
