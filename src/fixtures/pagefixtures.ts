
import {test as baseTest} from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { CsvHelper } from '../utils/CsvHelper';

// define types for page fixtures:

type pageFixtures={
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    testData:Record<string, string>[]
};

//extend playwright base test:
export let test=baseTest.extend<pageFixtures>({
    
    basePage: async({page}, use)=>{
        let basePage= new BasePage(page);
        await use(basePage);
    },
    loginPage: async({page}, use)=>{
        let loginPage=new LoginPage(page);
        await use(loginPage);
    },
    homePage: async({page}, use) =>{
        let homePage= new HomePage(page);
        await use(homePage);
    },
    testData: async({ }, use)=> {
          let testData= CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }
        
});

export {expect} from '@playwright/test';