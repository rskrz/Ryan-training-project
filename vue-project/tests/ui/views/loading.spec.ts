import { mount, Wrapper, createLocalVue } from "@vue/test-utils"
import Loading from "@/views/Loading.vue"
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Loading.vue', () => {
    class LoadingWrapper {
        constructor(public wrapper: Wrapper<Loading>) {}

        get header(): Wrapper<Loading> {
            return this.wrapper.find('h1') as Wrapper<Loading>
        }
    }

    it('should show header', () => {
        let state = {
            token: () => 'abc'
        }
        let store = new Vuex.Store({
            state
        })
        
        const wrapper = new LoadingWrapper(mount(Loading, {store, localVue}))

        expect(wrapper.header.exists()).toBe(true)
        expect(wrapper.header.isVisible()).toBe(true)
        expect(wrapper.header.text()).toEqual("Finishing GitHub login")
    })
})