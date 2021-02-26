import { withDesign } from 'storybook-addon-designs'
import MyIcon from '~/components/Icon.vue'

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyIcon },
  template: '<my-icon v-bind="$props" />',
})

export default {
  title: 'scanner/icons/Icons',
  component: MyIcon,
  decorators: [withDesign],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'normal', 'alert', 'success'],
      },
    },
    name: {
      control: {
        type: 'select',
        options: Object.keys(MyIcon.data().icons),
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/28tfBNjv3QH8FAWqglE1fU/DocumentScanner?node-id=151%3A1',
    },
  },
}

export const Abort = Template.bind({})
Abort.args = {
  name: 'abort',
}

export const Add = Template.bind({})
Add.args = {
  name: 'add',
}

export const Back = Template.bind({})
Back.args = {
  name: 'back',
}

export const CameraTrigger = Template.bind({})
CameraTrigger.args = {
  name: 'cameraTrigger',
}

export const Camera = Template.bind({})
Camera.args = {
  name: 'camera',
}

export const Check = Template.bind({})
Check.args = {
  name: 'check',
}

export const Edit = Template.bind({})
Edit.args = {
  name: 'edit',
}

export const Error = Template.bind({})
Error.args = {
  name: 'error',
  color: 'alert',
}

export const Grip = Template.bind({})
Grip.args = {
  name: 'grip',
}

export const Next = Template.bind({})
Next.args = {
  name: 'next',
}

export const Reload = Template.bind({})
Reload.args = {
  name: 'reload',
}

export const Rotate = Template.bind({})
Rotate.args = {
  name: 'rotate',
}

export const Settings = Template.bind({})
Settings.args = {
  name: 'settings',
}

export const Success = Template.bind({})
Success.args = {
  name: 'success',
  color: 'success',
}
