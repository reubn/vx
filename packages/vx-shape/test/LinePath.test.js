import { LinePath } from '../src';

const linePathProps = {
  data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
  x: d => d.x,
  y: d => d.y
};

const LinePathWrapper = ({ ...restProps }) => shallow(<LinePath {...restProps} />);
const LinePathChildren = ({ children, ...restProps }) =>
  shallow(<LinePath {...restProps}>{children}</LinePath>);

describe('<LinePath />', () => {
  test('it should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  test('it should have the .vx-linepath class', () => {
    expect(LinePathWrapper(linePathProps).prop('className')).toBe('vx-linepath');
  });

  test('it should contain paths', () => {
    expect(LinePathWrapper(linePathProps).find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    const wrapper = LinePathChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    const wrapper = LinePathChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    mount(<LinePath innerRef={refCallback} {...linePathProps} />);
  });
});
