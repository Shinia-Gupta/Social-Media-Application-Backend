export class ApplicationError extends Error{

    constructor(statusCode,errMsg){
        super(errMsg);
        this.statusCode=statusCode;
    }

}