class errorResponse {
    constructor(message = 'Error', data = {}) {
        this.status = false;
        this.message = message;
        this.data = data;
    }
}

module.exports = errorResponse;