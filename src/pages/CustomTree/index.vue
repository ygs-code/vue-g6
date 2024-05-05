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
      var COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
        return [
          ["M", x, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x + 2, y],
          ["L", x + 2 * r - 2, y]
        ];
      };
      var EXPAND_ICON = function EXPAND_ICON(x, y, r) {
        return [
          ["M", x, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x + 2, y],
          ["L", x + 2 * r - 2, y],
          ["M", x + r, y - r + 2],
          ["L", x + r, y + r - 2]
        ];
      };
      G6.registerNode(
        "tree-node",
        {
          drawShape: function drawShape(cfg, group) {
            var rect = group.addShape("rect", {
              attrs: {
                fill: "#fff",
                stroke: "#666"
              }
            });
            var content = cfg.name.replace(/(.{19})/g, "$1\n");
            var text = group.addShape("text", {
              attrs: {
                text: content,
                x: 0,
                y: 0,
                textAlign: "left",
                textBaseline: "middle",
                fill: "#666"
              }
            });
            var bbox = text.getBBox();
            var hasChildren = cfg.children && cfg.children.length > 0;
            if (hasChildren) {
              group.addShape("marker", {
                attrs: {
                  x: bbox.maxX + 6,
                  y: bbox.minX + bbox.height / 2 - 6,
                  r: 6,
                  symbol: COLLAPSE_ICON,
                  stroke: "#666",
                  lineWidth: 2
                },
                className: "collapse-icon"
              });
            }
            rect.attr({
              x: bbox.minX - 4,
              y: bbox.minY - 6,
              width: bbox.width + (hasChildren ? 26 : 8),
              height: bbox.height + 12
            });
            return rect;
          }
        },
        "single-shape"
      );

      var graph = new G6.TreeGraph({
        container: this.$refs.hello,

        width: window.innerWidth,
        height: window.innerHeight,
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange(item, collapsed) {
                var data = item.get("model");
                var icon = item.get("group").findByClassName("collapse-icon");
                if (collapsed) {
                  icon.attr("symbol", EXPAND_ICON);
                } else {
                  icon.attr("symbol", COLLAPSE_ICON);
                }
                data.collapsed = collapsed;
                return true;
              }
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        defaultNode: {
          shape: "tree-node",
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          shape: "cubic-horizontal",
          style: {
            stroke: "#A3B1BF"
          }
        },
        layout: {
          type: "compactBox",
          direction: "LR",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 20;
          },
          getHGap: function getHGap() {
            return 80;
          }
        }
      });
      // $.getJSON(
      //   "https://gw.alipayobjects.com/os/antvdemo/assets/data/modeling-methods.json",
      //   function(data) {
      let data = {
        name: "Modeling Methods",
        children: [
          {
            name: "Classification",
            children: [
              { name: "Logistic regression" },
              { name: "Linear discriminant analysis" },
              { name: "Rules" },
              { name: "Decision trees" },
              { name: "Naive Bayes" },
              { name: "K nearest neighbor" },
              { name: "Probabilistic neural network" },
              { name: "Support vector machine" }
            ]
          },
          {
            name: "Consensus",
            children: [
              {
                name: "Models diversity",
                children: [
                  { name: "Different initializations" },
                  { name: "Different parameter choices" },
                  { name: "Different architectures" },
                  { name: "Different modeling methods" },
                  { name: "Different training sets" },
                  { name: "Different feature sets" }
                ]
              },
              {
                name: "Methods",
                children: [
                  { name: "Classifier selection" },
                  { name: "Classifier fusion" }
                ]
              },
              {
                name: "Common",
                children: [
                  { name: "Bagging" },
                  { name: "Boosting" },
                  { name: "AdaBoost" }
                ]
              }
            ]
          },
          {
            name: "Regression",
            children: [
              { name: "Multiple linear regression" },
              { name: "Partial least squares" },
              { name: "Multi-layer feedforward neural network" },
              { name: "General regression neural network" },
              { name: "Support vector regression" }
            ]
          }
        ]
      };

      G6.Util.traverseTree(data, function(item) {
        item.id = item.name;
      });
      graph.data(data);
      graph.render();
      graph.fitView();
      // }
      // );
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
