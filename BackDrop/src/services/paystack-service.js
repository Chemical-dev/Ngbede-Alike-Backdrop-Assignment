import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class PaystackService {
    static async getAccount(accountNumber, bankCode) {

        try {
            const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
            const paystackResponse = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${process.env.PAYSTACK_TOKEN}`,
                    'Content-Type': 'application/json',
                  }
            });
            
            if (paystackResponse.data.status === true) {
                return paystackResponse.data.data;
            } else {
                console.log('Account verification failed:', paystackResponse.data.message);
            }
        } catch (error) {
            console.log(error);
        }
       
    };
};
export default PaystackService;

