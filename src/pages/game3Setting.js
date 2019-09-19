const levelSetting = {
  "1": {
    leafNum: 8,
    larvaG: 30,
    larvaR: 10,
    larvaTime: 1300,
  },
  "2": {
    leafNum: 8,
    larvaG: 35,
    larvaR: 12,
    larvaTime: 1100,
  },
  "3": {
    leafNum: 13,
    larvaG: 30,
    larvaR: 10,
    larvaTime: 1100,
  },
  "4": {
    leafNum: 13,
    larvaG: 40,
    larvaR: 15,
    larvaTime: 900,
  },
  "5": {
    leafNum: 13,
    larvaG: 45,
    larvaR: 18,
    larvaTime: 700,
  },
  "6": {
    leafNum: 24,
    larvaG: 35,
    larvaR: 12,
    larvaTime: 1100,
  },
  "7": {
    leafNum: 24,
    larvaG: 40,
    larvaR: 15,
    larvaTime: 900,
  },
  "8": {
    leafNum: 24,
    larvaG: 45,
    larvaR: 18,
    larvaTime: 700,
  },

}

// leaf pos is CENTER of leaf
const leafSetting = {
  "8" : (function(){
    let leafPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 105.16
    const margin_h_in = 79.62
    const margin_v_out = 157.75
    const margin_v_in = 90.14

    const leafH = (fullHeight - margin_v_out *2 - margin_v_in ) / 2
    const leafW = leafH

    for( let row = 0 ; row < 2 ; row++ ){
      for( let col = 0 ; col < 4 ; col++ ){
        const _x = fullWidth/2 + ( leafW + margin_h_in )*(col-2) + margin_h_in/2 + leafW/2
        const _y = fullHeight/2 + ( leafH + margin_v_in)*(row-1) + margin_v_in/2 + leafH/2
        const leaf = {
          x: Number(_x.toFixed(2)),
          y: Number(_y.toFixed(2)),
        }
        leafPos.push( leaf )
      }
    }

    return { leafW, leafH, leafPos }
  })(),
  "13": (function(){
    let leafPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 63.85
    const margin_h_in = 63.85
    const margin_v_out = 52.58
    const margin_v_in = 52.58

    const leafH = (fullHeight - margin_v_out *2 - margin_v_in*2 ) / 3
    const leafW = leafH

    let row1 = new Array(4).fill(1).map( (_, col) => {
      const _x = fullWidth/2 + ( leafW + margin_h_in )*(col-2) + margin_h_in/2 + leafW/2
      const _y = fullHeight/2 + ( leafH + margin_v_in)*(-1) - leafH/2 + leafH/2
      return {
        x: Number(_x.toFixed(2)),
        y: Number(_y.toFixed(2)),
      }
    })
    let row2 = new Array(5).fill(1).map( (_, col) => {
      const _x = fullWidth/2 + ( leafW + margin_h_in )*(col-2)
      const _y = fullHeight/2
      return {
        x: Number(_x.toFixed(2)),
        y: Number(_y.toFixed(2)),
      }
    })
    let row3 = new Array(4).fill(1).map( (_, col) => {
      const _x = fullWidth/2 + ( leafW + margin_h_in )*(col-2) + margin_h_in/2 + leafW/2
      const _y = fullHeight/2 + ( leafH + margin_v_in)*(+1) - leafH/2 + leafH/2
      return {
        x: Number(_x.toFixed(2)),
        y: Number(_y.toFixed(2)),
      }
    })
    leafPos = [].concat(row1, row2, row3)
    console.log(leafPos)
    return { leafW, leafH, leafPos }
  })(),
  "24": (function(){
    let leafPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 60.09
    const margin_h_in = 60.09
    const margin_v_out = 120.19
    const margin_v_in = 37.56

    const leafH = (fullHeight - margin_v_out *2 - margin_v_in *3 ) / 4
    const leafW = leafH

    for( let row = 0 ; row < 4 ; row++ ){
      for( let col = 0 ; col < 6 ; col++ ){
        const _x = fullWidth/2 + ( leafW + margin_h_in )*(col-3) + margin_h_in/2 + leafW/2
        const _y = fullHeight/2 + ( leafH + margin_v_in)*(row-2) + margin_v_in/2 + leafH/2
        const leaf = {
          x: Number(_x.toFixed(2)),
          y: Number(_y.toFixed(2)),
        }
        leafPos.push( leaf )
      }
    }
    return { leafW, leafH, leafPos }
  })()
}


export {
  leafSetting,
  levelSetting,
}