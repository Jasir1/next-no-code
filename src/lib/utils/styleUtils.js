// Style utility functions

export const parseStyleValue = (value) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export const mergeStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

export const getResponsiveStyles = (component, breakpoint) => {
  const baseStyles = component.styles || {};
  const responsiveStyles = component.responsiveStyles?.[breakpoint] || {};
  return { ...baseStyles, ...responsiveStyles };
};

export const convertCSStoObject = (cssString) => {
  const styles = {};
  cssString.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase()
      );
      styles[camelCaseProperty] = value;
    }
  });
  return styles;
};

export const convertObjectToCSS = (styleObject) => {
  return Object.entries(styleObject)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${value}`;
    })
    .join('; ');
};

export const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getContrastColor = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};

export const generateBoxShadow = (x, y, blur, spread, color) => {
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

export const generateGradient = (type, colors) => {
  if (type === 'linear') {
    return `linear-gradient(${colors.angle || 90}deg, ${colors.stops.join(', ')})`;
  }
  if (type === 'radial') {
    return `radial-gradient(circle, ${colors.stops.join(', ')})`;
  }
  return 'none';
};

export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const getBreakpointWidth = (breakpoint) => {
  return breakpoints[breakpoint] || breakpoints.desktop;
};