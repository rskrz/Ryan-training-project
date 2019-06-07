import { AxiosInstance } from 'axios'

export interface Repo {
    name: string 
    description: string 
}

export interface Token {
    name: string
}
export interface GetReposResult {
    repos?: Repo[]
    error?: Error
}

export interface GetTokenResult {
    token?: Token
    error?: Error
}

export interface Service {
    getRepos(url: string): Promise<GetReposResult>
    getIssues(url: string, headers: object): Promise<GetReposResult>
    postCode(url: string, params: object, headers: object): Promise<GetTokenResult>
}

export class AppService implements Service {
    constructor(private axios: AxiosInstance) {    
    }
    getRepos(url: string): Promise<GetReposResult> {
        return this.axios.get(url).then(response => {
            return Promise.resolve({
                repos: response.data.items
            })
        })
    }
    getIssues(url: string, headers: object): Promise<GetReposResult>{
        return this.axios.get(url,headers).then(response=>{
            return Promise.resolve({
                repos: response.data
            })
        })
    }
    postCode(url: string, params: object, headers: object): Promise<GetTokenResult>{
        return this.axios.post(url,params,headers).then((response: any)=>{
            return Promise.resolve({
                token: response.data
            })
        })
    }

}

export class Controller {

    constructor(private service: Service) {
    }
  
    getTrendingRepos(): Promise<Repo[]> {
        return this.service.getRepos("https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc")
            .then((result: any) => {
                if (result.error) {
                    return result.error
                }
                if(!result.repos || result.repos.length===0) {
                    return Error('No trending repos')
                }
                else {
                    let repos = result.repos!
                    return repos
                }
            })
    }
    getIssues(token: string): Promise<Repo[]> {
        return this.service.getIssues(
            'https://api.github.com/user/issues?filter=all&state=all',
            { headers: {'Authorization': 'token '+token}})
            .then((result: any) => {
                if (result.error) {
                    return result.error
                }
                if(!result.repos || result.repos.length===0) {
                    return Error('User has no issues')
                }  
                else {
                    let repos = result.repos!
                    return repos
                }
            })
    }
    postCode(code: string, state: string): Promise<Token> {
        return this.service.postCode(
            'https://training-github-app-login.skrz.now.sh/auth',
            { "code": code, "state": state}, 
            { headers: {'Content-Type': 'application/json'}}
            )
            .then((result: any)=>{
                if (result.error) {
                    return result.error
                }
                else {
                    let gettoken = result.token!
                    return gettoken
                }
            })
    }
}