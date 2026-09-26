import { Page } from "@playwright/test";

export class BasePage{
   protected readonly page: Page;// protected-> child of basepage should use it ex: loginPage
    constructor(page: Page){
        this.page=page;
    }
}

//