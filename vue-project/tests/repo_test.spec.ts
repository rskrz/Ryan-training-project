interface Repo {
    name: string 
    description: string 
}
  
interface GetTrendingReposHttpRequestResult {
    repos?: Repo[]
    error?: Error
}

interface HttpNetworkRequestResult {
    // Both of these fields will be populated if the network request happened. You may have received a bad HTTP response such as a 500 or 422, but at least it happened!
    statusCode?: number 
    responseBody?: any 
    // Error will only be populated if the network request happened. Maybe there was a problem with the Internet. 
    error?: Error
}
  
interface HttpNetworkRequestUtil {
    get(path: string): Promise<HttpNetworkRequestResult>
}
  
class GetTrendingReposController {
    constructor(private networkRequestUtil: HttpNetworkRequestUtil) {
    }

    async getTrendingRepos(): Promise<GetTrendingReposHttpRequestResult> {
        return this.networkRequestUtil.get("/search/trending").then(networkResult => {
            let result: GetTrendingReposHttpRequestResult
            if (networkResult.error) {
                result = {
                    error: networkResult.error
                }
            } 
            else {
                if (networkResult.statusCode! >= 500) {
                    result = {
                        error: new Error("Sorry, our system is down. Check back later and try again.")
                    }
                } 
                // We could continue to parse status codes, but the trending repos endpoint doesn't return other http response codes we need to prepare for. 
                
                else {
                    result = {
                        repos: networkResult.responseBody as Repo[]
                    }
                }
            }

            return Promise.resolve(result)
        })
    }
}
  
describe("GetTrendingReposController unit tests", () => {
    describe("getTrendingRepos()", () => {
        it("should receive error if network request returns back a 500", () => {
            // Whoa...Isn't mocking so cool?! We can test our app responds to these rare events.
            let NetworkRequestResult: HttpNetworkRequestResult = {
                statusCode: 500,
                responseBody: ""
            }
            let mockRequestResult = jest.fn().mockResolvedValueOnce(NetworkRequestResult)
            let requestUtil: HttpNetworkRequestUtil = {
                get: mockRequestResult
            }
            let reposController = new GetTrendingReposController(requestUtil)
            reposController.getTrendingRepos().then(error=>{
                expect(error.error).toEqual(Error('Sorry, our system is down. Check back later and try again.'))
            })
        })
        it("should receive error if the network request failed with an error (the request did not complete)", () => {
            let NetworkRequestResult: HttpNetworkRequestResult = {
                statusCode: 500,
                responseBody: "",
                error: new Error('the request did not complete')
            }
            let mockRequestResult = jest.fn().mockResolvedValueOnce(NetworkRequestResult)
            let requestUtil: HttpNetworkRequestUtil = {
                get: mockRequestResult
            }
            let reposController = new GetTrendingReposController(requestUtil)
            reposController.getTrendingRepos().then(error=>{
                expect(error.error).toEqual(Error('the request did not complete'))
            })
        })
        it("should receive list of repos if the network request was successful", () => {
            let repo_one: Repo = {
                name: 'one',
                description: 'desc'
            }
            let repo_two: Repo = {
                name: 'two',
                description: 'desc'
            }
            let mockTrendingReposResult: GetTrendingReposHttpRequestResult = {
                repos: [repo_one, repo_two]
            }
            let NetworkRequestResult: HttpNetworkRequestResult = {
                responseBody: mockTrendingReposResult.repos,
            }
            let mockRequestResult = jest.fn().mockResolvedValueOnce(NetworkRequestResult)
            let requestUtil: HttpNetworkRequestUtil = {
                get: mockRequestResult
            }
            let reposController = new GetTrendingReposController(requestUtil)
            reposController.getTrendingRepos().then(response=>{
                expect(response.repos).toEqual([repo_one, repo_two])
            })
        })
    })
})