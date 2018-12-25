import qs from "qs"
import { AsyncStorage } from "react-native"

export default {
    fetchGet() {},
    async fetchPost(url, params, header={'Content-Type': 'application/x-www-form-urlencoded'}) {
        //服务地址
        if(url.indexOf("/file/download")==0||url.indexOf("/file/upload")==0){
            url = global.constants.FILE_URL + url
        }else{
            url = global.constants.MSA_URL + url
        }

        //序列化
        if(!(params instanceof FormData)){
            params = qs.stringify({
                params: JSON.stringify(params)
            })
        }

        //TOKEN
        let token
        await AsyncStorage.getItem('adminToken',(err, result) => {
            token = result
            console.log('token',result)
        });
        if(token == null) token = '';
        url += "?TOKEN=" + token;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'post',
                headers: header,
                body: params
            })
                .then( res => res.json())
                .then( data => resolve(data))
                .catch( error => reject(error))
        })
    }
}