import PaystackService from '../services/paystack-service.js';
import levenshtein from 'levenshtein';
import Account from '../model/acccount.js';
import  AccountAlreadyExistsError from '../utils/util.js';
import throwCustomError, { ErrorTypes, } from '../utils/util.js';

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
                
                console.log("query output:", account);
                if (account) {
                    const accountObj1 = {
                        accountName:account.accountName,
                        accountNumber:account.accountNumber,
                        bankCode:account.bankCode,
                        verified:account.verified
                    };
                     
                    console.log("query output:", accountObj1);
                    return accountObj1;
                }else{
                    const result = await PaystackService.getAccounts(accountNumber, bankCode);
                    if (!result) return "error message";

                    const accountObj = {
                        accountName:result.account_name,
                        accountNumber:result.account_number,
                        bankCode:args.input.bankCode,
                        verified:true
                    };
                    return accountObj;
                }

            } catch (error) {
                console.log(error);
            }  
        },
    },

    Mutation: {
        validateAccount: async(_, args) => {
            const accountNumber = args.input.accountNumber;
            const bankCode =args.input.bankCode;

            try {
                // const accountCheck = await Account.findOne({
                //     where: {
                //      accountNumber
                //     },
                //     logging: false,
                // });

                //  if (accountCheck) {throwCustomError('Account Alredy exists', ErrorTypes.ALREADY_EXISTS);}

                const result = await PaystackService.getAccounts(accountNumber, bankCode);
                if(result == null || !result){return AccountAlreadyExistsError;}
                    const distance = levenshtein(args.input.accountName.toLowerCase(), result.account_name.toLowerCase());

                    if (distance > 3) {return AccountAlreadyExistsError;}
                        const accountObj = {
                            accountName:result.account_name,
                            accountNumber:result.account_number,
                            bankCode:args.input.bankCode,
                            verified:true
                        };
                    
                        const newAccount = await Account.create(accountObj);
                        newAccount.save();
                         console.log("new account:", newAccount);
                        if (!newAccount){return AccountAlreadyExistsError;}
                        return accountObj;
                
            } catch (error) {
                return AccountAlreadyExistsError;;
            }
        }
    }
};
export default resolvers;