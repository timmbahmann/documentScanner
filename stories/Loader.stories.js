import { withDesign } from 'storybook-addon-designs'
import Loader from '~/components/Loader.vue'

export default {
  title: 'scanner/icons/Loader',
  component: Loader,
  decorators: [withDesign],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'normal', 'alert', 'success', 'white'],
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/28tfBNjv3QH8FAWqglE1fU/DocumentScanner?node-id=0%3A298',
    },
  },
}

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loader },
  template: '<loader v-bind="$props" />',
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
}
