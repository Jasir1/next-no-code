// Export utilities for generating HTML/CSS

export const generateHTML = (components, options = {}) => {
  const { includeStyles = true, minify = false } = options;

  const componentToHTML = (comp, depth = 0) => {
    const indent = minify ? '' : '  '.repeat(depth);
    const styleString = comp.styles
      ? ` style="${generateInlineStyles(comp.styles)}"`
      : '';

    switch (comp.type) {
      case 'heading': {
        const tag = comp.tag || 'h2';
        return `${indent}<${tag}${styleString}>${comp.content || ''}</${tag}>`;
      }

      case 'text':
        return `${indent}<p${styleString}>${comp.content || ''}</p>`;

      case 'button':
        return `${indent}<button type="button"${styleString}>${
          comp.content || 'Button'
        }</button>`;

      case 'image':
        return `${indent}<img src="${comp.src || ''}" alt="${
          comp.alt || ''
        }"${styleString} />`;

      case 'container': {
        const childrenHTML = comp.children
          ? comp.children.map((child) => componentToHTML(child, depth + 1)).join('\n')
          : '';
        return `${indent}<div${styleString}>\n${childrenHTML}\n${indent}</div>`;
      }

      case 'section':
        const sectionChildren = comp.children
          ? comp.children.map((child) => componentToHTML(child, depth + 1)).join('\n')
          : '';
        return `${indent}<section${styleString}>\n${sectionChildren}\n${indent}</section>`;

      default:
        return '';
    }
  };

  const bodyContent = components
    .map((comp) => componentToHTML(comp, 2))
    .join('\n');

  const css = includeStyles ? generateCSS(components) : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Website built with WebBuilder">
  <title>My Website</title>
  ${css ? `<style>\n${css}\n  </style>` : ''}
</head>
<body>
${bodyContent}
</body>
</html>`;
};

export const generateInlineStyles = (styles) => {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
};

export const generateCSS = (components) => {
  let css = `    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }`;

  return css;
};

export const downloadHTML = (components, filename = 'website.html') => {
  const html = generateHTML(components);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateReactComponent = (components) => {
  const componentToJSX = (comp, depth = 0) => {
    const indent = '  '.repeat(depth);
    const styleObj = comp.styles
      ? `{${Object.entries(comp.styles)
          .map(([key, value]) => `${key}: '${value}'`)
          .join(', ')}}`
      : '{}';

    switch (comp.type) {
      case 'heading': {
        const tag = comp.tag || 'h2';
        return `${indent}<${tag} style={${styleObj}}>${comp.content || ''}</${tag}>`;
      }

      case 'text':
        return `${indent}<p style={${styleObj}}>${comp.content || ''}</p>`;

      case 'button':
        return `${indent}<button style={${styleObj}}>${
          comp.content || 'Button'
        }</button>`;

      case 'image':
        return `${indent}<img src="${comp.src || ''}" alt="${
          comp.alt || ''
        }" style={${styleObj}} />`;

      case 'container': {
        const children = comp.children
          ? comp.children.map((child) => componentToJSX(child, depth + 1)).join('\n')
          : '';
        return `${indent}<div style={${styleObj}}>\n${children}\n${indent}</div>`;
      }

      default:
        return '';
    }
  };

  const jsx = components.map((comp) => componentToJSX(comp, 2)).join('\n');

  return `export default function MyComponent() {
  return (
    <>
${jsx}
    </>
  );
}`;
};

export const downloadReactComponent = (components, filename = 'MyComponent.jsx') => {
  const code = generateReactComponent(components);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};