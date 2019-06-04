import { AxiosInstance } from 'axios'

interface Repo {
    name: string 
    description: string 
}

interface Token {
    name: string
}
interface GetReposResult {
    repos?: Repo[]
    error?: Error
}

interface GetTokenResult {
    token?: Token
    error?: Error
}

interface Service {
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
                token: response
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
                    return Promise.resolve(result.error)
                } 
                else {
                    let repos = result.repos!
                    return Promise.resolve(repos)
                }
            })
    }
    getIssues(token: string): Promise<Repo[]> {
        return this.service.getIssues(
            'https://api.github.com/user/issues?filter=all&state=all',
            { headers: {'Authorization': 'token '+token}})
            .then((result: any) => {
                if (result.error) {
                    return Promise.resolve(result.error)
                } 
                else {
                    let repos = result.repos!
                    return Promise.resolve(repos)
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
                    return Promise.resolve(result.error)
                } 
                else {
                    let gettoken = result.token!
                    return Promise.resolve(gettoken)
                }
            })
    }
}