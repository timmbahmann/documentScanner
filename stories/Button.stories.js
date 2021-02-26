import { withDesign } from 'storybook-addon-designs'
import MyButton from '~/components/Button.vue'

export default {
  title: 'scanner/buttons/Button',
  component: MyButton,
  decorators: [withDesign],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'normal', 'alert'],
      },
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
  template: '<my-button @onClick="click" v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  label: 'Bestätigen',
}

export const Alert = Template.bind({})
Alert.args = {
  type: 'alert',
  label: 'Abbrechen',
}

export const Normal = Template.bind({})
Normal.args = {
  type: 'normal',
  label: 'Ok',
}
