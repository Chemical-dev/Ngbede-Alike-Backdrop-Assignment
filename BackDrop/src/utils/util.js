import { GraphQLError } from "graphql";

class CustomError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
}

const AccountAlreadyExistsError = {
    message:"Account Already Validated"
}

export const ErrorTypes = {
    ALREADY_EXISTS:{
        errorCode:"",
        errorStatus:203,
    }
}

export default (errorMessage, errorType) =>{
    throw new GraphQLError(errorMessage, {
        extensions: {
            code:errorType.errorCode,
            http:{
                status:errorType.statusError
            },
        },
    });
};