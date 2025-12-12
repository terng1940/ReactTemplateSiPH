import { fetchGetProvinceService } from 'api/products';
import { makeAutoObservable } from 'mobx';

export class GetProvinceApiStore {
    isLoading = false;
    isError = false;
    statusCode = null;
    data = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateIsLoading(value) {
        this.isLoading = value;
    }

    updateIsError(value) {
        this.isError = value;
    }

    updateStatusCode(code) {
        this.statusCode = code;
    }

    async handleGetProvinceService() {
        try {
            this.updateIsError(false);
            this.updateStatusCode(null);
            this.updateIsLoading(true);

            const result = await fetchGetProvinceService();

            if (result.error) {
                this.updateIsError(true);
                this.updateStatusCode(result.error.statusCode);
                return result;
            }

            this.data = result.response;
            return result;
        } catch (err) {
            this.updateIsError(true);
            return { error: { message: `Unexpected error: ${err.message}` } };
        } finally {
            this.updateIsLoading(false);
        }
    }
}
