import axios from 'axios';

class PaystackService {
    static async getAccounts(account_number, bank_code, auth) {
        try {
            const url = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;
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

//sk_test_43cfd2db44afe7f88a388ff2ca6c9c101143a14c