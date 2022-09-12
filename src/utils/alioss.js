var OSS = require('ali-oss');
export function client() {
    var client = new OSS({
        region: 'oss-cn-hangzhou',//填写Bucket所在地域
        accessKeyId: 'LTAI5t9xVpGPQgubsRKwCHWH',  //这自己keyId
        accessKeySecret: 'vcAk8oBmS6lzN2dbQFmNhZftCGIt1y', //这里写自己的key密码
        bucket: 'nbubbs-image' ,// 填写Bucket名称。
        secure:true,
    })  //后端提供数据
    return client
}
/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
    function rx() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return `${+new Date()}_${rx()}${rx()}`
}
