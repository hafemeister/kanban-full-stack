export enum ServerResponseCodes {
    Success = 200,
    Error = 500,
    BadRequest = 400,
    ResourceNotFound = 404,
    MethodNotAllowed = 405,
}

export enum SupportedMethods {
    Get = "GET",
    Put = "PUT",
    Post = "POST",
    Delete = "DELETE",
}
