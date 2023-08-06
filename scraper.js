const express = require('express')
const PORT = 4000
const app = express()
const cors = require('cors')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173'
  }));
//thanks to chatgpt for the cors origin line

let names;
let h2s;
const FindH1 = async(url) =>{
    // const filepath = path.join(__dirname, `${name}.txt`)
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    console.log('scraper running')

    await page.goto(url)
    names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("h1")).map(x => x.textContent)
    })

    console.log(names)

    // await page.screenshot({ path: `leaf_project/src/images/website.png`})
    await browser.close()
    return names

}


app.post('/getinfo', async(req,res) =>{
    console.log('logging body', req.body)
    let response = await FindH1(req.body.url)
    console.log(response)
    res.send(response)
})



app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})

//thanks to chatgpt and puppeteers documentation, youtube videos etc for this