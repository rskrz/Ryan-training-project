import { shallowMount, mount, Wrapper, createLocalVue } from "@vue/test-utils"
import LoginPage from "@/views/LoginPage.vue"
import Vuex from 'vuex'
import flushpromises from "flush-promises"

const localVue = createLocalVue()

localVue.use(Vuex)

describe("LoginPage.vue", () => {
    class LoginWrapper {
        constructor(public wrapper: Wrapper<LoginPage>){}

        get header(): Wrapper<LoginPage> {
            return this.wrapper.find('h1') as Wrapper<LoginPage>
        }
        get loginButton(): Wrapper<LoginPage> {
            return this.wrapper.find('button') as Wrapper<LoginPage>
        }
    }

    it('expect to see header upon page load', () => {
        const wrapper = new LoginWrapper(shallowMount(LoginPage))

        expect(wrapper.header.isVisible()).toBe(true)
    })
    it('expect new page to load upon clicking login button', async () => {
        let state = {
            lastPage: 'Trending'
        }
        let store = new Vuex.Store({
            state
        })

        const wrapper = new LoginWrapper(mount(LoginPage, {store, localVue}))

        const url = `https://github.com/login/oauth/authorize?client_id=c3bcbb2fc1175dae2d26&response_type=code&scope=repo&state=${store.state.lastPage}`

        window.location.assign = jest.fn()
        wrapper.loginButton.trigger('click')

        await flushpromises()

        expect(wrapper.loginButton.isVisible()).toBe(true)  
        expect(window.location.assign).toHaveBeenCalledWith(url)
    })
})