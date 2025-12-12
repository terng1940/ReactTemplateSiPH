import { AdmitRoomDetailApiStore } from './AdmitRoomDetailApiStore/AdmitRoomDetailApiStore';
import { GetAllDataApiStore } from './GetAllDataApiStore/GetAllDataApiStore';
import { GetProvinceApiStore } from './GetProvinceApiStore/GetProvinceApiStore';
import { LoginApiStore } from './LoginApiStore/LoginApiStore';
import { RefreshTokenApiStore } from './RefreshTokenApiStore/RefreshTokenApiStore';
import { RegisterApiStore } from './RegisterApiStore/RegisterApiStore';
import { VerifyTokenApiStore } from './VerifyTokenApiStore/VerifyTokenApiStore';

export const rootStore = {
    admitRoomDetailApiStore: new AdmitRoomDetailApiStore(),
    getAllDataApiStore: new GetAllDataApiStore(),
    getProvinceApiStore: new GetProvinceApiStore(),
    refreshTokenApiStore: new RefreshTokenApiStore(),
    verifyTokenApiStore: new VerifyTokenApiStore(),
    loginApiStore: new LoginApiStore(),
    registerApiStore: new RegisterApiStore()
};
