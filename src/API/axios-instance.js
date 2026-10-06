import axios from "axios";

const api = axios.create({
  baseURL: "https://healthcare-server-ekoh.onrender.com"
//   baseURL: "http://localhost:3000"
});


// // any restrictions for our code or the normal flow of our project has happened it shoulg mention using interceptors
api.interceptors.response.use(
    (response) => {
        console.log("Message Received");
        return response
    },

    (error) => {
        if(error.response) {
            const status = error.response.status
            if(status==401){
                console.log("Unauthorized Access - Redirect to Login Page");
            }else if(status==404){
                console.log("API Not Found")
            }else if(status==500){
                console.log("Something went wrong...Try again later")
            }else if(error.request){
                console.log("No response from server")
            }else{
                console.log("Error" + error.message)
            }
            return Promise.reject(error)
        }
    }
)


export default api;