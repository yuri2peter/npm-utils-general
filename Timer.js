// 计时器，用于找出性能瓶颈
class Timer {
  constructor() {
    this.data = [];
  }

  tick() {
    const date = new Date();
    this.data.push(date);
    if (this.data.length < 2) return 0;
    const last = this.data[this.data.length - 2];
    const current = this.data[this.data.length - 1];
    return current - last;
  }

  /**
   * 返回总时长(ms)
   * @return {number}
   */
  get duration() {
    if (this.data.length < 2) return 0;
    const first = this.data[0];
    const last = this.data[this.data.length - 1];
    return last - first;
  }
}

module.exports = Timer;
