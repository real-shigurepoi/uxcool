<template>
  <div class="demo">
    <h6>selection on click row</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              :row-selection="rowSelection"
              :on-row="onRow" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@cloud-sn/uxcool';

  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text) {
          return <a>{text}</a>;
        },
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
      },
    ];
  }

  function getData() {
    return [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
    },
    data() {
      const that = this;
      return {
        columns: [],
        data: [],
        rowSelection: {
          selectedRowKeys: ['3'],
          onChange(selectedRowKeys, selectedRow, op, prevSelectRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys, selectedRow, op, prevSelectRowKeys);
            this.selectedRowKeys = selectedRowKeys;
          },
          getCheckboxProps(record) {
            return {
              disabled: record.name === 'Disabled User',
            };
          },
        },
        onRow(record) {
          return {
            on: {
              click() {
                const { rowSelection: { selectedRowKeys } } = that;
                const { key } = record;
                const idx = selectedRowKeys.indexOf(key);
                if (idx === -1) {
                  selectedRowKeys.push(key);
                } else {
                  selectedRowKeys.splice(idx, 1);
                }
              },
            },
          };
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
