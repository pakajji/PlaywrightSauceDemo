import { chromium } from '@playwright/test'
import { existsSync } from 'fs'

async function globalSetup() {
    if(existsSync('state.json')) {
        console.log('พบ state.json อยู่แล้ว ข้าม login process')
        return
    }

    // เปิด browser แบบ headful ให้ผู้ใช้ล็อกอินเอง
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto('https://www.saucedemo.com/', {
        waitUntil: 'domcontentloaded',
    })
    
    await page.waitForURL(
        (url) =>
            url.toString().startsWith('https://www.saucedemo.com/') &&
            new URL(url.toString()).searchParams.has('code'),
        { timeout: 0 }
    )

    await page.waitForLoadState('networkidle')

    await context.storageState({ path: 'state.json' })
    console.log(' เก็บ state ใน state.json เรียบร้อยแล้ว')

    await browser.close()
}

export default globalSetup