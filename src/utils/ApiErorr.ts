export class ApiError extends Error {
    constructor(
        public statusCode : number,
        public message : string = "Something went wrong",
   ){
    super(message)
    this.statusCode = statusCode;
    this.message = message;
   }
}

