import { withDesign } from 'storybook-addon-designs'
import MyButton from '~/components/Button.vue'

export default {
  title: 'scanner/buttons/Button',
  component: MyButton,
  decorators: [withDesign],
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/28tfBNjv3QH8FAWqglE1fU/DocumentScanner?node-id=65%3A1',
    },
  },
}

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @onClick="onClick" v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}
