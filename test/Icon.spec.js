import { mount } from '@vue/test-utils'
import Icon from '@/components/Icon.vue'

function testIcon(name) {
  it('should be a valid name', () => {
    const validator = Icon.props.name.validator
    expect(validator(name)).toBe(true)
  })
  const wrapper = mount(Icon, {
    propsData: {
      name,
    },
  })
  it('should have a path', () => {
    const path = wrapper.find('path').element.getAttribute('d')
    expect(path).toBeDefined()
  })
}

describe('icons', () => {
  const icons = Object.keys(Icon.data().icons)
  for (const iconName of icons) {
    describe(iconName, () => {
      testIcon(iconName)
    })
  }
  describe('size', () => {
    const wrapper = mount(Icon, {
      propsData: {
        name: 'abort',
      },
    })
    it('should mount', () => {
      expect(wrapper.exists()).toBe(true)
    })
    it('should change width', async () => {
      await wrapper.setProps({ width: 50 })
      expect(wrapper.attributes('width')).toEqual('50')
    })
    it('should change height', async () => {
      await wrapper.setProps({ height: 50 })
      expect(wrapper.attributes('width')).toEqual('50')
    })
  })
  describe('test invalid names', () => {
    const invalids = [
      '',
      '/',
      'dfrthjzkrujnbgdn mtfuzhöoinh euhtenbg“¶¢[]|¨',
      ';eval()"eval()',
    ]
    const validator = Icon.props.name.validator
    for (const invalid in invalids) {
      expect(validator(invalid)).toBe(false)
    }
  })
})
