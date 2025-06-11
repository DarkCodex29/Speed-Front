export default {
  title: 'Atoms/hdc-multiselect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'El componente "hdc-multiselect" es un componente que permite seleccionar varias opciones. Utiliza una lista de elementos proporcionados a través de la propiedad "items".',
      },
    },
  },
  argTypes: {
    disable: {
      control: 'boolean',
      description: 'Indica si el elemento esta deshabilitado.',
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
      description: 'Propiedad "value" del multiselect',
      table: {
        category: 'Props',
      },
      control: 'text',
    },
    items: {
      description: 'Propiedad "items" del multiselect',
      table: {
        category: 'Props',
      },
      control: 'array',
    },
    viewItems: {
      description: 'Propiedad "viewItems" del multiselect',
      table: {
        category: 'Props',
      },
      control: 'number',
    },
    valueKey: {
      description: 'Propiedad "valueKey" del multiselect',
      table: {
        category: 'Props',
      },
      control: { type: 'text', defaultValue: 'id' },
      defaultValue: 'id',
    },
    valueLabel: {
      description: 'Propiedad "valueLabel" del multiselect',
      table: {
        category: 'Props',
      },
      control: { type: 'text' },
      default: 'name',
    },
    selectedValue: {
      actions: {
        handles: ['selectedValue'],
      },
      table: {
        category: 'Eventos de salida',
      },
      description: 'Evento "selectedValue" del multiselect',
    },
  },
};

const Template = (data) => {
  const input = document.createElement('hdc-multiselect');

  Object.assign(input, data);

  input.addEventListener('selectedValue', data.onSelectedValue);

  return input;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      name: 'John Doe Ramos',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    {
      name: 'Emily Doe Ramos',
      lastname: 'Doe',
      email: 'emilydoe@example.com',
      phone: '987654321',
    },
    {
      name: 'Jacob Doe Ramos',
      lastname: 'Doe',
      email: 'jacobdoe@example.com',
      phone: '456789123',
    },
    {
      name: 'Jane Smith Doe',
      lastname: 'Smith',
      email: 'janesmith@example.com',
      phone: '987654321',
    },
    {
      name: 'Sophia Smith Salas',
      lastname: 'Smith',
      email: 'sophiasmith@example.com',
      phone: '123456789',
    },
  ],
};
