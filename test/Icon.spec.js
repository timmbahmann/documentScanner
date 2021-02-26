import { mount } from '@vue/test-utils'
import Icon from '@/components/Icon.vue'

function testIcon(name) {
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
  const icons = [
    'abort',
    'camera',
    'back',
    'add',
    'cameraTrigger',
    'check',
    'edit',
    'error',
    'grip',
    'next',
    'reload',
    'rotate',
    'settings',
    'success',
  ]
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
})
