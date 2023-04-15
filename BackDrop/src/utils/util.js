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

export const toSentenceCase = (str) => {
    // Convert the string to lowercase and split by word
    const words = str.toLowerCase().split(' ');
    
    // Loop through each word and capitalize the first letter
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    
    // Join the words back into a sentence
    const sentence = words.join(' ');
    
    // Capitalize the first letter of the sentence
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  