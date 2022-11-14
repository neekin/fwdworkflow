export const database = {
  "parallelNode": [
    {
      "handleNode": {
        "nodeId": "A",
        "userIdList": ["z", "x"]
      }
    },
    {
      "handleNode": {
        "nodeId": "B",
        "userIdList": ["y", "t"]
      }
    },
    {
      "serialNode": [
        {
          "handleNode": {
            "nodeId": "C",
            "userIdList": ["j", "k"]
          }
        },
        {
          "handleNode": {
            "nodeId": "D",
            "userIdList": ["o", "q"]
          }
        },
        {
          "parallelNode": [
            {
              "serialNode": [
                {
                  "handleNode": {
                    "nodeId": "E",
                    "userIdList": ["j", "k"]
                  }
                },
                {
                  "handleNode": {
                    "nodeId": "F",
                    "userIdList": ["o", "q"]
                  }
                }
              ]
            },
            {
              "serialNode": [
                {
                  "handleNode": {
                    "nodeId": "G",
                    "userIdList": ["j", "k"]
                  }
                },
                {
                  "handleNode": {
                    "nodeId": "H",
                    "userIdList": ["o", "q"]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

let data = {
  nodes: [],
  edges: []
}
export const dfs = (n) => {
  if (typeof n === 'string') return;
  let parallelNode = []
  Object.keys(n).forEach(k => {
    if (k === 'handleNode') {
      data.nodes.push({
        id: n[k].nodeId,
        label: n[k].userIdList
      })
    }
    if(k=='parallelNode'){
      console.log(n[k])
    }
    // if(k==='serialNode'){
    //   if(root==0){
    //      let p = parallelNode.map(item=>{
    //            return { source:item.target,
    //             target:n[k]
    //           }
    //       })

    //       console.log(parallelNode)
    //       data.edges.concat(p)
    //   }
    //   ++root
    // }
    // console.log(root)
    dfs(n[k])


  })
}

// nodes: [
//   {
//     id: "0",
//     label:
//       "1. Dr.xalkdfjladdddxdkdf... \n2. Klajdflkadsjflkdjsfkasj... \n ...",
//     owners: [
//       { role: "DR", name: "xxxxxxxxxxxxxxxxxxxx" },
//       { role: "admin", name: "yyyyyyyyyyyyyyyyyyyyyy" },
//       { role: "xxxx", name: "yyyyyyyyyyyyyyyyyyyyyy" },
//     ],
//     style: {
//       stroke: "#5B8FF9",
//       fill: "#0094ff",
//     },
//   }
// ],
// edges: [

// ],

dfs(database)

// console.log(data)

export const getData = () => {

}

export default database
