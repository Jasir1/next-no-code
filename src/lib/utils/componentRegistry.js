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
  VIDEO: 'video',
  NAVIGATION: 'navigation',
  FOOTER: 'footer',
  HERO: 'hero',
  CARD: 'card',
  LIST: 'list',
  DIVIDER: 'divider',
  ICON: 'icon',
  LINK: 'link',
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
        textAlign: 'left',
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
        lineHeight: '1.6',
        textAlign: 'left',
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
        textAlign: 'center',
        border: 'none',
        cursor: 'pointer',
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
        height: 'auto',
        borderRadius: '8px',
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
        display: 'flex',
        flexDirection: 'column',
      }
    }
  },
  {
    type: componentTypes.INPUT,
    label: 'Input Field',
    icon: 'Type',
    defaultProps: {
      placeholder: 'Enter text here',
      type: 'text',
      styles: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
      }
    }
  },
  {
    type: componentTypes.FORM,
    label: 'Form',
    icon: 'FileText',
    defaultProps: {
      styles: {
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        maxWidth: '500px',
      }
    }
  },
  {
    type: componentTypes.VIDEO,
    label: 'Video',
    icon: 'Video',
    defaultProps: {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      styles: {
        width: '100%',
        maxWidth: '640px',
        height: 'auto',
        borderRadius: '8px',
      }
    }
  },
  {
    type: componentTypes.NAVIGATION,
    label: 'Navigation',
    icon: 'Menu',
    defaultProps: {
      brand: 'My Website',
      links: ['Home', 'About', 'Services', 'Contact'],
      styles: {
        backgroundColor: '#ffffff',
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    }
  },
  {
    type: componentTypes.HERO,
    label: 'Hero Section',
    icon: 'Layout',
    defaultProps: {
      title: 'Welcome to Our Website',
      subtitle: 'Build amazing things with our platform',
      buttonText: 'Get Started',
      backgroundImage: 'https://via.placeholder.com/1200x600',
      styles: {
        backgroundColor: '#f8fafc',
        padding: '80px 24px',
        textAlign: 'center',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
  },
  {
    type: componentTypes.CARD,
    label: 'Card',
    icon: 'Square',
    defaultProps: {
      title: 'Card Title',
      content: 'Card content goes here',
      image: 'https://via.placeholder.com/300x200',
      styles: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '24px',
        maxWidth: '300px',
      }
    }
  },
  {
    type: componentTypes.LIST,
    label: 'List',
    icon: 'List',
    defaultProps: {
      items: ['Item 1', 'Item 2', 'Item 3'],
      type: 'unordered',
      styles: {
        padding: '16px',
        backgroundColor: '#ffffff',
      }
    }
  },
  {
    type: componentTypes.DIVIDER,
    label: 'Divider',
    icon: 'Minus',
    defaultProps: {
      styles: {
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '24px 0',
      }
    }
  },
  {
    type: componentTypes.ICON,
    label: 'Icon',
    icon: 'Star',
    defaultProps: {
      iconName: 'Star',
      size: '24',
      styles: {
        color: '#fbbf24',
        display: 'inline-block',
      }
    }
  },
  {
    type: componentTypes.LINK,
    label: 'Link',
    icon: 'Link',
    defaultProps: {
      content: 'Click here',
      href: '#',
      styles: {
        color: '#3b82f6',
        textDecoration: 'underline',
        fontSize: '16px',
      }
    }
  },
];