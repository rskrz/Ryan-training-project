import { shallowMount, mount, Wrapper, createLocalVue } from "@vue/test-utils"
import Issues from "@/views/Issues.vue"
import Vuex from 'vuex'
import { Controller, RepositoryControllerMockWrapper } from "@/controller"
import flushpromises from "flush-promises"
import { container, TYPE } from "../../../services/container"

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Issues.vue', () => {
    class IssuesWrapper {
        constructor(public wrapper: Wrapper<Issues>) {}

        get issueList(): Wrapper<Issues> {
            return this.wrapper.find('#IssueList') as Wrapper<Issues>
        }

        get errorMsg(): Wrapper<Issues> {
            return this.wrapper.find('h3.err') as Wrapper<Issues>
        }

        get refreshButton(): Wrapper<Issues> {
            return this.wrapper.find('button') as Wrapper<Issues>
        }

        get refreshTime(): Wrapper<Issues> {
            return this.wrapper.find('p.time') as Wrapper<Issues>
        }

        get loadingImg(): Wrapper<Issues> {
            return this.wrapper.find('img.loader') as Wrapper<Issues>
        }

    }
    const setMocks = (repositoryControllerMock: Controller) => {
        container
            .rebind<Controller>(TYPE.Controller)
            .toValue(repositoryControllerMock)
    }

    it('should show loading img', async () => {
        let state = {
            token: () => 'abc'
        }
        let store = new Vuex.Store({
            state
        })
        const wrapper = new IssuesWrapper(shallowMount(Issues, {store, localVue}))
        await flushpromises()
        wrapper.refreshButton.trigger('click')
        expect(wrapper.refreshButton.isVisible()).toBe(true)
        expect(wrapper.loadingImg.isVisible()).toBe(true)
        expect(wrapper.issueList.exists()).toBe(false)
        expect(wrapper.refreshTime.text()).toEqual('0 minutes old')
    })
    it('should show issues list', async () => {
        let state = {
            token: () => 'abc'
        }
        let store = new Vuex.Store({
            state
        })
        const wrapper = new IssuesWrapper(mount(Issues, {store, localVue}))
        wrapper.refreshButton.trigger('click')
        await flushpromises()

        expect(wrapper.errorMsg.exists()).toBe(false)
        expect(wrapper.issueList.exists()).toBe(true)
    })
    it("expect to see empty repo error message", async () => {
        let state = {
            token: () => 'abc'
        }
        let store = new Vuex.Store({
            state
        })
        let mockWrapper = new RepositoryControllerMockWrapper(
            jest
              .fn()
              .mockResolvedValueOnce(
                  {error: Error('User has no issues')}
              )
            )
        setMocks(mockWrapper.getMock())
        const wrapper = new IssuesWrapper(shallowMount(Issues, {store, localVue}))
      
        wrapper.refreshButton.trigger("click")
        wrapper.wrapper.setData({isError: true})

        await flushpromises()
        
      
        expect(wrapper.errorMsg.exists()).toBe(true)
        expect(wrapper.issueList.exists()).toBe(false)
    })
})