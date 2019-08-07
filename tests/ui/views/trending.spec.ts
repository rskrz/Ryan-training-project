import { shallowMount, mount, Wrapper} from "@vue/test-utils"
import Trending from "@/views/Trending.vue"
import { Controller, RepositoryControllerMockWrapper, GetReposResult } from "@/controller"
import flushpromises from "flush-promises"
import { container, TYPE } from "../../../services/container"

describe("Trending.vue", () => {
    class TrendingWrapper {
        constructor(public wrapper: Wrapper<Trending>) {}
    
        get reposList(): Wrapper<Trending> {
            return this.wrapper.find("#Repos") as Wrapper<Trending>
        }

        get errorMsg(): Wrapper<Trending> {
            return this.wrapper.find('h3.err') as Wrapper<Trending>
        }

        get refreshButton(): Wrapper<Trending> {
            return this.wrapper.find('button') as Wrapper<Trending>
        }

        get refreshTime(): Wrapper<Trending> {
            return this.wrapper.find('p.time') as Wrapper<Trending>
        }

        get loadingImg(): Wrapper<Trending> {
            return this.wrapper.find('img.loader') as Wrapper<Trending>
        }

    }
    const setMocks = (repositoryControllerMock: Controller) => {
        container
            .rebind<Controller>(TYPE.Controller)
            .toValue(repositoryControllerMock)
    }
    it('expect to see loading view when first opened', async () => {
        const wrapper = new TrendingWrapper(shallowMount(Trending))

        expect(wrapper.refreshButton.isVisible()).toBe(true)
        expect(wrapper.loadingImg.isVisible()).toBe(true)
        expect(wrapper.reposList.exists()).toBe(false)
        expect(wrapper.refreshTime.text()).toEqual('0 minutes old')
    })
    it("expect to see repos list after a successful fetch", async () => {
        let repos = require('../../integration/trending_repos.json')
        let mockWrapper = new RepositoryControllerMockWrapper(
            jest.fn().mockResolvedValueOnce(repos)
        )
        setMocks(mockWrapper.getMock())

        const wrapper = new TrendingWrapper(mount(Trending))

        await flushpromises()
        wrapper.refreshButton.trigger('click')

        expect(wrapper.reposList.exists()).toBe(true)
    })
    it("expect to see empty repo error message", async () => {
        let result: GetReposResult = {error: new Error('error')}
        let mockWrapper = new RepositoryControllerMockWrapper(
            jest.fn().mockReturnValueOnce(Promise.resolve({
                error: new Error("Internal Server Error"),
            }))
          );
        setMocks(mockWrapper.getMock())

        const wrapper = new TrendingWrapper(shallowMount(Trending))
        wrapper.refreshButton.trigger("click")
        wrapper.wrapper.setData({isError: true})
      
        await flushpromises()
      
        expect(wrapper.errorMsg.exists()).toBe(true)
        expect(wrapper.reposList.exists()).toBe(false)
    })
})

