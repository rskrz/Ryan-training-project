import { Container, createDecorator } from "@owja/ioc"
import { TYPE } from "./types"
import { Controller, AppService } from "../src/controller"

const container = new Container();
const inject = createDecorator(container);

//container.bind<Controller>(TYPE.Controller).to(Controller)
//container.bind<AppService>(TYPE.AppService).to(AppService)

class MockController {
    @inject(TYPE.Controller)
    readonly controller!: Controller
    
    @inject(TYPE.AppService)
    readonly appService!: AppService
}

export {container, TYPE, inject, MockController}