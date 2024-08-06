import {Page} from "puppeteer";

export class Individu {
    private id: number;
    private prenom: string | null;
    private nom: string | null;
    private sexe: string | null;
    private metier: string | null;
    private naissance: string | null;
    private villeNaissance: string | null;
    private paysNaissance: string | null;
    private bapteme: string | null;
    private deces: string | null;
    private villeDeces: string | null;
    private paysDeces: string | null;
    private inhumation: string | null;
    public pereID: string;
    private photo: string | null;
    public mereID: string;
    private page: any;

    constructor(id:number, page: Page) {
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

    async get() {
        await this.getPereID()
        await this.getMereID()
        await this.getPrenom()
        await this.getNom()
        await this.getSexe()
        await this.getMetier()
        await this.getNaissance()
        await this.getVilleNaissance()
        await this.getPaysNaissance()
        await this.getBapteme()
        await this.getDeces()
        await this.getVilleDeces()
        await this.getPaysDeces()
        await this.getInhumation()
        await this.getPhoto()
        return {
            id: this.id,
            prenom: this.prenom,
            nom: this.nom,
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
            mereID: this.mereID,
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

    async getPrenom() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4) > td.tdlb > strong"
        this.prenom = await this.getElement(path, "textContent")
    }

    async getNom() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td.tdl > b"
        this.nom = await this.getElement(path, "textContent")
    }

    async getSexe() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(6) > td.tdl"
        this.sexe = await this.getElement(path, "textContent")
    }

    async getMetier() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(7) > td.tdl"
        this.metier = await this.getElement(path, "textContent")
    }

    async getNaissance() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td.tdl"
        this.naissance = await this.getElement(path, "textContent")
    }

    async getVilleNaissance() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(9) > td.tdl"
        this.villeNaissance = await this.getElement(path, "textContent")
    }

    async getPaysNaissance() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(10) > td.tdl"
        this.paysNaissance = await this.getElement(path, "textContent")
    }

    async getBapteme() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(11) > td.tdref"
        this.bapteme = await this.getElement(path, "textContent")
    }

    async getDeces() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(12) > td.tdl"
        this.deces = await this.getElement(path, "textContent")
    }

    async getVilleDeces() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(13) > td.tdl"
        this.villeDeces = await this.getElement(path, "textContent")
    }


    async getPaysDeces() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(14) > td.tdl"
        this.paysDeces = await this.getElement(path, "textContent")
    }

    async getInhumation() {
        const path = "#form1 > div.content > table:nth-child(6) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(15) > td.tdref"
        this.inhumation = await this.getElement(path, "textContent")
    }

    async getPhoto() {
        const path = "#imgPersonPhoto"
        this.photo = await this.getElement(path, "src")
    }

    async getPereID() {
        const path = "#hlnkFather"
        let tmp = await this.getElement(path, "href")
        if(tmp){
            this.pereID = tmp.split('pid=')[1]
        }
    }

    async getMereID() {
        const path = "#hlnkMother"
        let tmp = await this.getElement(path, "href")
        if(tmp){
            this.mereID = tmp.split('pid=')[1]
        }

    }

}