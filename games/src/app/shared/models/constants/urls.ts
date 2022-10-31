const BASE_URL='http://localhost:3000'

export const PRODUCTS_URL =BASE_URL+ '/api/product/showAllProducts'
export const PRODUCT_BY_URL =BASE_URL+'/api/product/search/'
export const PRODUCTS_BY_ID_URL =BASE_URL+'/api/product/findproduct/'

export const USER_LOGIN_URL= BASE_URL+'/api/user/login'

export const USER_REGISTER_URL=BASE_URL+'/api/user/register'

export const CART_TO_USER=BASE_URL+'/api/cart/editCart/'

export const ORDERS_URL = BASE_URL + '/api/order';
export const ORDER_CREATE_URL = ORDERS_URL + '/creat';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';