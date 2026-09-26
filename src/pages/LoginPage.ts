import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    //Private Locators:
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly login: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page){
        super(page)// call parent class constructor
        this.emailId= page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password=page.getByRole('textbox', { name: 'Password' });
        this.login=page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink=page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo=page.getByAltText('naveenopencart');
        this.loginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    };
    //public page actions(methods)/behavior
    async goToLoginPage(): Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }
    async getLoginPageTitle():Promise<string>{
        return await this.page.title();
    }
    async isforgottenPasswordLink():Promise<boolean>{
        return await this.forgottenPasswordLink.isVisible();
    }
    async doLogin(username: string, password: string){
        console.log(`user creds':${username}:${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);// all this methods, 
        //are private locators is called encapsulation
        await this.login.click();
    }
    async isInvalidLoginErrorDisplayed():Promise<boolean>{
        return await this.loginErrorMessage.isVisible();
    }
   
}