
const updateUrl = "https://gitee.com/kikolove/imge-load-resource/raw/master/yourMusicStation/Json/update.json"

const getUpdateInfo = async function () {
    try {
        const response = await fetch(updateUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: 'no-referrer',
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
        return {}
    }
}

export { getUpdateInfo }