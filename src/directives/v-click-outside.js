export default {
  inserted(el, binding, vnode) {
    el.__mouseDown = (event) => {
      el._downContains = el.contains(event.target);
    };

    el.__mouseUp = (event) => {
      el.contains(event.target);

      if (!el._downContains && !el._upContains) {
        if (binding.value?.method) {
          binding.value.method();
        } else {
          vnode.context.$emit('input', false);
        }
      }
    };

    window.addEventListener('mousedown', el.__mouseDown);
    window.addEventListener('mouseup', el.__mouseUp);
  },

  unbind(el) {
    window.removeEventListener('mousedown', el.__mouseDown);
    window.removeEventListener('mouseup', el.__mouseUp);
  },
};
