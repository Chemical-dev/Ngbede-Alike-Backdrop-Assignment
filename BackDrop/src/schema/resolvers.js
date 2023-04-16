import PaystackService from '../services/paystack-service.js';
import levenshtein from 'levenshtein';
import Account from '../model/acccount.js';
import  { toSentenceCase, CustomError, ErrorTypes } from '../utils/util.js';

const resolvers = {
    Query: {
        accountDetail: async(_, args) => {
            const accountNumber = args.input.accountNumber;
            const bankCode =args.input.bankCode;
    
            try {
                const account = await Account.findOne({
                    where: {
                        accountNumber
                       },
                       logging: false,
                });
                
                if (account) {
                    const accountObj1 = {
                        accountName:account.accountName,
                        accountNumber:account.accountNumber,
                        bankCode:account.bankCode,
                        verified:account.verified
                    };
                     
                    return accountObj1;
                }else{
                    const result = await PaystackService.getAccounts(accountNumber, bankCode);
                    if (!result) { return new CustomError(ErrorTypes.INVALID_CREDENTIALS, 400);}

                    const accountObj = {
                        accountName:result.account_name,
                        accountNumber:result.account_number,
                        bankCode:args.input.bankCode,
                        verified:true
                    };
                    return accountObj;
                }

            } catch (error) {
                throw new CustomError(error.message, 500);
            }  
        },
    },

    Mutation: {
        validateAccount: async(_, args) => {
            const accountNumber = args.input.accountNumber;
            const bankCode =args.input.bankCode;

            try {
                const accountCheck = await Account.findOne({
                    where: {
                     accountNumber
                    },
                    logging: false,
                });

                 if (accountCheck) {return new CustomError(ErrorTypes.ALREADY_EXISTS, 409);}

                const result = await PaystackService.getAccounts(accountNumber, bankCode);
                if(result == null || !result){return new CustomError(ErrorTypes.INVALID_CREDENTIALS, 400);}
                    const distance = levenshtein(args.input.accountName.toLowerCase(), result.account_name.toLowerCase());

                    if (distance > 3) {return new CustomError(ErrorTypes.UNABLE_TO_VALIDATE_ACCOUNT_NAME, 200);}
                        const accountObj = {
                            accountName: toSentenceCase(result.account_name),
                            accountNumber:result.account_number,
                            bankCode:args.input.bankCode,
                            verified:true
                        };
                    
                        const newAccount = await Account.create(accountObj);
                        newAccount.save();

                        if (!newAccount){return new CustomError(ErrorTypes.ACCOUNT_VALIDATION_UNSUCCESSFUL, 409);}
                        return accountObj;
                
            } catch (error) {
                throw new CustomError(error.message, 500);
            }
        }
    }
};
export default resolvers;