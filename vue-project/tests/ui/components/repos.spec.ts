import { shallowMount, mount, Wrapper, WrapperArray } from "@vue/test-utils"
import Trending from "@/views/Trending.vue"
import { Controller } from "@/controller"
import flushpromises from "flush-promises"
import { container, TYPE } from "../../../services/container"
import Repos from "@/components/Repos.vue"

describe("Repos component tests", () => {
    const wrapper = mount(Repos)
    it('renders repos', () => {
        expect(wrapper.html()).toContain('<div id=\"Repos\" class=\"w-50-ns w-100 border w-90-m\"></div>')
    })
})