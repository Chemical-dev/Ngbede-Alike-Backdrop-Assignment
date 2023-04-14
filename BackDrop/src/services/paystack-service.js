import axios from 'axios';

class PaystackService {
    static async getAccounts() {
        try {
            const url = "https://api.paystack.co/bank/resolve?account_number=0044049083&bank_code=044";
            const paystackResponse = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer sk_test_43cfd2db44afe7f88a388ff2ca6c9c101143a14c`,
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