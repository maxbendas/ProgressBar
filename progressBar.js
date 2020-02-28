'use strict';

class ProgressBar {
  constructor(option = {}) {
    const {
      start = 0,
      end = 100,
      bg = 'green',
      height = 20,
      textColor = 'white',
      border = '2px solid black',
      showText = true,
    } = option

    this.start = start;
    this.end = end;
    this.bg = bg;
    this.height = height;
    this.textColor = textColor;
    this.border = border;
    this.showText = showText;
  }

  init(selector) {
    document.querySelector(selector).append(this.createProgressBar());
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    const bar = this.createBar();
    progressBar.append(bar);
    progressBar.style.width = '100%';
    progressBar.style.border = this.border;
    this.animateBar(bar);
    return progressBar;
  }

  createBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      text-align: center;
      background-color: ${this.bg};
      height: ${this.height}px;
      line-height: ${this.height}px;
      color: ${this.textColor};
      `;

    this.stateProgress(bar);

    return bar;
  }

  stateProgress(elem) {
    elem.style.width = `${this.start}%`;
    elem.textContent = `${this.showText ? this.start+ '%': ''}`
  }

  animateBar(bar) {
    const animate = () => {
      if (this.start < this.end) {
        this.start++;
        this.stateProgress(bar);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
}


class RoundedProgressBar extends ProgressBar {
  constructor(option = {}){
    super(option)
    const {rounded= '30px'} = option;
    this.rounded = rounded;
  }

  createProgressBar() {
    const progressBar = super.createProgressBar();
    this.roundedBar(progressBar);
    return progressBar;
  }

  roundedBar(elem) {
    elem.style.borderRadius = this.rounded;
    elem.firstChild.style.borderRadius = this.rounded;

  }

}