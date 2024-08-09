import puppeteer from 'puppeteer'
import {Individu} from "./Individu";
import * as fs from "fs";

const baseUrl = "https://www.nosorigines.qc.ca/GenealogieQuebec.aspx";

const individus = [1290361, 1290362, 1218368, 1218367];

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const jsonFilePath = "./data.json"
    let jsonData = []

    for(let individu = 0; individu < individus.length; individu++){
        await page.goto(`${baseUrl}?pid=${individus[individu]}`, { timeout: 0 });
        const personne = new Individu(individus[individu], page)
        const ancetre = await personne.getIndividu(page)

        if(!individus.includes(parseInt(ancetre.pereID))){individus.push(parseInt(ancetre.pereID))}
        if(!individus.includes(parseInt(ancetre.mereID))){individus.push(parseInt(ancetre.mereID))}

        console.log(`${individu} | ${ancetre.prenom} ${ancetre.nom}`)
        jsonData.push(ancetre);


    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    await browser.close();
})();