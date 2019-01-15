import { setNodeOriginExpand, removeNodeOriginExpand, getNodeOriginParent } from '../utils';

export default {
  methods: {
    filter(value) {
      const { treeStore: { nodesMap }, searchFilter } = this;
      const filterNodes = [];
      const keys = Object.keys(nodesMap);
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const node = nodesMap[keys[i]];
        if (value || value === 0) {
          const visible = searchFilter(value, { ...node.originNode });
          node.isVisible = visible;
          if (visible) {
            filterNodes.push(node);
            setNodeOriginExpand(node);
          } else {
            removeNodeOriginExpand(node);
          }
        } else {
          node.isVisible = true;
          removeNodeOriginExpand(node);
        }
      }

      // 显示父级
      for (let i = 0, l = filterNodes.length; i < l; i += 1) {
        const node = filterNodes[i];
        let np = node.parent;
        while (np) {
          np.isVisible = true;
          setNodeOriginExpand(np);
          np = np.parent;
        }
      }
      return filterNodes.map(node => ({
        ...node.originNode,
        pos: node.pos,
        parentNode: getNodeOriginParent(node),
      }));
    },
    isExistsKey(key) {
      const { treeStore: { nodesMap } } = this;
      return key in nodesMap;
    },
    getTreeNodesByKeys(keys = []) {
      const { getStoreNode } = this;
      return keys.map(key => getStoreNode(key)).filter(node => !!node);
    },
    getCheckedKeys() {
      return this.getStoreCheckedKeys();
    },

    getTreeOriginNodes() {
      return this.nodes.map(v => v.originNode);
    },
  },
};
