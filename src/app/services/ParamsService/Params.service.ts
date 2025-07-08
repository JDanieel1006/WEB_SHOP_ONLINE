import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

    constructor() { }

    removeNullValuesFromQueryParams(params: any) {
        let httpParams = new HttpParams({ fromObject: params  });
        const paramsKeysAux = httpParams.keys();

        paramsKeysAux.forEach((key) => {
            const value = httpParams.get(key);
            if (value === "null" || value === "undefined" || value === '') {
                httpParams['map'].delete(key);
            }
        });

        return httpParams;
    }

}
