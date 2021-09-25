import { BASE_API_URL } from '../common/Constants';
import axios from 'axios';
import { authHeader, handleResponseWithLoginCheck } from './base.service';


const API_URL = BASE_API_URL + '/api/purchase';

class PurchaseService {

    savePurchase(purchase) {
        const req = axios.post(API_URL, purchase, {headers: authHeader()});

        return handleResponseWithLoginCheck(req);
    }

    getAllPurchaseItems() {
        const req = axios.get(API_URL, {headers: authHeader()});

        return handleResponseWithLoginCheck(req);
    }

}

export default new PurchaseService();
