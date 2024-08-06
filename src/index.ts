import puppeteer from 'puppeteer'
import * as field from './fieldsMapping'
import {Individu} from "./Individu";

const baseUrl = "https://www.nosorigines.qc.ca/GenealogieQuebec.aspx";

const individus = [1290361, 1290362];

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    for(let individu = 0; individu < individus.length; individu++){
        await page.goto(`${baseUrl}?pid=${individus[individu]}`);
        const personne = new Individu(individus[individu], page)
        const ancetre = await personne.get()

        if(!individus.includes(parseInt(ancetre.pereID))){individus.push(parseInt(ancetre.pereID))}
        if(!individus.includes(parseInt(ancetre.mereID))){individus.push(parseInt(ancetre.mereID))}

        console.log(`${individu} | ${ancetre.prenom} ${ancetre.nom} (${ancetre.naissance}-${ancetre.deces})`)
        // await new Promise(r => setTimeout(r, 3000));

    }

    await browser.close();
})();