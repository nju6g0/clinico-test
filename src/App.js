import "./App.css";
import React, { useState, useEffect } from "react";

import { getFakeData } from "./service/getFakeData";
import Tree from "./components/tree";
import policyHoldersService from "./service/policyHolders.service";

function sortByDate(arr) {
  const sortedArr = arr.sort((a, b) => {
    if (a.registration_date > b.registration_date) {
      return 1;
    }
    if (a.registration_date < b.registration_date) {
      return -1;
    }
    return 0;
  });
  return sortedArr;
}
function organizeChildren(arr) {
  const result = {
    ...arr[0],
    children: [],
  };
  const map = new Map();
  arr.slice(1).forEach((item) => map.set(item.code, { ...item, children: [] }));

  map.forEach((item) => {
    // 找上層
    const parent = map.get(item.introducer_code);
    if (!parent) {
      // 找不到上層 => 直接介紹保戶
      if (result.children.length < 2) {
        result.children.push(item);
      } else {
        if (result.children[0].children.length < 2) {
          result.children[0].children.push(item);
          return;
        }
        if (result.children[1].children.length < 2) {
          result.children[1].children.push(item);
        }
      }
    } else {
      // 有找到上層 => 間接介紹保戶
      if (parent.children.length < 2) {
        parent.children.push(item);
      } else {
        // 當 parent 的 children >= 2個時，往下找下一階層
        let current = map.get(parent.children[0].code);
        if (current.children.length > 2) {
          current = map.get(parent.children[1].code);
        }
        if (current.children < 2) {
          current.children.push(item);
        }
      }
    }
  });

  return result;
}
function organizeData({ l, r, code, ...rest }) {
  l.forEach((el) => {
    el.role = el.introducer_code === code ? "direct" : "secondhand";
  });
  r.forEach((el) => {
    el.role = el.introducer_code === code ? "direct" : "secondhand";
  });
  const left = organizeChildren(sortByDate(l));
  const right = organizeChildren(sortByDate(r));

  const arr = [
    {
      ...rest,
      code,
      role: "main",
      children: [left, right],
    },
  ];

  return arr;
}

function App() {
  const [searchCode, setSearchCode] = useState("P001");
  const [policyHolders, setPolicyHolders] = useState([]);

  async function fetchPolicyHolders(code) {
    try {
      let response = await policyHoldersService.searchHolder(code);
      response = getFakeData(code);

      if (Object.keys(response).length === 0) {
        setPolicyHolders([]);
        return;
      }
      setPolicyHolders(organizeData(response));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTopPolicyHolders(code) {
    try {
      let response = await policyHoldersService.getTopHolder(code);
      response = getFakeData(code);

      if (Object.keys(response).length === 0) {
        setPolicyHolders([]);
        return;
      }

      setPolicyHolders(organizeData(response));
    } catch (error) {
      console.log(error);
    }
  }

  const changeInputValue = (e) => {
    setSearchCode(e.target.value);
  };

  const handleSearch = (code) => {
    fetchPolicyHolders(code);
  };

  const handleClickNode = (code) => {
    setSearchCode(code);
    fetchPolicyHolders(code);
  };

  const handleClickTop = (code) => {
    setSearchCode("");
    fetchTopPolicyHolders(code);
  };

  useEffect(() => {
    fetchPolicyHolders(searchCode);
  }, []);

  return (
    <div className="App">
      <h1>保戶關係查詢</h1>
      <hr />
      <div>
        <label>
          保戶編號：
          <input value={searchCode} onChange={changeInputValue} />
        </label>
        <button
          type="button"
          onClick={() => {
            handleSearch(searchCode);
          }}
        >
          查詢
        </button>
      </div>
      <p>關係圖</p>
      {policyHolders.length === 0 ? (
        <div>查無保戶資料</div>
      ) : (
        <Tree
          data={policyHolders}
          onClickNode={handleClickNode}
          onClickTop={handleClickTop}
        />
      )}
    </div>
  );
}

export default App;
