//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

// http://localhost:3000/reviews/5fc37549b1056f0624e29c5b/review-list  METHOD = GET
const url = '/reviews';
//cho params 1 default value là object
export const getProductReview = (productId) =>{
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${productId}/review-list`);
};

