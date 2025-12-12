import { fetchAdmitRoomDetailService } from 'api/products';
import { makeAutoObservable } from 'mobx';

export class AdmitRoomDetailApiStore {
    isLoading = false;
    isError = false;
    statusCode = null;

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

    async handle(at_id) {
        try {
            this.updateIsError(false);
            this.updateStatusCode(null);
            this.updateIsLoading(true);

            const result = await fetchAdmitRoomDetailService(at_id);

            if (result.error) {
                this.updateIsError(true);
                this.updateStatusCode(result.error.statusCode);
                return result;
            }

            return result;
        } catch (e) {
            this.updateIsError(true);
            return { error: { message: `Unexpected error: ${e.message}` } };
        } finally {
            this.updateIsLoading(false);
        }
    }
}
