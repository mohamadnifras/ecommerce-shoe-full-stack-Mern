export const endPoints = {
    AUTH: {
        REGISTER: "/user/register",
        LOGIN: "/user/login",
        ME: "/user/me",
        LOGOUT: "/user/logout",
        REFRESH_TOKEN: "/user/refresh-token",

    },
    PRODUCT: {
        GET_PRODUCTS: "/user/product",
        GET_INDIVIDUAL_PRODUCT: (id) => `/user/product/${id}`
    },
    CART: {
    ADD:(productId)=> `user/cart/${productId}`,
    GET_CART:"user/cart",
    REMOVE: (productId) => `user/cart/${productId}`,
    UPDATE_QUANTITY: (productId, action) => `user/cart/${productId}/${action}`
    },
    ORDER: {
        ORDER_CREATE: "/user/order/create",
        PAYMENT_VERIFY: "/user/verify-payment",
        GET_USER_ORDER: "/user/orders"
    },

    ADMIN: {
        USER: {
            GET_ALL_USER: "/admin/users",
            BLOCK_UNBLOCK: (id) => `/admin/users/${id}/block-unblock`
        },
        ORDERS: {
            GET_ALL_ORDER:"/admin/allOrders",
            GET_BYID_ORDER: (userId) => `/admin/order/${userId}`,
            GET_TOTAL_REVENUE :"/admin/revenue"
        },
        PRODUCT: {
            GET_PRODUCTS : "/admin/product",
            ADD_NEW_PRODUCT: "/admin/addProduct",
            EDIT_PRODUCT:(id)=>`/admin/editProduct/${id}`,
            DELECT_PRODUCT:(id)=>`admin/deletedProduct/${id}`
        }
    }
}