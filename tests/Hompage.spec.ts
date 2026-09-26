import {test, expect } from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/Homepage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async({page})=>{
    loginPage= new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('arunkumarmn45@gmail.com', 'Bangalore7');
    homePage= new HomePage(page);
});

test('title on homepage', async ()=>{// destructing
    const pageTitle= await homePage.getHomePageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ()=>{// destructing
   expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('verify header', async()=>{
    let allHeader= await homePage.getHeaderTitle();
    console.log('home page header', allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});