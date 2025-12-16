const ApiPaths = {
    login: '/api/v1/authorization/login',
    refreshToken: '/api/v1/authorization/refresh',
    verifyToken: '/api/v1/authorization/verify',

    getAllData: '/api/v1/mc/admit',
    getRoomDetail: '/api/v1/mc/admit-room-detail',
    updateDetail: '/api/v1/mc/update-admit-detail',
    addLicensePlate: '/api/v1/mc/add-license-plate',
    registerMC: '/api/v1/mc/register',
    registerAdmin: '/api/v1/authorization/register',
    getRoom: '/api/v1/mc/rooms',
    getProvince: '/api/v1/mc/provinces'
};
export default ApiPaths;
