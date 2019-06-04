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

describe("AppService unit tests", () => {
    describe("getRepos()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetReposResult = {
                error: Error('this is error')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.getTrendingRepos().then(error=>{
                expect(error).toEqual(Error('this is error'))
            })
        }),
        it("should receive repos if request successful", () => {
            let repo_one: Repo = {
                name: 'one',
                description: 'desc'
            }
            let repo_two: Repo = {
                name: 'two',
                description: 'desc'
            }
            let repoResult: GetReposResult = {
                repos: [repo_one,repo_two]
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.getTrendingRepos().then(response=>{
                expect(response).toEqual([repo_one,repo_two])
            })
        })
    })
    describe("getIssues()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetReposResult = {
                error: Error('this is error')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.getIssues('').then(error=>{
                expect(error).toEqual(Error('this is error'))
            })
        }),
        it("should receive issues if request successful", () => {
            let repo_one: Repo = {
                name: 'one',
                description: 'desc'
            }
            let repo_two: Repo = {
                name: 'two',
                description: 'desc'
            }
            let repoResult: GetReposResult = {
                repos: [repo_one,repo_two]
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.getIssues('').then(response=>{
                expect(response).toEqual([repo_one,repo_two])
            })
        })
    })
    describe("postCode()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetTokenResult = {
                error: Error('this is error')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.postCode('','').then(error=>{
                expect(error).toEqual(Error('this is error'))
            })
        }),
        it("should receive token if request successful", () => {
            let get_token: Token = {
                name: 'one',
            }

            let tokenResult: GetTokenResult = {
                token: get_token
            }
            let mockResult = jest.fn().mockResolvedValueOnce(tokenResult)
            let mockService: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let mockController = new Controller(mockService)
            mockController.postCode('','').then(response=>{
                expect(response).toEqual(get_token)
            })
        })
    })
})