import { scaleLinear } from 'd3-scale';

export default ({ range, rangeRound, domain, nice = false, clamp = false }) => {
  const scale = scaleLinear();
  scale.type = 'linear';

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice(isArray(nice) ? nice : null);
  if (clamp) scale.clamp(true);

  return scale;
};
