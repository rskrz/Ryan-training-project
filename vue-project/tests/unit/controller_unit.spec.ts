import {Controller, Service, GetReposResult, GetTokenResult, Token, AppService} from '@/controller.ts'

describe("AppService unit tests", () => {
    describe("getRepos()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetReposResult = {
                error: Error('400 Bad Request')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getTrendingRepos().then(error=>{
                expect(error).toEqual(Error('400 Bad Request'))
            })
        })
        it("should recieve error if there are no repos", () => {
            let repoResult: GetReposResult = {
                repos: undefined
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getTrendingRepos().then(response=>{
                expect(response).toEqual(Error('No trending repos'))
            })
        })
        it("should recieve error if there are no repos", () => {
            let repoResult: GetReposResult = {
                repos: []
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getTrendingRepos().then(response=>{
                expect(response).toEqual(Error('No trending repos'))
            })
        })
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
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getTrendingRepos().then(response=>{
                expect(response).toEqual([repo_one,repo_two])
            })
        })
    })
    describe("getIssues()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetReposResult = {
                error: Error('400 Bad Request')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getIssues('').then(error=>{
                expect(error).toEqual(Error('400 Bad Request'))
            })
        }),
        it("should recieve error if there are no issues", () => {
            let repoResult: GetReposResult = {
                repos: undefined
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getIssues('').then(response=>{
                expect(response).toEqual(Error('User has no issues'))
            })
        })
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
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.getIssues('').then(response=>{
                expect(response).toEqual([repo_one,repo_two])
            })
        })
    })
    describe("postCode()", () => {
        it("should receive error if request fails", () => {
            let repoResult: GetTokenResult = {
                error: Error('400 Bad Request')
            }
            let mockResult = jest.fn().mockResolvedValueOnce(repoResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.postCode('','').then(error=>{
                expect(error).toEqual(Error('400 Bad Request'))
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
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.postCode('','').then(response=>{
                expect(response).toEqual(get_token)
            })
        })
        it("should receive error if request unsuccessful", () => {
            let get_token: Token = {
                name: 'one',
            }

            let tokenResult: GetTokenResult = {
                token: get_token
            }
            let mockResult = jest.fn().mockResolvedValueOnce(tokenResult)
            let service: Service = {
                getRepos: mockResult,
                getIssues: mockResult,
                postCode: mockResult
            }
            let controller = new Controller(service)
            controller.postCode('','').then(response=>{
                expect(response).toEqual(get_token)
            })
        })
    })
})