    // 测试地址
    let MSU_URl ='http://192.168.11.206:8081/midservice/api'; // 前台地址
    let MSA_URL ='http://192.168.11.206:8082/midservice/api'; // 后台地址
    let FILE_URL = 'http://192.168.11.207:8093/fileservice/api'; // 图片请求地址
    let CAPTCHAIMAGE = MSU_URl + '/sc/captcha/image'; // 前台获取验证码地址
    let ADMINCAPTCHAIMAGE = MSA_URL + '/sc/captcha/image'; // 后台获取验证码地址
    let FILE_IMGSRC = FILE_URL + '/file/download?path=';//图片获取地址
    let UE_IMGSRC = FILE_URL + '/file/download';//富文本框图片获取基本路径
    let UEBASEURL = 'baseUrl';//富文本框图片存储基本路径

    global.constants = {
        MSU_URl,
        MSA_URL,
        FILE_URL,
        CAPTCHAIMAGE,
        ADMINCAPTCHAIMAGE,
        FILE_IMGSRC,
        UE_IMGSRC,
        UEBASEURL
    }