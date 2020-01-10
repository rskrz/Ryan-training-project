import { AxiosInstance } from "axios";
import { container, TYPE } from "../services/container";

interface Repo {
  name: string;
  description: string;
}

interface Token {
  body: {
    access_token: string;
  };
}

interface GetReposResult {
  repos?: Repo[];
  error?: Error;
}

interface GetTokenResult {
  token?: Token;
  error?: Error;
}

interface Service {
  getRepos(url: string): Promise<GetReposResult>;
  getIssues(url: string, headers: object): Promise<GetReposResult>;
  postCode(
    url: string,
    params: object,
    headers: object
  ): Promise<GetTokenResult>;
}

class AppService implements Service {
  constructor(private axios: AxiosInstance) {}
  getRepos(url: string): Promise<GetReposResult> {
    return this.axios.get(url).then(response => {
      return Promise.resolve({
        repos: response.data.items
      });
    });
  }
  getIssues(url: string, headers: object): Promise<GetReposResult> {
    return this.axios.get(url, headers).then(response => {
      return Promise.resolve({
        repos: response.data
      });
    });
  }
  postCode(
    url: string,
    params: object,
    headers: object
  ): Promise<GetTokenResult> {
    return this.axios.post(url, params, headers).then((response: any) => {
      return Promise.resolve({
        token: response.data
      });
    });
  }
}

class Controller {
  constructor(private service: Service) {}
  async getTrendingRepos(): Promise<GetReposResult> {
    return await this.service
      .getRepos(
        "https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc"
      )
      .then(reposResult => {
        let result: GetReposResult;
        if (reposResult.error) result = { error: reposResult.error };
        else if (!reposResult.repos || reposResult.repos.length === 0)
          result = { error: Error("No trending repos") };
        else result = { repos: reposResult.repos };
        return Promise.resolve(result);
      });
  }
  async getIssues(token: string): Promise<GetReposResult> {
    return await this.service
      .getIssues("https://api.github.com/user/issues?filter=all&state=all", {
        headers: { Authorization: "token " + token }
      })
      .then(repoResult => {
        let result: GetReposResult;
        if (repoResult.error) result = { error: repoResult.error };
        else if (!repoResult.repos || repoResult.repos.length === 0)
          result = { error: Error("User has no issues") };
        else result = { repos: repoResult.repos };
        return Promise.resolve(result);
      });
  }
  postCode(code: string, state: string): Promise<Token> {
    return this.service
      .postCode(
        "https://training-github-app-login.skrz.now.sh/auth",
        { code: code, state: state },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((result: any) => {
        return result.error
          ? Promise.resolve(result.error)
          : Promise.resolve(result.token);
      });
  }
}

class RepositoryControllerMockWrapper {
  constructor(private getTrendingRepos: any) {}

  controller: Controller | undefined;

  getMock(): Controller {
    this.controller = new Controller(container.get(TYPE.Controller));
    this.controller.getTrendingRepos = this.getTrendingRepos;
    return this.controller;
  }
  //trending = require("../tests/integration/trending_repos.json")
  getReposMock() {
    return {
      total_count: 748215,
      incomplete_results: false,
      items: [
        {
          id: 41881900
        }
      ]
    };
  }
}

//container.bind<Controller>(TYPE.Controller).toFactory(() => new Controller(container.get(TYPE.Controller)))
container.bind<Controller>(TYPE.Controller).to(Controller);

export {
  Repo,
  Token,
  GetReposResult,
  GetTokenResult,
  Service,
  AppService,
  Controller,
  RepositoryControllerMockWrapper
};
