export default class Timer {
    constructor() {
        this.time = ['00', '00', '00'];
        this.timerCount = 0;
        this.timerId;
        this.startTime;
    }

    init() {
        let curentTime,
            t, h, m, s,
            zeroPattern = '00';

        curentTime = new Date().getTime();

        t = curentTime - this.startTime;
        h = Math.floor(t/1000/3600);
        m = Math.floor(t/1000/60 - h*60);
        s = Math.floor(t/1000 - h*3600 - m*60);

        this.time[0] = (zeroPattern + h).slice(-2);
        this.time[1] = (zeroPattern + m).slice(-2);
        this.time[2] = (zeroPattern + s).slice(-2);

        timerDiv.innerHTML = this.time.join(':');
    }

    startTimer() {
        this.stopTimer();
        this.timerCount = 0;
        this.time = ['00', '00', '00'];
        this.startTime = new Date().getTime();
        this.timerId = setInterval(() => this.init(), 1000);
    }

    stopTimer() {
        clearInterval(this.timerId);
    }

}