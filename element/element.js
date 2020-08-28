export const createElement = (type, obj) => document.createElement(type)

export const changeElementAttributes = (element, obj) => Object.entries(obj).forEach(([k, v]) => element.setAttribute(k, v))