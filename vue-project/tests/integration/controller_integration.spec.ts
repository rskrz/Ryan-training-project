import {Controller, Service, AppService, GetReposResult, GetTokenResult, Token} from '@/controller.ts'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'


describe("AppService unit tests", () => {
    describe("getRepos()", () => {
        it("should return a list of repos", ()=>{
            var mock = new MockAdapter(axios);
            var trending = require("./trending_repos.json")

            mock.onGet("https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc")
                .reply(200, trending)
                
            let controller = new Controller(new AppService(axios.create({})))
            controller.getTrendingRepos().then(response=>{
                expect(response).toEqual(trending.items)
            })
        })
        it("should return empty", () =>{
            var mock = new MockAdapter(axios);
            var empty = require("./empty_repos.json")

            mock.onGet("https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc")
                .reply(200, empty)
                
            let controller = new Controller(new AppService(axios.create({})))
            controller.getTrendingRepos().then(error=>{
                expect(error).toEqual(Error('No trending repos'))
            })
        })
    })
    describe("getIssues()", () => {
        it("should return a list of issues", ()=>{
            var mock = new MockAdapter(axios);
            var issues = require("./issues.json")

            mock.onGet('https://api.github.com/user/issues?filter=all&state=all')
                .reply(200, issues,{ headers: {'Authorization': 'token'}})
                
            let controller = new Controller(new AppService(axios.create({})))
            controller.getIssues('').then(response=>{
                expect(response).toEqual(issues)
            })
        })
        it("should return error", ()=>{
            var mock = new MockAdapter(axios);

            mock.onGet('https://api.github.com/user/issues?filter=all&state=all')
                .reply(200, [],{ headers: {'Authorization': 'token'}})
                
            let controller = new Controller(new AppService(axios.create({})))
            controller.getIssues('').then(response=>{
                expect(response).toEqual(Error('User has no issues'))
            })
        })
    })
    describe("postCode()", () => {
        it("should return token", () => {
            var mock = new MockAdapter(axios);
            let result = {
                'code': 'code',
                "state": 'Issues'
            }

            mock.onPost('https://training-github-app-login.skrz.now.sh/auth')
                .reply(200,
                    result, 
                    { headers: {'Content-Type': 'application/json'}}
                    )
            let controller = new Controller(new AppService(axios.create({})))
            controller.postCode('','').then((response:any)=>{
                expect(response).toEqual(result)
            })
        })
        /*
        it("should return error", () => {
            var mock = new MockAdapter(axios);
            let result = {
                "message":"Success",
                "body":
                {
                    "error":"bad_verification_code",
                    "error_description":"The code passed is incorrect or expired.",
                    "error_uri":"https://developer.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code"
                },
                "state":"Issues"
            }

            mock.onPost('https://training-github-app-login.skrz.now.sh/auth')
                .reply(200,
                    result, 
                    { headers: {'Content-Type': 'application/json'}}
                    )
            let controller = new Controller(new AppService(axios.create({})))
            controller.postCode('','').then((response:any)=>{
                //console.log(response.body.error)
                expect(response).toEqual('text')
            })
        })
        */
    })
})
