const levelSetting = {
  "1": {
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "2": {
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "3":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "4":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "5":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "6":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "7":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "8":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },
  "9":{
    rowNum: 3,
    colNum: 3,
    speed: 1,
    timeout: 5000,
  },

}

// btn pos is CENTER of larva
const larvaSetting = {
  "9" : (function(){
    let larvaPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 362.07
    const margin_h_in = 15.02
    const margin_v_out = 91.91
    const margin_v_in = 15.02
    
    const colNum = 3
    const rowNum = 3
    
    const larvaH = (fullHeight - margin_v_out *2 - margin_v_in ) / 3
    const larvaW = larvaH

    const larvaBoxW = larvaW * colNum + margin_h_in * (colNum -1)
    const larvaBoxH = larvaH * rowNum + margin_v_in * (rowNum -1)

    for( let row = 0 ; row < rowNum ; row++ ){
      for( let col = 0 ; col < colNum ; col++ ){
        const _x = (larvaW + margin_h_in)*col 
            + fullWidth/2 - larvaBoxW/2 
            + larvaW/2 
        const _y = (larvaH + margin_v_in)*row
            + fullHeight/2 - larvaBoxH/2
            + larvaH/2
        const larva = {
          x: Number(_x.toFixed(2)),
          y: Number(_y.toFixed(2)),
        }
        larvaPos.push( larva )
      }
    }

    return { larvaW, larvaH, larvaPos }
  })(),
  "12": (function(){
    let larvaPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 240.38
    const margin_h_in = 15.02
    const margin_v_out = 91.91
    const margin_v_in = 15.02
    
    const colNum = 4
    const rowNum = 3

    const larvaH = (fullHeight - margin_v_out *2 - margin_v_in ) / 3
    const larvaW = larvaH

    const larvaBoxW = larvaW * colNum + margin_h_in * (colNum -1)
    const larvaBoxH = larvaH * rowNum + margin_v_in * (rowNum -1)

    for( let row = 0 ; row < rowNum ; row++ ){
      for( let col = 0 ; col < colNum ; col++ ){
        const _x = (larvaW + margin_h_in)*col 
            + fullWidth/2 - larvaBoxW/2 
            + larvaW/2 
        const _y = (larvaH + margin_v_in)*row
            + fullHeight/2 - larvaBoxH/2
            + larvaH/2
        const larva = {
          x: Number(_x.toFixed(2)),
          y: Number(_y.toFixed(2)),
        }
        larvaPos.push( larva )
      }
    }

    return { larvaW, larvaH, larvaPos }
  })(),
  "15": (function(){
    let larvaPos =[]
    const fullWidth = 1600
    const fullHeight = 900
    const margin_h_out = 148.73
    const margin_h_in = 14.27
    const margin_v_out = 109.93
    const margin_v_in = 14.27
    
    const colNum = 5
    const rowNum = 3

    const larvaH = (fullHeight - margin_v_out *2 - margin_v_in ) / 3
    const larvaW = larvaH

    const larvaBoxW = larvaW * colNum + margin_h_in * (colNum -1)
    const larvaBoxH = larvaH * rowNum + margin_v_in * (rowNum -1)

    for( let row = 0 ; row < rowNum ; row++ ){
      for( let col = 0 ; col < colNum ; col++ ){
        const _x = (larvaW + margin_h_in)*col 
            + fullWidth/2 - larvaBoxW/2 
            + larvaW/2 
        const _y = (larvaH + margin_v_in)*row
            + fullHeight/2 - larvaBoxH/2
            + larvaH/2
        const larva = {
          x: Number(_x.toFixed(2)),
          y: Number(_y.toFixed(2)),
        }
        larvaPos.push( larva )
      }
    }

    return { larvaW, larvaH, larvaPos }
  })()
}


export {
  larvaSetting,
  levelSetting,
}