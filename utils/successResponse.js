class SuccessResponse {
    constructor(message = 'Success', data = {}) {
        this.status = true;
        this.message = message;
        this.data = data;
    }
}

module.exports = SuccessResponse;