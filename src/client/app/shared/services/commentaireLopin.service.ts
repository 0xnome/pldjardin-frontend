
import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentaireLopin} from "./interfaces";

@Injectable()
export class CommentaireLopinService {
  constructor(private authHttp:AuthHttp) {
  }

}
