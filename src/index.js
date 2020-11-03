import {
  onReady,
  qs,
  qsa,
  qso,
} from './util.js';

onReady(() => setTimeout(() => {
  qsa('.m-scorecard__total').forEach((a) => a.parentNode.removeChild(a));
  const weights = [1, 0.75, 0.5, 0.25, 0, -0.5];
  const container = qs('.m-scorecard');
  const cards = Array.from(container.children);
  const template = cards[0].cloneNode(true);
  const scores = cards.map((card) => (
    parseInt(qs('.m-scorecard__checks', card).textContent.replace(/ checks/ig, ''), 10)
  ));
  const totalChecks = scores.reduce((sum, score) => sum + score, 0);
  cards.forEach((card, i) => {
    const value = qs('.m-scorecard__value>span', card);
    const pct = (100 * scores[i]) / totalChecks;
    value.parentNode.setAttribute('title', `${pct.toFixed(3)}%`);
  });
  const trueChecks = scores.reduce((sum, score, index) => (
    sum + score * weights[index]
  ), 0);
  const truthinessPct = ((100 * trueChecks) / totalChecks).toFixed(0);
  const truth = qso({
    title: '.m-scorecard__title',
    bar: '.m-scorecard__bar',
    checks: '.m-scorecard__checks',
    value: '.m-scorecard__value>span',
  }, template);
  truth.title.innerHTML = 'Honesty';
  truth.bar.setAttribute('data-scorecard-bar', truthinessPct);
  truth.bar.style.height = `${truthinessPct}%`;
  truth.checks.innerHTML = `${trueChecks} Truth<br />${totalChecks} Checks`;
  truth.value.innerHTML = truthinessPct;
  truth.value.parentNode.setAttribute('title', `${((100 * trueChecks) / totalChecks).toFixed(3)}%`);
  template.classList.add('.m-scorecard__total');
  template.removeAttribute('data-scorecard-item');
  container.appendChild(template);
}, 125));
