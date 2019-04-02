export default (() => {
    const hasSessionStorage = window.sessionStorage ? true : false
    return {
        setItem(key, value) {
            if (hasSessionStorage) {
                window.sessionStorage.setItem(key, JSON.stringify(value))
                return true
            }
            return false
        },
        getItem(key) {
            if (hasSessionStorage) {
                return JSON.parse(window.sessionStorage.getItem(key))
            }
        },
        delItem(key) {
            if (hasSessionStorage) {
                window.sessionStorage.removeItem(key)
                return true
            }
            return false
        }
    }
})()
