import puppeteer from 'puppeteer'
import * as field from './fieldsMapping'

const baseUrl = "https://www.nosorigines.qc.ca/GenealogieQuebec.aspx";

const individus = [667529];

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    const personneInfo = [field.id, field.prenom, field.nom, field.sexe, field.metier, field.naissance, field.villeNaissance, field.paysNaissance, field.bapteme, field.deces, field.villeDeces, field.paysDeces, field.inhumation ]

    for(let individu = 0; individu < individus.length; individu++){
        console.log(individus)
        await page.goto(`${baseUrl}?pid=${individus[individu]}`);
        for(let i = 0; i < personneInfo.length; i++) {
            const elem = await page.$(personneInfo[i])
            if (elem) {
                const y = (await (await elem.getProperty('textContent')).jsonValue()) || ""
            }
        }
        const pereElem = await page.$(field.pere) || ""
        const mereElem  = await page.$(field.mere) || ""

        if (typeof pereElem !== "string") {
            const pere = (await pereElem.getProperty('href')).toString()

            if(pere){
                individus.push(parseInt(pere.split("pid=")[1]))
            }
        }

        if (typeof mereElem !== "string") {
            const mere = (await mereElem.getProperty('href')).toString()

            if(mere){
                individus.push(parseInt(mere.split("pid=")[1]))
            }
        }

        // await new Promise(r => setTimeout(r, 3000));

    }

    await browser.close();
})();