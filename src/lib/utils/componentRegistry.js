// lib/utils/componentRegistry.js
export const componentTypes = {
  TEXT: 'text',
  HEADING: 'heading',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
  SECTION: 'section',
  INPUT: 'input',
  FORM: 'form',
};

export const defaultComponents = [
  {
    type: componentTypes.HEADING,
    label: 'Heading',
    icon: 'Type',
    defaultProps: {
      content: 'Heading Text',
      tag: 'h2',
      styles: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#000000',
      }
    }
  },
  {
    type: componentTypes.TEXT,
    label: 'Text',
    icon: 'AlignLeft',
    defaultProps: {
      content: 'Your text here',
      styles: {
        fontSize: '16px',
        color: '#333333',
      }
    }
  },
  {
    type: componentTypes.BUTTON,
    label: 'Button',
    icon: 'Square',
    defaultProps: {
      content: 'Click Me',
      href: '#',
      styles: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
      }
    }
  },
  {
    type: componentTypes.IMAGE,
    label: 'Image',
    icon: 'Image',
    defaultProps: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Image',
      styles: {
        width: '100%',
        maxWidth: '400px',
      }
    }
  },
  {
    type: componentTypes.CONTAINER,
    label: 'Container',
    icon: 'Box',
    defaultProps: {
      styles: {
        padding: '20px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        minHeight: '100px',
      }
    }
  },
];