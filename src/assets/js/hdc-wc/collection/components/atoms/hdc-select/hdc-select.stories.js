export default {
  title: 'Atoms/hdc-select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'El componente "hdc-select" es un componente que muestra un menu de opciones.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto de marcador de posición para la entrada de texto.',
      table: {
        category: 'Props',
      },
    },
    disable: {
      control: 'boolean',
      description: 'Indica si la entrada de texto está deshabilitada.',
      table: {
        category: 'Props',
      },
    },
    lock: {
      control: 'boolean',
      description: 'Indica si la entrada de texto está bloqueada.',
      table: {
        category: 'Props',
      },
    },
    value: {
      description: 'Propiedad "value" del componenet hdc-select',
      table: {
        category: 'Props',
      },
      control: 'object',
    },
    items: {
      description: 'Propiedad "items" proporciona el listado de opciones.',
      table: {
        category: 'Props',
      },
      control: 'array',
    },
    viewItems: {
      description: 'Propiedad "viewItems" del select',
      table: {
        category: 'Props',
      },
      control: 'number',
    },
    valueKey: {
      description: 'Propiedad "valueKey" del select HDC',
      table: {
        category: 'Props',
      },
      control: 'text',
      defaultValue: 'id',
    },
    valueLabel: {
      description: 'Propiedad "valueLabel" del select HDC',
      table: {
        category: 'Props',
      },
      control: 'text',
      defaultValue: 'name',
    },
    onSelectedValue: {
      actions: {
        handles: ['selectedValue'],
      },
      table: {
        category: 'Eventos de salida',
      },
      description: 'Evento "selectedValue" del select de HDC',
    },
  },
};

const Template = (data) => {
  const input = document.createElement('hdc-select');
  Object.assign(input, data);
  input.addEventListener('selectedValue', data.onSelectedValue);

  return input;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: '1',
      name: 'Argentina',
    },
    {
      id: '2',
      name: 'Perú',
    },
    {
      id: '3',
      name: 'Brazil',
    },
    {
      id: '4',
      name: 'Chile',
    },
    {
      id: '5',
      name: 'Bolivia',
    },
  ],
};
