import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'

// 上传
export function upload<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/upload', data)
}
