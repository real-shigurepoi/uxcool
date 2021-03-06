import { isFunction } from '@cloud-sn/v-utils';
import Icon from '../icon';
import { buildComponentName } from '../utils';

const regColor = /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/;
export default {
  name: buildComponentName('Tag'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-tag',
    },
    color: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    onBeforeClose: {
      type: Function,
      default: null,
    },
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return ['light'].indexOf(val) > -1;
      },
    },
  },
  data() {
    return {
      closed: false,
    };
  },
  computed: {
    isPresetColor() {
      const { color } = this;
      return regColor.test(color);
    },
    classes() {
      const {
        prefixCls, color, isPresetColor, theme
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${theme}`]: true,
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: !!(color && !isPresetColor),
      };
    },
    style() {
      const { color, isPresetColor } = this;
      return {
        backgroundColor: color && !isPresetColor ? color : null,
      };
    },
    closeIcon() {
      const { closable, onClose } = this;
      return closable ? <Icon type="close" on-click={onClose} /> : null;
    },
  },
  methods: {
    onAfterLeave() {
      this.$emit('after-close');
    },
    onClose(e) {
      const { $refs, onBeforeClose } = this;
      const { tagRef } = $refs;
      if (tagRef) {
        tagRef.style.width = `${tagRef.getBoundingClientRect().width}px`;
      }
      Promise.resolve(isFunction(onBeforeClose) ? onBeforeClose(e) : true).then((ret) => {
        if (ret === false) {
          return;
        }
        this.closed = true;
        this.$emit('close', e);
      });
    },
  },
  render() {
    const {
      prefixCls, classes, style, closeIcon, closed, onAfterLeave
    } = this;
    const element = closed ? null : (
      <div ref="tagRef" class={classes} style={style}>
        {this.$slots.default}
        {closeIcon}
      </div>
    );
    return (
      <transition name={`${prefixCls}-zoom`} on-after-leave={onAfterLeave}>
        {element}
      </transition>
    );
  },
};
