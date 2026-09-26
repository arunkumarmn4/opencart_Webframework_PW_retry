import {test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin('kumarmn45@gmail.com', 'Bangalore7');
});

test('title on homepage', async ({homePage})=>{// destructing
    const pageTitle= await homePage.getHomePageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({homePage})=>{// destructing
   expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('verify header', async({homePage})=>{
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