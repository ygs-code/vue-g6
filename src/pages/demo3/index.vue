<template>
  <div ref="hello"></div>
</template>

<script>
import G6 from "@antv/g6";
import insertCss from "insert-css";
import { findTreeData, findTreePath } from "@/utils";

export default {
  name: "HelloWorld",
  data() {
    return {
      treeData: [
        {
          id: "0",
          label: "0",
          children: [
            {
              id: "0-0",
              label: "0-0",
              children: [
                {
                  id: "0-0-0",
                  label: "0-0-0"
                },
                {
                  id: "0-0-1",
                  label: "0-0-1"
                },
                {
                  id: "0-0-2",
                  label: "0-0-2"
                },
                {
                  id: "0-0-3",
                  label: "0-0-3"
                },
                {
                  id: "0-0-4",
                  label: "0-0-4"
                },
                {
                  id: "0-0-5",
                  label: "0-0-5"
                }
              ]
            },
            {
              id: "0-1",
              label: "0-1",
              children: [
                {
                  id: "0-1-0",
                  label: "0-1-0"
                },
                {
                  id: "0-1-1",
                  label: "0-1-1"
                },
                {
                  id: "0-1-2",
                  label: "0-1-2"
                },
                {
                  id: "0-1-3",
                  label: "0-1-3"
                },
                {
                  id: "0-1-4",
                  label: "0-1-4"
                },
                {
                  id: "0-1-5",
                  label: "0-1-5"
                }
              ]
            },
            {
              id: "0-2",
              label: "0-2"
            },
            {
              id: "0-3",
              label: "0-3"
            },
            {
              id: "0-4",
              label: "0-4"
            },
            {
              id: "0-5",
              label: "0-5"
            }
          ]
        },
        {
          id: "1",
          label: "1",
          children: [
            {
              id: "1-0",
              label: "1-0"
            },
            {
              id: "1-1",
              label: "1-1"
            },
            {
              id: "1-2",
              label: "1-2"
            },
            {
              id: "1-3",
              label: "1-3"
            },
            {
              id: "1-4",
              label: "1-4"
            },
            {
              id: "1-5",
              label: "1-5"
            }
          ]
        }
      ]
    };
  },
  beforeCreate: function() {
    console.group("beforeCreate 创建前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  created: function() {
    console.group("created 创建完毕状态===============》");
  },
  beforeMount: function() {
    console.group("beforeMount 挂载前状态===============》");
  },
  mounted: function() {
    console.group("mounted 挂载结束状态===============》");
    console.log(this.$refs.hello);
    this.init();
  },
  beforeUpdate: function() {
    console.group("beforeUpdate 更新前状态===============》");
  },
  updated: function() {
    console.group("updated 更新完成状态===============》");
  },
  beforeDestroy: function() {},

  methods: {
    treeToList(data) {
      data = this.mapTree(data, (index, item, parent = {}) => {
        const { id } = parent;
        return {
          parentId: id,
          ...item
        };
      });

      let nodes = [];
      let edges = [];

      /*
          {
            source: "0",  // 父
            target: "1"  子 
          },
   */

      this.mapTree(data, (index, item, parent = {}) => {
        const { id, parentId } = item;
        nodes.push(item);

        if (parentId) {
          edges.push({
            source: parentId, // 父
            target: id // 子
          });
        }
      });

      // 去重
      nodes = nodes.reduce((acc, item) => {
        const { id } = item;
        if (
          !acc.some(item => {
            return item.id == id;
          })
        ) {
          acc.push(item);
        }

        return acc;
      }, []);

      edges = edges.reduce((acc, item) => {
        const { target } = item;
        if (
          !acc.some(item => {
            return item.target == target;
          })
        ) {
          acc.push(item);
        }

        return acc;
      }, []);

      return {
        edges,
        nodes
      };
    },
    concatTree(data, child, edge) {
      return data.map(item => {
        let { id, children = [] } = item;
        const { source } = edge;
        if (id == source) {
          children = children.concat([child]);
        } else if (children.length) {
          children = this.concatTree(children, child, edge);
        }
        return {
          ...item,
          children
        };
      });
    },

    mapTree(data, callback = () => {}, ...ags) {
      return data.map((item, index) => {
        const { children = [] } = item;
        return {
          ...item,
          ...(callback(index, item, ...ags) || {}),
          children: children.length
            ? this.mapTree(children, callback, item)
            : undefined
        };
      });
    },
    getTree(data) {
      const { edges, nodes } = data;
      let treeData = [];
      for (let i = 0; i < nodes.length; i++) {
        const { id } = nodes[i];
        let edge = null;
        for (let item of edges) {
          const { source, target } = item;
          if (target == id) {
            edge = item;
            break;
          }
        }
        if (edge === null) {
          treeData.push(nodes[i]);
        } else {
          treeData = this.concatTree(treeData, nodes[i], edge);
        }
      }

      console.log("treeData=", treeData);
      return treeData;
    },
    /*
      1 .显示父节点 ，
      1 .显示兄弟节点，
      2 .兄弟节点的所有子节点隐藏
      4 .自己节点下面第一个显示
    */
    showParentNode({ treeData, value }) {
      let newData = [];
      const path = findTreePath({
        treeData,
        value,
        valueKey: "id"
      });
      for (let item of path) {
        const { id } = item;
        this.graph.showItem(id);
        newData = this.mapTree(treeData, item => {
          if (item.id == value) {
            item.show = true;
          }
        });
      }

      console.log("newData==", JSON.stringify(newData));

      return newData;
    },
    showSiblingNode({ treeData, value }) {
      const path = findTreePath({
        treeData,
        value,
        valueKey: "id"
      });
      let data = path.length == 1 ? treeData : path[path.length - 2].children;
      for (let item of data) {
        const { id } = item;
        this.graph.showItem(id);
      }
    },
    hideSiblingChlidren({ treeData, value }) {
      const path = findTreePath({
        treeData,
        value,
        valueKey: "id"
      });
      let data = path.length == 1 ? treeData : path[path.length - 2].children;
      for (let item of data) {
        const { id } = item;
        if (id == value) {
          continue;
        }
        this.mapTree([item], (index, item) => {
          if (id !== item.id) {
            this.graph.hideItem(item.id);
          }
        });
      }
    },
    allShowNode(tree) {
      return this.mapTree(tree, (index, item) => {
        const { id } = item;

        item.isShow = true;

        return item;
        // this.graph.showItem(id);
      });
    },
    showFirstNode(tree) {
      return this.mapTree(tree, (index, item) => {
        const { id } = item;
        if (index !== 0) {
          let { children = [] } = item;
          item.children = this.mapTree(children, (index, item) => {
            const { id } = item;
            item.isShow = false;
            return item;
          });
        }

        return item;
      });
    },

    filterNodes(tree) {
      let newTree = [];
      this.mapTree(tree, (index, item) => {
        const { id, isShow } = item;
        if (isShow) {
          newTree.push({
            ...item,
            children: undefined
          });
        }
      });
      return newTree;
    },

    filterEdges(nodes, edges) {
      let newEdges = [];

      for (let item of nodes) {
        const { id } = item;
        let edge = edges.find(item => {
          const { target } = item;

          return target == id;
        });
        edge && newEdges.push(edge);
      }

      return newEdges;
    },

    /*
      1 .显示父节点 ，
      1 .显示兄弟节点，
      2 .兄弟节点的所有子节点隐藏
      4 .自己节点下面第一个显示
    */

    // 找到父亲节点
    findParentSiblingNode({ treeData, value }) {
      let newData = [];
      const path = findTreePath({
        treeData,
        value,
        valueKey: "id"
      });

      for (let [index, item] of path.entries()) {
        const { id, children = [] } = item;
        newData.push({
          ...item,
          children: undefined
        });

        for (let [index, item] of children.entries()) {
          const { id } = item;

          newData.push({
            ...item,
            children: undefined
          });
        }
      }

      return newData;
    },
    findSiblingNode({ treeData, value }) {
      let newData = [];
      const path = findTreePath({
        treeData,
        value,
        valueKey: "id"
      });
      let data = path.length == 1 ? treeData : path[path.length - 2].children;
      for (let item of data) {
        const { id } = item;
        newData.push({
          ...item,
          children: undefined
        });
      }

      return newData;
    },
    transformData(data, selectNode) {
      data = {
        nodes: data.nodes.map((item, index) => {
          return {
            ...item,
            sort: index
          };
        }),
        edges: data.edges.map((item, index) => {
          return {
            ...item,
            sort: index
          };
        })
      };

      let nodes = [];
      let tree = this.getTree(data);

      for (let item of tree) {
        nodes.push({
          ...item,
          children: undefined
        });
      }

      if (!selectNode) {
        selectNode = tree[0];
      }

      const { id } = selectNode;
      nodes = nodes.concat(
        this.findParentSiblingNode({ treeData: tree, value: id })
      );
      // nodes = nodes.concat(this.findSiblingNode({ treeData: tree, value: id }));

      let itemTree = findTreeData(
        tree, // 树形数组或者数组数据
        id, // 需要查找的value
        "id" //需要查找数组对象的key
      );
      let newTree = this.allShowNode([itemTree]);
      newTree = this.showFirstNode([itemTree]);

      nodes = nodes.concat(this.filterNodes(newTree));

      // 去重

      nodes = nodes.reduce((acc, item, next) => {
        const { id } = item;
        let flag = acc.some(item => {
          return item.id == id;
        });
        if (!flag) {
          acc.push(item);
        }
        return acc;
      }, []);

      let edges = this.filterEdges(nodes, data.edges);

      console.log("nodes11==", nodes);

      return {
        nodes: nodes.sort((a, b) => {
          return a.sort - b.sort;
        }),
        edges: edges.sort((a, b) => {
          return a.sort - b.sort;
        })
      };

      // let newTree = this.allShowNode(tree);
      // newTree = this.showFirstNode(newTree);

      // let nodes = this.filterNodes(newTree);

      // let edges = this.filterEdges(newTree, data.edges);
    },
    init() {
      let data = this.treeToList(this.treeData);
      const closeNode = item => {
        const {
          _cfg: { model, children = [] }
        } = item;

        console.log("item=", item);
        console.log("model=", model);
        // 动画地移动
        // graph.focusItem(item, true);

        console.log("!model.collapsed--", !model.collapsed);
        // graph.updateItem(item, {
        //   ...model,
        //   collapsed:true,
        //   label: "Classification11"
        // });

        const icon = item.get("group").findByClassName("collapse-icon");
        console.log("icon==", icon);

        item.refresh();
        graph.clear();
        graph.destroy();
      };

      /*
  let data = {
        nodes: [
          {
            id: "0",
            label: "0"
          },
          {
            id: "1",
            label: "1"
          },
          {
            id: "2",
            label: "2"
          },
          {
            id: "4",
            label: "4",
            comboId: "A"
          },

          {
            id: "4-1",
            label: "4-1",
            comboId: "A"
          },

          {
            id: "4-2",
            label: "4-2",
            comboId: "A"
          },

          {
            id: "4-3",
            label: "4-3",
            comboId: "A"
          },

          {
            id: "5",
            label: "5",
            comboId: "B"
          },
          {
            id: "6",
            label: "6",
            comboId: "A"
          },

          {
            id: "6-1",
            label: "6-1",
            comboId: "A"
          },

          {
            id: "6-2",
            label: "6-2",
            comboId: "A"
          },

          {
            id: "6-3",
            label: "6-3",
            comboId: "A"
          },

          {
            id: "7",
            label: "7",
            comboId: "C"
          },

          {
            id: "7-2",
            label: "7-2"
          },
          {
            id: "7-3",
            label: "7-3"
          },
          {
            id: "7-4",
            label: "7-4"
          },
          {
            id: "7-5",
            label: "7-5"
          },

          {
            id: "8",
            label: "8",
            comboId: "C"
          },

          {
            id: "8-1",
            label: "8-1",
            comboId: "C"
          },

          {
            id: "8-2",
            label: "8-2",
            comboId: "C"
          },
          {
            id: "8-3",
            label: "8-3",
            comboId: "C"
          },

          {
            id: "10",
            label: "10",
            comboId: "B"
          },
          {
            id: "11",
            label: "11",
            comboId: "B"
          }
        ],
        edges: [
          {
            source: "0",
            target: "1"
          },
          {
            source: "0",
            target: "2"
          },
          {
            source: "1",
            target: "4"
          },
          {
            source: "0",
            target: "3"
          },

          {
            source: "4",
            target: "4-1"
          },
          {
            source: "4",
            target: "4-2"
          },
          {
            source: "4",
            target: "4-3"
          },

          {
            source: "2",
            target: "5"
          },

          {
            source: "1",
            target: "6"
          },

          {
            source: "6",
            target: "6-1"
          },

          {
            source: "6",
            target: "6-2"
          },

          {
            source: "6",
            target: "6-3"
          },

          {
            source: "1",
            target: "7"
          },

          {
            source: "7",
            target: "7-1"
          },
          {
            source: "7",
            target: "7-2"
          },

          {
            source: "7",
            target: "7-3"
          },

          {
            source: "7",
            target: "7-4"
          },
          {
            source: "7",
            target: "7-5"
          },

          {
            source: "8",
            target: "8-1"
          },
          {
            source: "8",
            target: "8-2"
          },

          {
            source: "8",
            target: "8-3"
          },

          // {
          //   source: "3",
          //   target: "9"
          // },
          {
            source: "5",
            target: "10"
          },
          {
            source: "5",
            target: "11"
          }
        ]
      };
*/

      let sortByCombo = false;

      const container = this.$refs.hello;

      const width = container.scrollWidth;
      const height = (container.scrollHeight || 500) - 30;

      // // 自定义 flow-line 线
      // G6.registerEdge("flow-line", {
      //   draw(cfg, group) {
      //     const startPoint = cfg.startPoint;
      //     const endPoint = cfg.endPoint;
      //     const { style } = cfg;
      //     const shape = group.addShape("path", {
      //       attrs: {
      //         stroke: style.stroke,
      //         lineWidth: 2, // 描边粗细
      //         lineCap: "round", // 设置线条的结束端点样式
      //         lineJoin: "round", // 两条线相交时，所创建的拐角形状（bevel斜角、round圆角、miter尖角）
      //         endArrow: style.endArrow,
      //         path: [
      //           ["M", startPoint.x, startPoint.y],
      //           ["V", startPoint.y + 150], // 画一条垂直线到指定x坐标
      //           ["H", endPoint.x - 0],
      //           ["L", endPoint.x, endPoint.y]
      //         ]
      //         // path: [
      //         //   ['M', startPoint.x, startPoint.y],
      //         //   ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
      //         //   ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
      //         //   ['L', endPoint.x, endPoint.y],
      //         // ],
      //       }
      //     });
      //     return shape;
      //   }
      // });

      // 绘制层级之间的连接线
      // G6.registerEdge("flow-line", {
      //   // 绘制后的附加操作
      //   draw(cfg, group) {
      //     // 边两端与起始节点和结束节点的交点；
      //     const startPoint = cfg.startPoint;
      //     const endPoint = cfg.endPoint;
      //     // 边的配置
      //     const { style } = cfg;

      //     const shape = group.addShape("path", {
      //       attrs: {
      //         // startArrow: {
      //         //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
      //         //   path: "M 0,0 L 20,10 L 20,-10 Z"
      //         //   // 箭头的偏移量，负值代表向 x 轴正方向移动
      //         //   // d: -10,
      //         // },
      //         // endArrow: {
      //         //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
      //         //   path: "M 0,0 L 20,10 L 20,-10 Z",
      //         //   // 箭头的偏移量，负值代表向 x 轴正方向移动
      //         //   d: -10,
      //         // },
      //         stroke: style.stroke, // 边框的样式
      //         endArrow: style.endArrow, // 结束箭头
      //         // anchorPoints: [[0, 1.5], [1, 1.5]],
      //         // 路径
      //         path: [
      //           ["M", startPoint.x, startPoint.y],
      //           ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],

      //           ["L", endPoint.x*1, (startPoint.y + endPoint.y) / 2],
      //           ["L", endPoint.x*1, endPoint.y]
      //         ]
      //       }
      //     });

      //     return shape;
      //   }
      // });

      const graph = new G6.Graph({
        container: container,
        width,
        height: height - 50,
        fitView: true,
        fitViewPadding: 30,

        // 有一些闪烁 可以关闭这个动画
        // animate: true,
        groupByTypes: false,
        // radial: true,
        getId: d => {
          return d.id;
        },
        getWidth: () => {
          return 10;
        }, // 每个节点的宽度
        getHeight: () => {
          return 10;
        }, // 每个节点的高度
        getVGap: () => {
          return 10;
        }, // 每个节点的水平间隙
        getHGap: () => {
          return 10;
        },
        // 默认状态下边线的配置，
        // defaultEdge: {
        //   type: "flow-line",
        //   style: {
        //     stroke: "#ccc"
        //   }
        // },
        modes: {
          default: [
            "drag-combo",
            "drag-node",
            "drag-canvas",
            {
              type: "collapse-expand-combo",
              relayout: false
            }
          ]
        },
        layout: {
          type: "dagre",
          sortByCombo: false,
          ranksep: 10,
          nodesep: 10
        },
        defaultNode: {
          size: [60, 30],
          type: "rect",
          anchorPoints: [
            [0.5, 0],
            [0.5, 1]
          ]
        },
        defaultEdge: {
          type: "line"
        },
        defaultCombo: {
          type: "rect",
          style: {
            fillOpacity: 0.1
          }
        }
      });
      this.graph = graph;
      graph.data(this.transformData(data));
      graph.render();
      graph.fitView(); // 自适

      graph.on("node:click", evt => {
        let item = evt.item;
        const {
          _cfg: { model, id }
        } = item;
        // 动画地移动
        // graph.focusItem(item, true);

        graph.changeData(this.transformData(data, { id }));
      });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
        };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
