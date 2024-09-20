
const url = "https://gitee.com/kikolove/imge-load-resource/raw/master/yourMusicStation/Json/updateContent/now.json"

const getUpdateContent = async function () {
    try {
        const response = await fetch(url, {
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

export { getUpdateContent }