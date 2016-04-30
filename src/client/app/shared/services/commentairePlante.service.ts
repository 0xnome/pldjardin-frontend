import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentairePlante} from "./interfaces";

@Injectable()
export class CommentairePlanteService {
  constructor(private authHttp:AuthHttp) {
  }

  private _commentaireUrl = Config.api + '/commentaireplantes/';

}
