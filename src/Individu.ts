import {Page} from "puppeteer";

export class Individu {
    id: number;
    prenom: string | null;
    nom: string | null;
    sexe: string | null;
    metier: string | null;
    naissance: string | null;
    villeNaissance: string | null;
    paysNaissance: string | null;
    bapteme: string | null;
    deces: string | null;
    villeDeces: string | null;
    paysDeces: string | null;
    inhumation: string | null;
    pereID: string | any;
    photo: string | null;
    mereID: string | any;
    page: any;

    constructor(id: number, page: Page) {
        this.id = id
        this.prenom = ""
        this.nom = ""
        this.sexe = ""
        this.metier = ""
        this.naissance = ""
        this.villeNaissance = ""
        this.paysNaissance = ""
        this.bapteme = ""
        this.deces = ""
        this.villeDeces = ""
        this.paysDeces = ""
        this.inhumation = ""
        this.pereID = ""
        this.mereID = ""
        this.photo = ""
        this.page = page
    }

    async getIndividu(page: Page) {
        const data = await page.evaluate(() => {
            const rows = document.querySelectorAll('.genealogical_Record_Men tr');
            const tableObject: { [key: string]: string | null } = {};  // Explicit typing for better clarity
            let modeNaissance = true;

            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');

                if (cells.length >= 2) {
                    const key = cells[0].textContent?.trim() || '';
                    const value = cells[1].textContent?.trim() || '';

                    let keyName;
                    switch (key) {
                        case "ID No:":
                            keyName = "id";
                            break;
                        case "Prénom:":
                            keyName = "prenom";
                            break;
                        case "Nom:":
                            keyName = "nom";
                            break;
                        case "Sexe:":
                            keyName = "sexe";
                            break;
                        case "Occupation:":
                            keyName = "metier";
                            break;
                        case "Naissance:":
                            keyName = "naissance";
                            break;
                        case "Paroisse/ville:":
                            keyName = modeNaissance ? "villeNaissance" : "villeDeces";
                            break;
                        case "Pays:":
                            keyName = modeNaissance ? "paysNaissance" : "paysDeces";
                            modeNaissance = false;
                            break;
                        case "Décès:":
                            keyName = "deces";
                            break;
                        case "Inh./Source:":
                            keyName = "inhumation";
                            break;
                        default:
                            keyName = undefined;
                            console.log('Erreur avec ' + key);
                    }

                    if (keyName) {
                        tableObject[keyName] = value;
                    }
                }
            });

            return tableObject;
        });


        Object.assign(this, data);  // Assign the extracted data to the instance
        await this.getMereID()
        await this.getPereID()
        return {
            id: this.id,
            prenom: this.prenom,
            nom: this.nom.split(' ')[0],
            sexe: this.sexe,
            metier: this.metier,
            naissance: this.naissance,
            villeNaissance: this.villeNaissance,
            paysNaissance: this.paysNaissance,
            bapteme: this.bapteme,
            deces: this.deces,
            villeDeces: this.villeDeces,
            paysDeces: this.paysDeces,
            inhumation: this.inhumation,
            pereID: this.pereID,
            photo: this.photo,
            mereID: this.mereID
        }

    }


    async getElement(elem: string, type: string): Promise<string | null> {

        const element = await this.page.$(elem);
        if (element) {
            const propertyHandle = await element.getProperty(type);
            const propertyValue = await propertyHandle.jsonValue();
            return propertyValue ? propertyValue.toString().trim() : null;
        }
        return null;
    }

    async getPhoto() {
        const path = "#imgPersonPhoto"
        this.photo = await this.getElement(path, "src")
    }

    async getPereID() {
        const path = "#hlnkFather"
        let tmp = await this.getElement(path, "href")
        if (tmp) {
            this.pereID = tmp.split('pid=')[1]
        }
    }

    async getMereID() {
        const path = "#hlnkMother"
        let tmp = await this.getElement(path, "href")
        if (tmp) {
            this.mereID = tmp.split('pid=')[1]
        }

    }

}