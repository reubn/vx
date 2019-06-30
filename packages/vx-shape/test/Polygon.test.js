import { Polygon, getPoint, getPoints } from '../src';

const PolygonWrapper = ({ ...restProps }) => shallow(<Polygon {...restProps} />);
const PolygonChildren = ({ children, ...restProps }) =>
  shallow(<Polygon {...restProps}>{children}</Polygon>);

describe('<Polygon />', () => {
  it('should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  it('should render an octagon', () => {
    const wrapper = PolygonWrapper({ sides: 8, size: 25 });
    const polygon = wrapper.find('polygon');
    const points = polygon.props().points.split(' ');
    expect(points).toHaveLength(8);
  });

  it('should add classname', () => {
    const wrapper = PolygonWrapper({ sides: 6, size: 25, className: 'a-polygon' });
    expect(wrapper.prop('className')).toBe('vx-polygon a-polygon');
  });

  it('should add onClick handler', () => {
    const fn = jest.fn();
    const wrapper = PolygonWrapper({
      sides: 6,
      size: 25,
      className: 'a-polygon',
      onClick: fn
    });
    wrapper.simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    const wrapper = PolygonChildren({ children: fn, sides: 8, size: 25 });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { points }', () => {
    const fn = jest.fn();
    const wrapper = PolygonChildren({ children: fn, sides: 8, size: 25 });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('points')).toEqual(true);
    expect(args.points.length).toEqual(8);
  });
});
