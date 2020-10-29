import {
  onReady,
  qs,
  qsa,
  qso,
} from './util.js';

onReady(() => setTimeout(() => {
  debugger;
  qsa('.m-scorecard__total').forEach(a => a.parentNode.removeChild(a));
  const weights = [1, 0.75, 0.5, 0.25, 0, -0.5];
  const container = qs('.m-scorecard');
  const cards = Array.from(container.children);
  const template = cards[0].cloneNode(true);
  const scores = cards.map(card =>
    parseInt(qs('.m-scorecard__checks', card).textContent.replace(/ checks/ig, ''))
  );
  const totalChecks = scores.reduce((sum, score) => sum + score);
  const truthiness = scores.reduce((sum, score, index) => (
   sum + score * weights[index]
  ), 0) / totalChecks;
  const truthinessPct = (truthiness * 100).toFixed(0);
  const truth = qso({
    title: '.m-scorecard__title',
    bar: '.m-scorecard__bar',
    checks: '.m-scorecard__checks',
    value: '.m-scorecard__value>span'
  }, template);
  truth.title.innerHTML = 'Honesty';
  truth.bar.setAttribute('data-scorecard-bar', truthinessPct);
  truth.bar.style.height = `${truthinessPct}%`;
  truth.checks.innerHTML = `${totalChecks} Checks`;
  truth.value.innerHTML = truthinessPct;
  template.classList.add('.m-scorecard__total');
  template.removeAttribute('data-scorecard-item');
  container.appendChild(template);
}, 125));
