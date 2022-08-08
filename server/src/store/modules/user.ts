import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { login, getUserInfo } from '@/api/user'
import { ILoginData, IUserData } from '@/api/types'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { resetRouter } from '@/router/router'
import { TagModule } from '@/store/modules/tagsNav'

export interface IUserState {
    token: string
    roles: string[]
    user: object
}

@Module({ namespaced: true, dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public token = getToken() || ''
    public roles:string[] = []
    public user = {}
    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token
    }
    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles
    }
    @Mutation
    private SET_USER(user: object) {
        this.user = user
    }

    @Action({ rawError: true })
    public async Login(userInfo: ILoginData) {
        console.log(userInfo)
        userInfo.username.trim()
        const { data } = await login(userInfo)
        setToken(data.data.token)
        this.SET_TOKEN(data.data.token)
    }
    @Action({ rawError: true })
    public async GetUserInfo() {
        if (this.token === '') {
            throw Error('没有token，请返回重新登录！')
        }
        const { data } = (await getUserInfo<IUserData>()).data
        this.SET_ROLES(data.roles)
        this.SET_USER(data)
        console.log(data.roles)
    }
    @Action({ rawError: true })
    public Layout() { // 退出登录
        return new Promise((resolve: (value: boolean) => void, reject) => {
            removeToken()
            resetRouter()
            // 清除所有缓存的tag
            TagModule.delAllTag()
            this.SET_TOKEN('')
            this.SET_ROLES([])

            resolve(true)
        })
    }
}

export const UserModule = getModule(User)
