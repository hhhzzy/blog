export interface ILoginData {
    username: string
    password: string
}
export interface IUserData{
    roles: string[]
    introduction: string
    avatar: string
    name: string
}
export interface ISearchResultData {
    result: object[]
    count: number
    currentPage: number
    pageSize: number
}
