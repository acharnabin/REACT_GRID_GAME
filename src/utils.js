const findImdexOfID = (array_item, id) => {
  let index = array_item?.findIndex((_item) => parseInt(_item?.id) === id);

  return index;
};

export const checkForMatching = (array_item, player_number) => {
  let win = false;
  console.log(array_item)

  if (array_item?.length > 0) {
    for (let index = 0; index < array_item?.length; index++) {
      let { i, j, item, current_player, id } = array_item[index];
      if (player_number === current_player) {
        let center = parseInt(`${i}${j}`);
        let right = parseInt(`${i}${j + 1}`);
        let left = parseInt(`${i}${j - 1}`);
        let up = parseInt(`${i - 1}${j}`);
        let down = parseInt(`${i + 1}${j}`);

       

        let find_center_index = findImdexOfID(array_item, center);
        let find_right_index = findImdexOfID(array_item, right);
        let find_left_index = findImdexOfID(array_item, left);
        let find_top_index = findImdexOfID(array_item, up);
        let find_bottom_index = findImdexOfID(array_item, down);



        if (
          find_center_index > -1 &&
          find_right_index > -1 &&
          find_left_index > -1
        ) {
          console.log("c", array_item[find_center_index]?.item===array_item[find_right_index]?.item);
          console.log("r", array_item[find_right_index]?.item);
          console.log("l", array_item[find_left_index]?.item);
          if (
            (array_item[find_center_index]?.item ===
              array_item[find_right_index]?.item) ===
            array_item[find_left_index]?.item
          ) {
            win = true;
            break;
          }
        }

        if (
          find_center_index > -1 &&
          find_top_index > -1 &&
          find_bottom_index > -1
        ) {
          if (
            (array_item[find_center_index]?.item ===
              array_item[find_top_index]?.item) ===
            array_item[find_bottom_index]?.item
          ) {
            win = true;
            break;
          }
        }
      }
    }
    // array_item?.map((_item,index)=>{
    //     const {i,j,item,current_player,id}=_item;
    //     if(player_number===current_player){
    //         let center=parseInt(`${i}${j}`);
    //         let right=parseInt(`${i}${j+1}`);
    //         let left=parseInt(`${i}${j-1}`);
    //         let up=parseInt(`${i-1}${j}`);
    //         let down=parseInt(`${i+1}${j}`);

    //         let find_center_index=findImdexOfID(array_item,center);
    //         let find_right_index=findImdexOfID(array_item,right);
    //         let find_left_index=findImdexOfID(array_item,left);
    //         let find_top_index=findImdexOfID(array_item,up);
    //         let find_bottom_index=findImdexOfID(array_item,down);

    //         if(find_center_index>-1 && find_right_index>-1 && find_left_index>-1 ){
    //             if(array_item[find_center_index]?.item===array_item[find_right_index]?.item===array_item[find_left_index]?.item){

    //             }
    //         }

    //         if(find_center_index>-1 && find_top_index>-1 && find_bottom_index>-1 ){

    //         }

    //     }
    // })
  }

  let player = {
    win,
    player_number,
  };

  return player;
};
