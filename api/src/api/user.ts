import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'

export function login<T>(data: T) {
    return Ajax.post('/api/server/login', data)
}

export function getUserInfo<T>() {
    return Ajax.post<ResponseData<T>>('/api/server/GetUserInfo')
}
