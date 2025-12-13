export class RegisterDTO {
    constructor({ hn, roomNumber, roomMasterId, plates }) {
        this.hn = hn;
        this.roomNumber = roomNumber;
        this.roomMasterId = roomMasterId;
        this.plates = plates;
    }

    toJSON() {
        return {
            hn: this.hn,
            roomNumber: this.roomNumber,
            roomMasterId: this.roomMasterId,
            plates: this.plates
        };
    }
}
