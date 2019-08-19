import { shallowMount, mount, Wrapper, WrapperArray } from "@vue/test-utils"
import Trending from "@/views/Trending.vue"
import { Controller } from "@/controller"
import flushpromises from "flush-promises"
import { container, TYPE } from "../../../services/container"
import RepoItem from "@/components/RepoItem.vue"

describe("RepoItem.vue", () => {
    //let ri = require('../../integration/trending_repos.json')
    it('should receive repo', () => {
        let sample_repo = {
            "id" : 41881900,
            "name": "vscode",
            "owner" : {
                "login": "microsoft",
                "avatar_url": "https://avatars2.githubusercontent.com/u/6154722?v=4",
                "html_url": "https://github.com/microsoft",
            },
            "description": "Visual Studio Code",
            "html_url": "https://github.com/microsoft/vscode",
        } 
        let wrapper = mount(RepoItem, {
            propsData: {
                repo: sample_repo
            }
        })
        expect(wrapper.props().repo.name).toBe('vscode')
    })
})