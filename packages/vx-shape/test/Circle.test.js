import { Circle } from '../src';

const CircleWrapper = ({ ...restProps }) => shallow(<Circle {...restProps} />);

describe('<Circle />', () => {
  test('it should be defined', () => {
    expect(Circle).toBeDefined();
  });

  test('it should have the .vx-circle class', () => {
    expect(
      CircleWrapper({
        className: 'test'
      }).prop('className')
    ).toBe('vx-circle test');
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('CIRCLE');
      done();
    };
    mount(<Circle innerRef={refCallback} />);
  });
});
