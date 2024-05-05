<template>
  <div ref="hello"></div>
</template>

<script>
import G6 from "@antv/g6";
import insertCss from 'insert-css';
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
      insertCss(`
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
`);

      const data = {
        nodes: [
          {
            id: "1",
            dataType: "alps",
            name: "alps_file1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "2",
            dataType: "alps",
            name: "alps_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "3",
            dataType: "alps",
            name: "alps_file3",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "4",
            dataType: "sql",
            name: "sql_file1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "5",
            dataType: "sql",
            name: "sql_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "6",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "7",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          },
          {
            id: "8",
            dataType: "feature_extractor",
            name: "feature_extractor",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf"
              },
              {
                label: "dot",
                value: "pai_graph.dot"
              },
              {
                label: "init",
                value: "init.rc"
              }
            ]
          }
        ],
        edges: [
          {
            source: "1",
            target: "2"
          },
          {
            source: "1",
            target: "3"
          },
          {
            source: "2",
            target: "4"
          },
          {
            source: "3",
            target: "4"
          },
          {
            source: "4",
            target: "5"
          },
          {
            source: "5",
            target: "6"
          },
          {
            source: "6",
            target: "7"
          },
          {
            source: "6",
            target: "8"
          }
        ]
      };

      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3
              },
              name: "rect-shape"
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold"
                },
                name: "text-shape"
              });
            }
            return rect;
          }
        },
        "single-node"
      );

      const container = this.$refs.hello;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        layout: {
          type: "dagre",
          nodesepFunc: d => {
            if (d.id === "3") {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
          controlPoints: true
        },
        defaultNode: {
          type: "sql"
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5"
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef"
          }
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            {
              type: "tooltip",
              formatText(model) {
                const cfg = model.conf;
                const text = [];
                cfg.forEach(row => {
                  text.push(row.label + ":" + row.value + "<br>");
                });
                return text.join("\n");
              },
              offset: 30
            }
          ]
        },
        fitView: true
      });
      graph.data(data);
      graph.render();

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
