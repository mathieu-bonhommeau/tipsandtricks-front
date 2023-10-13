import axios from "axios";
import {ReactElement, useEffect} from "react";

type Props = {
    children: ReactElement
}

const instance = axios.create({
    baseURL: "http://localhost:5000/api"
})
function Interceptor(props: Props) {

    useEffect(() => {
        console.log('here1 !!!')
        const resInterceptor = (response: any) => {
            if (response.status === 401) {

            }
            return response;
        }

        const errInterceptor = (error: any) => {
            console.log('here3 !!!')
            return Promise.reject(error);
        }

        const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

        return () => instance.interceptors.response.eject(interceptor);

    }, [])

    return props.children;
}

export default Interceptor