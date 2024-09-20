/**
 * 在 canvas 中绘制音频文件的频谱图。
 *
 * @param {string} audioUrl - 音频文件的 URL。
 * @param {HTMLCanvasElement} canvas - 用于绘制频谱图的 canvas 元素。
 *
 * @returns {Promise<Object>} 返回一个 Promise，解析为一个对象，该对象具有 `stop()` 方法，调用该方法可以停止播放并清除画布。
 */
const drawSpectrum = async (audioUrl, canvas) => {
    // 创建 AudioContext 实例，并获取源节点和分析器节点的引用。
    const ctx = canvas.getContext('2d');
    const audioCtx = new AudioContext();
    let sourceNode, analyserNode;

    try {
        // 获取音频文件并将其解码为 AudioBuffer。
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        // 设置源节点和分析器节点。
        sourceNode = audioCtx.createBufferSource();
        sourceNode.buffer = audioBuffer;
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 2048;
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const barWidth = (canvasWidth / analyserNode.frequencyBinCount) * 2.5;
        let barHeight;
        let x = 0;

        // 定义 draw 函数，该函数将被重复调用以更新频谱图。
        const draw = () => {
            requestAnimationFrame(draw);
            const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(dataArray);

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height / 2;
            const barWidth = canvasWidth / analyserNode.frequencyBinCount;
            const barSpacing = 2;

            // 清空画布并重置 x 坐标。
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            let x = 0;

            // 绘制频谱图。
            for (let i = 0; i < analyserNode.frequencyBinCount; i++) {
                const barHeight = dataArray[i] * (canvasHeight / 256);
                const hue = i / analyserNode.frequencyBinCount * 360;
                ctx.fillStyle = `hsl(197, 9.12%, 85.69%)`;
                ctx.fillRect(x, canvasHeight - barHeight, barWidth - barSpacing, barHeight);

                x += barWidth;
            }
        };

        // 开始播放音频并绘制频谱图。
        // 创建 GainNode 实例并将其连接到 destination。
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);

        // 将 sourceNode 连接到 gainNode。
        sourceNode.connect(gainNode);

        sourceNode.start();
        // 静音 sourceNode。
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime+1);
        draw();

        // 返回一个对象，其中包含 `stop()` 方法，调用该方法可以停止播放并清除画布。
        return {
            stop: () => {
                sourceNode.stop();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            },
        };
    } catch (err) {
        console.error(err);
    }
};

// 将 `drawSpectrum` 函数作为默认导出导出此模块。
export { drawSpectrum };