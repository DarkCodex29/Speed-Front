export default {
  title: 'Atoms/hdc-autocomplete',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'El componente "hdc-autocomplete" es un componente que proporciona sugerencias automáticas al usuario mientras escribe en un campo de entrada. Utiliza una lista de elementos proporcionados a través de la propiedad "items" para ofrecer opciones relevantes. Esto agiliza y mejora la precisión de la entrada de datos al evitar tener que escribir todo manualmente. Además, puede tener funciones como filtrado en tiempo real y selección de elemento. En resumen, el "hdc-input-autocomplete" es un componente de autocompletado que facilita la introducción de datos al sugerir opciones basadas en una lista predefinida.',
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
      description: 'Propiedad "value" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'object',
      defaultValue: {
        name: 'John Doe',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        phone: '123456789',
      },
    },
    items: {
      description: 'Propiedad "items" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'array',
    },
    viewItems: {
      description: 'Propiedad "viewItems" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'number',
    },
    sliceItems: {
      description: 'Propiedad "sliceItems" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'number',
      defaultValue: 5,
    },
    valueKey: {
      description: 'Propiedad "valueKey" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'text',
      defaultValue: 'name',
    },
    valueLabel: {
      description: 'Propiedad "valueLabel" del autocompletado de input de hdc',
      table: {
        category: 'Props',
      },
      control: 'text',
      defaultValue: 'name',
    },
    onChangeValue: {
      actions: {
        handles: ['changeValue'],
      },
      table: {
        category: 'Eventos de salida',
      },
      description: 'Evento "changeValue" del autocompletado de input de hdc',
    },
    onSelectedValue: {
      actions: {
        handles: ['selectedValue'],
      },
      table: {
        category: 'Eventos de salida',
      },
      description: 'Evento "selectedValue" del autocompletado de input de hdc',
    },
  },
};

const Template = (data) => {
  const input = document.createElement('hdc-autocomplete');

  Object.assign(input, data);

  input.addEventListener('changeValue', data.onChangeValue);
  input.addEventListener('selectedValue', data.onSelectedValue);

  return input;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      name: 'John Doe',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    {
      name: 'Emily Flores Salas',
      lastname: 'Doe',
      email: 'emilydoe@example.com',
      phone: '987654321',
    },
    {
      name: 'Jacob Smith Rodriguez',
      lastname: 'Doe',
      email: 'jacobdoe@example.com',
      phone: '456789123',
    },
    {
      name: 'Jane Salas Gonzales',
      lastname: 'Smith',
      email: 'janesmith@example.com',
      phone: '987654321',
    },
    {
      name: 'Sophia Vergara Luna',
      lastname: 'Smith',
      email: 'sophiasmith@example.com',
      phone: '123456789',
    },
  ],
};
