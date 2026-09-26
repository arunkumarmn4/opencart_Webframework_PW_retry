import { test, expect } from '@playwright/test';

let AUTH_TOKEN={Authorization: 'Bearer 3175546a741522cea14634dc1a693b298b27917ea60165fc83fc1823e0320ebd'};

test('get user test', async ({request})=>{// destructing
  let response=await request.get('https://gorest.co.in/public/v2/users/8631089',{
    headers:AUTH_TOKEN
  });
  console.log(response);
  let jsonBody=await response.json();
  console.log("Arun one", jsonBody);
  console.log("Arun response",response.status());// 200
  console.log("arun two", response.statusText());//0k is the text
});


test('Create a user test', async ({request})=>{// destructing
    //JS object
    let userData={
        name: 'uday',
        email:'uday123@pw.com',
        gender:'male',
        status:'active'
    }
    //JS object to JSON: Serialization-> post call will do serialization automatically it's inbuilt.
  let response=await request.post('https://gorest.co.in/public/v2/users',{
    headers:AUTH_TOKEN,
    data:userData
  });

  console.log(response);
  let jsonBody=await response.json();
  console.log("Arun one", jsonBody);
  console.log("Arun response",response.status());// 201
  console.log("arun two", response.statusText());//created is the text
});