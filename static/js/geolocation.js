module.exports = function (showPosition, showError) {
    function posCallback(position) {
        showPosition({
            latitude: position.coords.latitude, longitude: position.coords.longitude
        });
    }

    function errCallBack(error) {
        let errorMsg = '定位失败,定位系统失效'
        if (error.code) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = "定位失败,用户拒绝请求地理定位"
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = "定位失败,位置信息是不可用"
                    break;
                case error.TIMEOUT:
                    errorMsg = "定位失败,请求获取用户位置超时"
                    break;
                case error.UNKNOWN_ERROR:
                    errorMsg = "定位失败,定位系统失效"
                    break;
            }
        } else {
            errorMsg = error
        }
        showError(errorMsg)
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posCallback, errCallBack, { timeout: 5000 });
    } else {
        errCallBack("浏览器不支持地理定位");
    }
}
