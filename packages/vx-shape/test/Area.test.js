import { Area } from '../src';

const fakeData = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 }
];

const AreaChildren = ({ children, ...restProps }) =>
  shallow(
    <Area data={fakeData} {...restProps}>
      {children}
    </Area>
  );

const xScale = val => 50;
const yScale = val => 50;
yScale.range = () => [100, 0];

const x = d => xScale(d.x);
const y = d => yScale(d.y);

describe('<Area />', () => {
  test('it should be defined', () => {
    expect(Area).toBeDefined();
  });

  test('it should have the .vx-area class', () => {
    const wrapper = shallow(<Area data={fakeData} x={x} y={y} />);
    expect(wrapper.find('path').prop('className')).toBe('vx-area');
  });

  test('it should expose its ref via an innerRef prop', done => {
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    mount(<Area data={fakeData} x={x} y={y} innerRef={refCallback} />);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should take an x number prop', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn, x: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
  });

  test('it should take an x fn prop', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn, x: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.x0()()).toBe(42);
    expect(args.path.x1()).toBe(null);
  });

  test('it should take an y number prop', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn, y: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y()()).toBe(42);
  });

  test('it should take an y fn prop', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn, y: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y()()).toBe(42);
    expect(args.path.y0()()).toBe(42);
    expect(args.path.y1()).toBe(null);
  });

  test('it should default defined prop to true', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(args.path.defined()()).toBe(true);
  });

  test('calling path with data returns a string', () => {
    const fn = jest.fn();
    const wrapper = AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(fakeData)).toBe('string');
  });
});
