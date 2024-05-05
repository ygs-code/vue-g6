<template>
  <div>
    <!-- <div>{{ data }}</div> -->
    <div ref="hello"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "11",
      data: {
        id: "Modeling_Methods",
        collapsed: false,
        stack: true,
        children: [
          {
            id: "Classification",
            //  collapsed: true,
            children: [
              { id: "Logistic regression" },
              { id: "Linear discriminant analysis" },
              { id: "Rules" },
              { id: "Decision trees" },
              { id: "Naive Bayes" },
              { id: "K nearest neighbor" },
              { id: "Probabilistic neural network" },
              { id: "Support vector machine" }
            ]
          },
          {
            id: "Consensus",
            children: [
              {
                id: "Models diversity",
                children: [
                  { id: "Different initializations" },
                  { id: "Different parameter choices" },
                  { id: "Different architectures" },
                  { id: "Different modeling methods" },
                  { id: "Different training sets" },
                  { id: "Different feature sets" }
                ]
              },
              {
                id: "Methods",
                children: [
                  { id: "Classifier selection" },
                  { id: "Classifier fusion" }
                ]
              },
              {
                id: "Common",
                children: [
                  { id: "Bagging" },
                  { id: "Boosting" },
                  { id: "AdaBoost" }
                ]
              }
            ]
          },
          {
            id: "Regression",
            children: [
              { id: "Multiple linear regression" },
              { id: "Partial least squares" },
              { id: "Multi-layer feedforward neural network" },
              { id: "General regression neural network" },
              { id: "Support vector regression" }
            ]
          }
        ]
      }
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
    setTimeout(() => {
      this.hideItem("Modeling_Methods");
    }, 500);
  },
  beforeUpdate: function() {
    console.group("beforeUpdate 更新前状态===============》");
  },
  updated: function() {
    console.group("updated 更新完成状态===============》");
  },
  beforeDestroy: function() {},

  methods: {
    hideItem(nodeId) {
      const item = graph.findById("nodeId");
      graph.showItem(item);
      // 等价于
      // graph.hideItem(nodeId);
    },
    fData(data, parameter) {
      const { id } = parameter;
      return data.map(item => {
        const { children = [] } = item;
        if (children.length) {
          item.children = this.fData(children, parameter);
        }
        if (item.id == id) {
          item = {
            ...item,
            ...parameter
          };
        }

        return item;
      });
    },
    init() {
      const _this = this;
      const { data } = this;

      const closeNode = item => {
        const {
          _cfg: { model, children = [] }
        } = item;

        // for (let $item of children) {
        //   closeNode($item);
        // }

        console.log("item=", item);
        console.log("model=", model);
        // 动画地移动
        graph.focusItem(item, true);

        //       if (collapsed) {
        //   icon.attr("symbol", G6.Marker.expand)
        // } else {
        //   icon.attr("symbol", G6.Marker.collapse)
        // }

        console.log("!model.collapsed--", !model.collapsed);
        // graph.updateItem(item, {
        //   ...model,
        //   collapsed:true,
        //   label: "Classification11"
        // });

        const icon = item.get("group").findByClassName("collapse-icon");
        console.log("icon==", icon);

        _this.data = _this.fData([data], {
          id: model.id,
          collapsed: !model.collapsed

          // label: "Classification11"
        })[0];
        console.log(" _this.data==", _this.data);
        debugger;

        item.refresh();
        graph.clear();
        graph.destroy();
        _this.init();
        // setTimeout(() => {

        // }, 5000);
      };

      var graph = new G6.TreeGraph({
        container: this.$refs.hello,
        animate: false,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        modes: {
          default: [
            // {
            //   type: "collapse-expand",
            //   onChange(item, collapsed) {
            //     const icon = item.get("group").findByClassName("collapse-icon");
            //     debugger;
            //     // if (collapsed) {
            //     //   icon.attr("symbol", EXPAND_ICON);
            //     // } else {
            //     //   icon.attr("symbol", COLLAPSE_ICON);
            //     // }
            //   }
            // },
            // {
            //   type: "collapse-expand",
            //   // onChange: function onChange(item, collapsed) {
            //   //   debugger;
            //   //   // var data = item.get("model").data;
            //   //   // data.collapsed = collapsed;

            //   //   return false;
            //   // }
            // },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        defaultNode: {
          size: 16,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ],
          style: {
            fill: "#40a9ff",
            stroke: "#096dd9"
          }
        },
        defaultEdge: {
          shape: "cubic-horizontal",
          style: {
            stroke: "#A3B1BF"
          }
        },
        layout: {
          type: "compactBox",
          direction: "TB",
          // radial: true,
          getId: d => {
            return d.id;
          },
          getWidth: () => {
            return 180;
          }, // 每个节点的宽度
          getHeight: () => {
            return 200;
          }, // 每个节点的高度
          getVGap: () => {
            return 50;
          }, // 每个节点的水平间隙
          getHGap: () => {
            return 40;
          } 
          // 每个节点的垂直间隙
          // getId: function getId(d) {
          //   return d.id;
          // },
          // getHeight: function getHeight() {
          //   return 16;
          // },
          // getWidth: function getWidth() {
          //   return 16;
          // },
          // getVGap: function getVGap() {
          //   return 10;
          // },
          // getHGap: function getHGap() {
          //   return 100;
          // }
        }
      });

      graph.node(function(node) {
        return {
          size: 26,
          style: {
            fill: "#40a9ff",
            stroke: "#096dd9"
          },
          label: node.id,
          labelCfg: {
            position:
              node.children && node.children.length > 0 ? "left" : "right"
          }
        };
      });

      /**
       * @method: 点击node节点，展开此节点，收缩其他同级节点及其所有子节点
       * @param {*} item 此节点
       * @param {*} collapsed 收缩状态
       */
      function collapseSibNode(item, collapsed) {
        let farNode = item._cfg.parent && item._cfg.parent._cfg.id;
        // 同级节点
        let siblingNode;

        // 当前有父节点
        if (farNode) {
          // 获取兄弟节点
          siblingNode = item._cfg.parent._cfg.children;
          if (siblingNode.length > 0 && siblingNode) {
            collapseNode(siblingNode);
          }
        } else {
          // 当前是根节点
          collapseNode(item._cfg.children);
        }

        // 折叠展开节点
        const data = item.get("model");
        const icon = item.get("group").findByClassName("collapse-icon");

        if (collapsed) {
          // icon.attr("symbol", G6.Marker.expand)
        } else {
          // icon.attr("symbol", G6.Marker.collapse)
        }

        data.collapsed = collapsed;
      }
      /**
       * @method: 递归收起节点
       * @param {*} children
       */
      function collapseNode(children) {
        children.forEach(el => {
          const data = el.get("model");
          const icon = el.get("group").findByClassName("collapse-icon");
          console.log("icon===", icon);
          if (!icon) return;
          icon.attr("symbol", G6.Marker.expand);
          let isChildren = el._cfg.children && el._cfg.children.length > 0;
          if (isChildren) {
            collapseNode(el._cfg.children);
            // 先关闭子节点后关闭父节点
            data.collapsed = true;
          }
        });
      }

      graph.on("node:click", evt => {
        let item = evt.item;
        const {
          _cfg: { model }
        } = item;
        console.log("item=", item);
        console.log("model=", model);
        // // 动画地移动
        // graph.focusItem(item, true);


        // graph.updateItem(item, {
        //   ...model,
        //   collapsed: true,
        //   label: "Classification1111"
        // });
        // item.refresh();

        closeNode(item);
        // collapseSibNode(item, false)
      });

      graph.hideItem("Modeling_Methods");
      graph.data(data);
      graph.render();
      graph.fitView();
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
