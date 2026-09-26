import {test, expect } from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/Homepage';

let loginPage: LoginPage;
let homePage:HomePage;

test.beforeEach(async({page})=>{
    loginPage= new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage=new HomePage(page);
})

test('Login page title test', async ()=>{// destructing
    const pageTitle= await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ()=>{// destructing
    expect(await loginPage.isforgottenPasswordLink()).toBeTruthy();
});

test('user is able to login to app test', async ()=>{// destructing
    await loginPage.doLogin('arunkumarmn45@gmail.com', 'Bangalore7');
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect(await homePage.getHomePageTitle()).toBe('My Account');
});


