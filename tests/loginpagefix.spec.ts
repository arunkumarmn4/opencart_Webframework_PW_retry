import{test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async({loginPage})=>{
  
    await loginPage.goToLoginPage();
})

test('Login page title test', async ({loginPage})=>{// destructing
    const pageTitle= await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({loginPage})=>{// destructing
    expect(await loginPage.isforgottenPasswordLink()).toBeTruthy();
});

test('user is able to login to app test', async ({loginPage,homePage})=>{// destructing
    await loginPage.doLogin(process.env.USERNAMEONE!,process.env.PASSWORD!);
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect(await homePage.getHomePageTitle()).toBe('My Account');
});


//DD_1. sequence mode--only 1 test is running with testdata one by one using testdata from fixture
test('login to app using wrong credentials with data driven test', async ({loginPage, testData})=>{// destructing
   for(let row of testData){
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
   }
});

//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise..

let testData=CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData){
    test(`invalid login test with- ${row.username}-${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//code for excel reading


let loginTestData=ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for (let row of loginTestData) {

    test(`invalid login test with excelData- ${row.username}-${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

let loginJSONData=JsonHelper.readJson("src/data/logindata.json");
for (let row of loginJSONData) {

    test(`invalid login test with JSONData- ${row.username}-${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};