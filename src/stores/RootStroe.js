import { AddLicensePlateApiStore } from './AddLicensePlateApiStore/AddLicensePlateApiStore';
import { AdmitRoomDetailApiStore } from './AdmitRoomDetailApiStore/AdmitRoomDetailApiStore';
import { GetAllDataApiStore } from './GetAllDataApiStore/GetAllDataApiStore';
import { GetProvinceApiStore } from './GetProvinceApiStore/GetProvinceApiStore';
import { GetRoomApiStore } from './GetRoomApiStore/GetRoomApiStore';
import { LoginApiStore } from './LoginApiStore/LoginApiStore';
import { RefreshTokenApiStore } from './RefreshTokenApiStore/RefreshTokenApiStore';
import { RegisterApiStore } from './RegisterApiStore/RegisterApiStore';
import { UpdateDetailApiStore } from './UpdateDetailApiStore/UpdateDetailApiStore';
import { VerifyTokenApiStore } from './VerifyTokenApiStore/VerifyTokenApiStore';

export const rootStore = {
    addLicensePlateApiStore: new AddLicensePlateApiStore(),
    admitRoomDetailApiStore: new AdmitRoomDetailApiStore(),
    getAllDataApiStore: new GetAllDataApiStore(),
    getProvinceApiStore: new GetProvinceApiStore(),
    getRoomApiStore: new GetRoomApiStore(),
    refreshTokenApiStore: new RefreshTokenApiStore(),
    loginApiStore: new LoginApiStore(),
    registerApiStore: new RegisterApiStore(),
    updateDetailApiStore: new UpdateDetailApiStore(),
    verifyTokenApiStore: new VerifyTokenApiStore()
};
