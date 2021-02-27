import { mount } from '@vue/test-utils'
import Loading from '@/components/Loader.vue'

describe('Loading', () => {
  const wrapper = mount(Loading)
  it('should mount', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should have animation', () => {
    expect(wrapper.element.style.animation).toEqual(
      expect.stringMatching(/^spin [0-9]+.?[0-9]*s linear infinite$/)
    )
  })
  it('should validate all correct colors', () => {
    const allowedColors = ['primary', 'normal', 'alert', 'success', 'white']
    const validator = Loading.props.color.validator
    for (const allowedColor of allowedColors) {
      expect(validator(allowedColor)).toBe(true)
    }
  })
  it('should validate all correct colors', () => {
    const disallowedColors = ['kk590pvz5', '', 5443, -1, expect]
    const validator = Loading.props.color.validator
    for (const allowedColor of disallowedColors) {
      expect(validator(allowedColor)).toBe(false)
    }
  })
  it('should have speed', () => {
    expect(wrapper.props().speed).toBeDefined()
  })
  it('should say speed is a number', () => {
    expect(typeof wrapper.props().speed).toBe('number')
  })
  it('should have size', () => {
    expect(wrapper.props().size).toBeDefined()
  })
  it('should say size is a number', () => {
    expect(typeof wrapper.props().size).toBe('number')
  })
  it('should say color is a string', () => {
    expect(typeof wrapper.props().color).toBe('string')
  })
  it('should change speed', async () => {
    await wrapper.setProps({ speed: 20 })
    let speed = wrapper
      .attributes('style')
      .match(/animation: \w* ?([0-9.]+)s/)[1]
    expect(speed).toEqual('20')
    await wrapper.setProps({ speed: 50 })
    speed = wrapper.attributes('style').match(/animation: \w* ?([0-9.]+)s/)[1]
    expect(speed).toEqual('50')
  })
})
