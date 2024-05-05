<template>
  <div ref="hello"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
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
    init() {
      const data = {
        nodes: [
          {
            id: "node0",
            label: "集群0",
            // x: 450,
            // y: 200,
            type: "rect"
          },
          {
            id: "node1",
            label: "集群",
            // x: 450,
            // y: 200,
            type: "rect"
          },
          {
            id: "node2",
            label: "CN节点",
            // x: 150,
            // y: 50,
            type: "rect"
          },
          {
            id: "node3",
            label: "DN节点",
            // x: 150,
            // y: 350,
            type: "rect"
          },
          {
            id: "node4",
            label: "CM",
            // x: 1000,
            // y: 50,
            type: "rect"
          },
          {
            id: "node5",
            label: "GTM",
            // x: 1000,
            // y: 180,
            type: "rect"
          },
          {
            id: "node6",
            label: "ETCD",
            // x: 1000,
            // y: 350,
            type: "rect"
          }
        ],
        edges: [
          {
            source: "node1",
            target: "node2",
            // label: "CN节点"
          },
          {
            source: "node1",
            target: "node3",
            // label: "DN节点"
          },
          {
            source: "node1",
            target: "node4",
            // label: "CM"
          },
          {
            source: "node1",
            target: "node5",
            // label: "GTM"
          },
          {
            source: "node1",
            target: "node6",
            // label: "ETCD"
          }
        ]
      };

      // const data = {
      //   // 点集
      //   nodes: [
      //     {
      //       id: "node1", // String，该节点存在则必须，节点的唯一标识
      //       label: "node1"
      //     },
      //     {
      //       id: "node2", // String，该节点存在则必须，节点的唯一标识
      //       label: "node2"
      //     }
      //   ],
      //   // 边集
      //   edges: [
      //     {
      //       source: "node1", // String，必须，起始点 id
      //       target: "node2" // String，必须，目标点 id
      //     }
      //   ]
      // };

      const colors = [
        "#BDD2FD",
        "#BDEFDB",
        "#C2C8D5",
        "#FBE5A2",
        "#F6C3B7",
        "#B6E3F5",
        "#D3C6EA",
        "#FFD8B8",
        "#AAD8D8",
        "#FFD6E7"
      ];
      const strokes = [
        "#5B8FF9",
        "#5AD8A6",
        "#5D7092",
        "#F6BD16",
        "#E8684A",
        "#6DC8EC",
        "#9270CA",
        "#FF9D4D",
        "#269A99",
        "#FF99C3"
      ];
      const nodes = data.nodes;
      const clusterMap = new Map();
      let clusterId = 0;
      nodes.forEach(function(node) {
        // cluster
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }
        const cid = clusterMap.get(node.cluster);
        if (!node.style) {
          node.style = {};
        }
        node.style.fill = colors[cid % colors.length];
        node.style.stroke = strokes[cid % strokes.length];
      });

      const container = this.$refs.hello;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      // 绘制层级之间的连接线
      G6.registerEdge("flow-line", {
        // 绘制后的附加操作
        draw(cfg, group) {
          // 边两端与起始节点和结束节点的交点；
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          // 边的配置
          const { style } = cfg;

          const shape = group.addShape("path", {
            attrs: {
              // startArrow: {
              //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
              //   path: "M 0,0 L 20,10 L 20,-10 Z"
              //   // 箭头的偏移量，负值代表向 x 轴正方向移动
              //   // d: -10,
              // },
              // endArrow: {
              //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
              //   path: "M 0,0 L 20,10 L 20,-10 Z",
              //   // 箭头的偏移量，负值代表向 x 轴正方向移动
              //   d: -10,
              // },
              stroke: style.stroke, // 边框的样式
              endArrow: style.endArrow, // 结束箭头
              // anchorPoints: [[0, 1.5], [1, 1.5]],
              // 路径
              path: [
                ["M", startPoint.x, startPoint.y],
                ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],

                ["L", endPoint.x*1, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x*1, endPoint.y]
              ]
            }
          });

          return shape;
        }
      });

      // 默认连接边线的颜色 末尾箭头
      const defaultEdgeStyle = {
        stroke: "#ccc"
      };
      const graph = new G6.Graph({
        container,
        width,
        height,
        // 默认状态下边线的配置，
        // defaultEdge: {
        //   type: "flow-line",
        //   style: defaultEdgeStyle
        // },
        layout: {
           type: 'dagre',
          rankdir: "TB",
          // type: "compactBox", // 布局类型，支持 dendrogram、compactBox、mindmap、indeted
          direction: "TB", // 布局方向，有  LR , RL , TB , BT , H , V ，说明（L：左；R：右；T：上；B：下；H：垂直；V：水平）
          animate: true, // 设置为 false 可关闭布局动画
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          nodeClusterBy: "cluster",
          clusterNodeStrength: 300,
          
        }
      });

      graph.data(data);
      graph.render();

      /******** 拖拽固定节点的逻辑 *********/
      graph.on("node:dragstart", function(e) {
        const forceLayout = graph.get("layoutController").layoutMethods[0];
        forceLayout.stop();
      });
      graph.on("node:drag", function(e) {
        refreshDragedNodePosition(e);
        graph.layout();
      });
      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
        model.x = e.x;
        model.y = e.y;
      }
      /*********************************/

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
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
