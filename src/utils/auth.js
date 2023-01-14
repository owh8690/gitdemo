export function setData(token){
    sessionStorage.setItem("token",token)
}

export function clearData(){
    sessionStorage.clear()
}

export function getData(){
    return sessionStorage.getItem("token")
}