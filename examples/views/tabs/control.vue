<template>
  <div class="demo">
    <h6>control</h6>
    <ux-tabs v-model="value"
             control
             @tab-click="onTabClick">
      <ux-tab-pane tab="Tab 1"
                   name="1">
        Tab 1 Content
      </ux-tab-pane>
      <ux-tab-pane tab="Tab 2"
                   name="2">
        Tab 2 Content
      </ux-tab-pane>
      <ux-tab-pane tab="Tab 3"
                   name="3">
        Tab 3 Content
      </ux-tab-pane>
    </ux-tabs>
  </div>
</template>

<script>
  import { Tabs } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTabs: Tabs,
      UxTabPane: Tabs.TabPane,
    },
    data() {
      return {
        value: '2',
      };
    },
    created() {
      setTimeout(() => {
        this.value = '1';
      }, 2500);
    },
    methods: {
      onTabClick(name, ...args) {
        console.log(name, ...args);
        if (name === '2') {
          return;
        }
        this.value = name;
      },
    },
  };
</script>
