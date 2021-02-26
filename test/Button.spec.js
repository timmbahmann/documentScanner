import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

let vm
let wrapper
beforeEach(() => {
  wrapper = mount(Button, {
    propsData: {
      label: 'Button',
    },
  })
  vm = wrapper.vm
})

describe('onClick', () => {
  it('emits click', () => {
    vm.$emit = jest.fn()
    vm.onClick()
    expect(vm.$emit).toHaveBeenCalledWith('click')
  })
})

describe('text', () => {
  it('should have correct text', () => {
    expect(wrapper.text()).toBe('Button')
  })
})
