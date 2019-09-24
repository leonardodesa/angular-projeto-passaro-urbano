import { Oferta } from './shared/ofertas.module'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../app/app.api'
import { URL_API_COMO_USAR } from '../app/app.api'
import { URL_API_ONDE_FICA } from '../app/app.api'
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';


@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas/?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas/?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas/?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0])
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API_COMO_USAR}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }

    public getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API_ONDE_FICA}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas/?descricao_oferta_like=${termo}`)
            .pipe(map((resposta: any) => resposta), retry(10))
    }


}

