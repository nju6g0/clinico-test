import D3Tree from "react-d3-tree";

import { useCenteredTree } from "./helpers";

function renderTreeNode({ nodeDatum, foreignObjectProps, onClickNode }) {
  const handleClick = () => {
    if (nodeDatum.role === "main") return;
    onClickNode(nodeDatum.code);
  };
  const handleClickUp = (e) => {
    e.stopPropagation();
    onClickNode(nodeDatum.introducer_code);
  };
  const showUp = nodeDatum.role === "main" && nodeDatum.introducer_code;
  return (
    <g>
      <foreignObject {...foreignObjectProps}>
        <div className={`treeNode ${nodeDatum.role}`} onClick={handleClick}>
          <p>保戶編號：{nodeDatum.code}</p>
          <p>推薦人編號：{nodeDatum.introducer_code}</p>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {showUp && (
            <button type="button" onClick={handleClickUp}>
              ^ 上一層
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

const Tree = ({ data, onClickNode }) => {
  const [translate, containerRef] = useCenteredTree();
  const foreignObjectProps = { width: 200, height: 200, x: -100, y: -50 };
  return (
    <div style={{ width: "100%", height: "100vh" }} ref={containerRef}>
      <D3Tree
        data={data}
        translate={translate}
        orientation="vertical"
        pathFunc="step"
        nodeSize={{ x: 220, y: 200 }}
        collapsible={false}
        renderCustomNodeElement={(rd3tProps) =>
          renderTreeNode({ ...rd3tProps, foreignObjectProps, onClickNode })
        }
      />
    </div>
  );
};

export default Tree;
