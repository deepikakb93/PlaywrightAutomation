const { test, expect } = require('@playwright/test');

test('Web Client App login', async ({ page}) => {
    
    // const context=await browser.newContext();
    // const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const email="deepikakb93@gmail.com";
    const password="Password@1234";

    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.locator('[id="login"]').click();
   // await page.waitForLoadState('networkidle');
    await page.locator("//section[contains(@id,'products')]//div[@class='row']//h5").first().waitFor();
    const title_values=await page.locator("//section[contains(@id,'products')]//div[@class='row']//h5").allTextContents();
    console.log(title_values)



});