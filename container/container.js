import {createElement, changeElementAttributes} from '../element/element.js'

export const createContainer = (obj) => {
    const element = createElement('div')
    changeElementAttributes(element, obj)
    return {
        'getElement': () => element,
        'display': (type) => element.style.display = type
    }
}

const state = []

export const find = (containerID) => state.find((element) => element.container.id === containerID)

export const append = (container, parent = document.body) => state.push({'container': container, 'parent': parent})

export const render = () => state.forEach((element) => element.parent.appendChild(element.container.getElement()) && Object.freeze(element.container)) && Object.freeze(state)