
export const ErrorTypes = {
    ALREADY_EXISTS:"Account Already Exists",
    INVALID_CREDENTIALS:"Invalid Account Detail",
    UNABLE_TO_VALIDATE_ACCOUNT_NAME:"Account Name Mismatch",
    ACCOUNT_VALIDATION_UNSUCCESSFUL:"Could Not Validate Account"
}

export const toSentenceCase = (str) => {
    const words = str.toLowerCase().split(' ');
    
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    const sentence = words.join(' ');
    
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  
 export class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  