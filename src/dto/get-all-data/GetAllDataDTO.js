export class GetAllDataDTO {
    constructor({ skip, take }) {
        this.skip = skip;
        this.take = take;
    }
    toJSON() {
        return {
            take: this.take,
            skip: this.skip
        };
    }
}
