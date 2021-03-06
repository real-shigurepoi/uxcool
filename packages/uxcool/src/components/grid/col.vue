<template>
  <div :class="clazz"
       :style="style">
    <slot />
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  const name = buildComponentName('Col');
  const prefixCls = 'ux-col';

  export default {
    inject: {
      rowRoot: {
        default: false,
      },
    },
    name,
    props: {
      span: {
        type: Number,
        default: 0,
      },
      order: {
        type: Number,
        default: 0,
      },
      offset: {
        type: Number,
        default: 0,
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object],
      xxl: [Number, Object],
    },
    computed: {
      isChildren() {
        return !!this.rowRoot;
      },
      gutter() {
        const { isChildren, rowRoot } = this;
        return isChildren ? rowRoot.gutter : 0;
      },
      clazz() {
        const classList = [
          {
            [`${prefixCls}-${this.span}`]: this.span,
            [`${prefixCls}-order-${this.order}`]: this.order,
            [`${prefixCls}-offset-${this.offset}`]: this.offset,
          },
        ];

        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
          if (typeof this[size] === 'number') {
            classList.push(`${prefixCls}-${size}-${this[size]}`);
          } else if (typeof this[size] === 'object') {
            const props = this[size];

            Object.keys(props).forEach((prop) => {
              classList.push(prop === 'span'
                ? `${prefixCls}-${size}-${props[prop]}`
                : `${prefixCls}-${size}-${prop}-${props[prop]}`);
            });
          }
        });

        return classList;
      },
      style() {
        let style = null;

        if (this.gutter) {
          style = {
            paddingLeft: `${this.gutter / 2}px`,
            paddingRight: `${this.gutter / 2}px`,
          };
        }

        return style;
      },
    },
  };
</script>

