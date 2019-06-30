import { Bar } from '../src';

const BarWrapper = ({ ...restProps }) => shallow(<Bar {...restProps} />);

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .vx-bar class', () => {
    expect(
      BarWrapper({
        className: 'test'
      }).prop('className')
    ).toBe('vx-bar test');
  });

  test('it should expose its ref via an innerRef prop', done => {
    const node = document.createElement('div');
    const refCallback = n => {
      expect(n.tagName).toEqual('RECT');
      done();
    };
    mount(<Bar innerRef={refCallback} />);
  });
});
