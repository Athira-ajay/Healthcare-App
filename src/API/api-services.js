import api from "./axios-instance";

//api call should be call by component apiService
const apiService = async(httpMethod,url,resBody) => {
    const reqConfig = {
        method:httpMethod,
        url,
        data:resBody
    }

    try{
        const response = await api(reqConfig)
        return response
    }
    
    catch(err){
        throw(err)
    }

}

export default apiService