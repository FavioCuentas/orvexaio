import { test, expect } from '@playwright/test';
for (const width of [390,768,1440]) {
 test(`Home and navigation at ${width}px`, async ({page})=>{
  await page.setViewportSize({width,height:900});
  const errors: string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
  await page.goto('/');
  await expect(page.locator('.brand-card')).toHaveCount(5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  for(const card of await page.locator('.brand-card').all()) {
   await expect(card.locator('h3')).toBeVisible();
   await expect(card.locator('a')).toBeVisible();
  }
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();
  if(width===390){
   const menu=page.getByRole('button',{name:'Menú'});
   await menu.click();
   await expect(menu).toHaveAttribute('aria-expanded','true');
   await page.getByRole('navigation',{name:'Navegación principal'}).getByRole('link',{name:'Nosotros',exact:true}).click();
   await expect(page.getByRole('button',{name:'Menú'})).toHaveAttribute('aria-expanded','false');
   await expect(page).toHaveURL(/#nosotros$/);
  }
  await page.goto('/');
  await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
  const links=await page.locator('.brand-link:not([target="_blank"])').evaluateAll(els=>els.map(a=>(a as HTMLAnchorElement).getAttribute('href')!));
  for(const href of links){
   await page.goto(href);
   await expect(page.locator('main .status')).toHaveText('Página en preparación');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
   await page.getByRole('link',{name:'← Volver al ecosistema'}).click();
   await expect(page.locator('#ecosistema')).toBeVisible();
  }
  expect(errors).toEqual([]);
 });
}
test('Internal anchors resolve and unknown routes recover',async({page})=>{
 await page.goto('/');
 const hashes=await page.locator('a[href^="#"], a[href^="/#"]').evaluateAll(els=>els.map(el=>(el as HTMLAnchorElement).hash));
 for(const hash of hashes) await expect(page.locator(hash)).toHaveCount(1);
 await page.emulateMedia({reducedMotion:'reduce'});
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
 await page.goto('/no-existe');
 await expect(page.getByText('404 · PÁGINA NO ENCONTRADA')).toBeVisible();
 await page.getByRole('link',{name:'Ir al inicio'}).click();
 await expect(page.locator('.brand-card')).toHaveCount(5);
});
