import { encrypt, decrypt } from "@/app/assets/encription";

export async function GET(id,token, endpoint){
    try{
        console.log("This is ID at API CALLLING : ",id)
        let url;
        if(id === undefined || id === null || id === ""){
            url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/${endpoint}`
        }else{
            id = encrypt(JSON.stringify(id))
            url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/${endpoint}/${id}`
        }
        console.log("THIS IS URL : ",url)
        let response = await fetch(url,{
            headers:{
                "api_key" : process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                "jwt_token" : token,
             },
             method : "GET",
        })
        if (response.status === 400 || response.status === 401) {
            console.log("Error Status:", response.status);
            const errorResponse = await response.json();
            console.log("Response Data:", errorResponse);
            return {
                status: response.status,
                data: errorResponse
            };
        }
        let responseText = await response.text();
        let decryptedText = decrypt(responseText);
        let responseJson = JSON.parse(decryptedText);
        console.log("That is Data in API: ", responseJson)
        return responseJson;
    }catch(error){
        console.log("Error : ",error)
        return {
            code: 0,
            data: {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url
            }
        }
    }
}

export async function POST(request,token, endpoint){
    try{
        let userData = encrypt(JSON.stringify(request))
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/${endpoint}`,{
            headers:{
                "api_key" : process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                "jwt_token" : token,
             },
             method : "POST",
             body : userData
        })
        if (response.status === 400 || response.status === 401) {
            console.log("Error Status:", response.status);
            const errorResponse = await response.json();
            console.log("Response Data:", errorResponse);
            return {
                status: response.status,
                data: errorResponse
            };
        }
        let responseText = await response.text();
        let decryptedText = decrypt(responseText);
        let responseJson = JSON.parse(decryptedText);
        return responseJson;
    }catch(error){
        console.log("Error : ",error)
        return {
            code: 0,
            data: {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url
            }
        }
    }
}

