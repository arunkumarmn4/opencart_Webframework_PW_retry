import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //Private Locators:
    private readonly logoutLink: Locator;
    private readonly headers: Locator;

    constructor(page: Page){
        super(page)// call parent class constructor
        this.logoutLink= page.getByRole('link', { name: 'Logout' });
        this.headers= page.getByRole('heading', {level:2});
    };
    //public page actions(methods)/behavior
    
    async getHomePageTitle():Promise<string>{
        return await this.page.title();
    }
    async isLogoutLinkExist():Promise<boolean>{
        return await this.logoutLink.isVisible();
    
}
    async getHeaderTitle():Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

}