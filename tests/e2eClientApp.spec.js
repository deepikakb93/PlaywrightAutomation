const {test,expect}=require('@playwright/test')

test('Order Placement Scenario', async ({browser}) => {

     const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const email="deepikakb93@gmail.com";
    const password="Password@1234";

    //Login
    await page.locator('#userEmail').waitFor();
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.locator('[id="login"]').click();

    //Add product to cart
    const productname="ZARA COAT 3";
    const products=page.locator(".card-body");
    await page.locator("div.container").waitFor();
    const producttiles=await page.locator(".card-body b").allTextContents({timeout:90000});
    console.log(producttiles);
    const count = await products.count()
    console.log("count:"+count);
    //await page.pause();
    for(let i=0;i<count;i++){
        if(await products.nth(i).locator("b").textContent() === productname){
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }else{
            console.error("product not clicked")
         }
    }
    await page.waitForLoadState('networkidle')


   // await page.locator("[style*='background-color']").waitFor();
    await page.locator("[routerlink*='cart']").click({timeout:90000});
    await page.locator("div li").first().waitFor();
    const cart_product=await page.locator(".cartSection h3").textContent();
    
    //validate the cart product name
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    //Checkout
    await page.locator("button[type='button']").last().click();
    const basepath=page.locator(".form__cc input");

    //Enter cart details
    await basepath.first().fill("4542 9931 9292 1193");
    await basepath.nth(1).fill("435");
    await basepath.nth(2).fill("Deepika");
    await basepath.nth(3).fill("rahulshettyacademy");

    await page.locator("button[type='submit']").click();
    
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    
    //Auto-suggestion drop down
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown= page.locator(".ta-results");
    await dropdown.waitFor();
    const dropdowncount=await dropdown.locator("button").count();
    console.log("dropdown count:"+dropdowncount)

    for(let j=0;j<dropdowncount;j++){
        const text=await dropdown.nth(j).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(j).click();
            break;
        }

    }

   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

})