export function fetchSuccess(input:string){
    return `${input} fetched successfully`
}

export function registerSuccess(input:string){
    return `${input} registered successfully`
}

export function invalidMongoId(input:string){
    return `Please provide valid ${input} id`
}

export function notFound(input:string){
    return `${input} not found`
}

export function updateSuccess(input:string){
    return `${input} updated successfully`
}

export function deleteSuccess(input:string){
    return `${input} deleted successfully`
}

export function fetchError(input:string){
    return `error while getting the ${input}!`
}

export function registerError(input:string){
    return `error while registering the ${input}!`
}

export function deleteError(input:string){
    return `error while deleting the ${input}!`
}

export function updateError(input:string){
    return `error while updating the ${input}!`
}


export const orderPlaceSuccess = "order placed successfully"
export const orderPlaceError = "Error while placing the order!"
export const orderCancelSuccess = "order cancelled successfully"
export const orderCancelError = "Error while cancelling the order!"
export const invalidPassword = "password not valid please enter valid password"
export const loginSuccess = "user login successfull"
export const loginError = "Error while logging in!"
export const urlNotProvided = "Please provide mongo url in .env file!"
export const databaseSuccess= "database connection established"
export const databaseError= "Error while database connection !"
export const serverSuccess = "server is running on port"
export const unauthorized ="unauthorized access!"
export const authenticationError = "Error while authentication"
export const usersAllowed = "only users are allowed !"
export const sellersAllowed = "only sellers are allowed !"
export const adminsAllowed = "only admins are allowed !"
export const adminsOrSellersAllowed = "only admins or sellers are allowed !"

