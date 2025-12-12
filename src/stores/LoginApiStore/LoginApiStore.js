import { fetchLoginService } from 'api/products';
import { makeAutoObservable } from 'mobx';

export class LoginApiStore {
    isLoading = false;
    isError = false;
    statusCode = null;

    constructor() {
        makeAutoObservable(this);
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

    async handleLoginService(body) {
        try {
            this.updateIsError(false);
            this.updateStatusCode(null);
            this.updateIsLoading(true);
            const result = await fetchLoginService(body);
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
