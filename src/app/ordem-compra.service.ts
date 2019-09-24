import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Pedido } from './shared/pedido.model'
import { Observable } from 'rxjs';
import { URL_API } from './app.api'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class OrdemCompraService {

    constructor(private http: HttpClient) { }

    public efetivarCompra(pedido: Pedido): Observable<any> {
        return this.http.post(`${URL_API}/pedidos`, pedido).pipe(
            map((resposta: any) => resposta)
          )
    }

}
