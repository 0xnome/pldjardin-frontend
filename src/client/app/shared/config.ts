
export class Config{
    
    static getApiUrl(url:string){
        if(url.indexOf(Config.api) ===  -1){ //
            return Config.api + url
        }
        return url
    }

    static api = "http://localhost:8000"
}