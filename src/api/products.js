import axios from 'utils/axios';
import { CustomException } from 'exceptions/CustomException';
import ApiPaths from 'utils/constants/apiPath';

// ⬇️ this is the loader for the detail route
export async function loader() {
    try {
        const response = await axios.get('/api/products/list');
        return response.data.products;
    } catch (error) {
        return error;
    }
}

export async function filterProducts(filter) {
    return await axios.post('/api/products/filter', { filter });
}

export async function productLoader({ params }) {
    try {
        const response = await axios.post('/api/product/details', { id: params.id });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getRelatedProducts(id) {
    return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
    return await axios.get('/api/review/list');
}

export async function fetchLoginService(body) {
    try {
        const response = await axios.post(ApiPaths.login, body);

        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchRefreshTokenService(body) {
    try {
        const response = await axios.post(ApiPaths.refreshToken, body);

        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchVerifyTokenService(body) {
    try {
        const response = await axios.get(ApiPaths.verifyToken, body);

        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchGetAllDataService(body) {
    try {
        const response = await axios.get(ApiPaths.getAllData, { params: body });

        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchAdmitRoomDetailService(at_id) {
    try {
        const response = await axios.get(`${ApiPaths.getRoomDetail}/${at_id}`);
        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchUpdateDetailService(body) {
    try {
        const response = await axios.patch(ApiPaths.updateDetail, body);
        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchAddLicensePlateService(body) {
    try {
        const response = await axios.post(ApiPaths.addLicensePlate, body);
        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchRegisterService(body) {
    try {
        const response = await axios.post(ApiPaths.registerMC, body);

        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchGetRoomService() {
    try {
        const response = await axios.get(ApiPaths.getRoom);
        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}

export async function fetchGetProvinceService() {
    try {
        const response = await axios.get(ApiPaths.getProvince);
        return { response: response.data };
    } catch (err) {
        if (err.response) {
            const { data, status } = err.response;

            return {
                error: new CustomException(data?.message || 'Request failed', {
                    statusCode: status,
                    messageCode: data?.message_code
                })
            };
        }

        return {
            error: new CustomException('Unexpected error: ' + err.message)
        };
    }
}