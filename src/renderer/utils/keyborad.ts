import { message } from "ant-design-vue";

const hotKey = () => {
    document.addEventListener("keydown", function (e) {
        message.info("当前按键的keyCode为：" + e.keyCode)
    })
}

export default hotKey