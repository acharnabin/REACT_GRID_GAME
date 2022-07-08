import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import DropDown from '../../component/DropDown';
import normalize from '../../dimen/normalize';
import {IMAGE} from '../../theme/Theme';

const Practice = props => {
  const [index, setIndex] = useState(0);
  const isCarousel = React.useRef(null);
  const [item, setItem] = useState(false);
  const [Select, setSelect] = useState();
  var [indexNo, setIndexNo] = useState([]);
  const [selected, setSelected] = useState([]);

  const category = [
    {id: '1', itemName: 'Samsung'},
    {id: '2', itemName: 'Nokia'},
    {id: '3', itemName: 'Apple'},
    {id: '4', itemName: 'Redmi '},
    {id: '5', itemName: 'Realmi'},
    {id: '6', itemName: 'Oppo'},
  ];
  // const [index, setIndex] = useState([]);
  // const Item = [
  //   {
  //     id: '01',
  //     Text1: 'NULLA PALESTINE',
  //   },
  //   {
  //     id: '02',
  //     Text1: 'NULLA PALESTINE',
  //   },
  //   {
  //     id: '03',
  //     Text1: 'NULLA PALESTINE',
  //   },

  //   {
  //     id: '04',
  //     Text1: 'NULLA PALESTINE',
  //   },
  // ];
  // const Style = ({item}) => {
  //   const {id} = item;
  //   const Select = index.filter(a => a == id).length > 0;
  //   return (
  //     <TouchableOpacity
  //       style={{alignItems: 'center', height: 30}}
  //       onPress={() => {
  //         if (Select) {
  //           setIndex(pre => pre.filter(b => b !== id));
  //         } else {
  //           setIndex(pre => [...pre, id]);
  //         }
  //       }}>
  //       <Text style={{color: Select ? 'red' : 'blue'}}> {item.Text1} </Text>
  //     </TouchableOpacity>
  //   );
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (index == arr.length - 1) {
  //       setIndex(-1);
  //       ref = {isCarousel};
  //     } else {
  //       setIndex(index + 1);
  //       ref = {isCarousel};
  //     }
  //   }, 500);
  // }, [index]);
  //console.log(index);
  const arr = [
    {Image: IMAGE.Carousel_Image1},
    {Image: IMAGE.Carousel_Image2},
    {Image: IMAGE.Carousel_Image3},
  ];
  // const {id} = item;
  // const isSelected = indexNo.filter(a => a == id).length > 0;
  // const render = ({item}) => {
  //   return;
  //   <Text>{item.itemName}</Text>;
  // };
  renderItem = ({item, index}) => {
    //const isSelected = indexNo.filter(a => a == id).length > 0;
    return (
      <View>
        <View
          style={{
            // height: normalize(400),
            // width: normalize(500),
            // backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={item.Image} resizeMode="contain"></Image>
        </View>
      </View>
    );
  };

  const handleMultiSelect = (index, item) => {
    let checkIndex = indexNo.includes(index);

    let checkItemIndex= selected.includes(item);
    

    if (checkIndex) {
      let findIndex = indexNo.findIndex((item, i) => i == index);
      let temp = indexNo;
      temp.splice(findIndex, 1);
      setIndexNo(temp);

    } else {
    
      setIndexNo([...indexNo, index]);
      
    }


    if (checkItemIndex) {

        //
        let Indexfind = selected.findIndex((_item, i) => _item == item);
        let tmp = selected;
        tmp.splice(Indexfind, 1);
        setSelected(tmp);
      } else {
        setSelected([...selected, item]);
      
      }
  };
  const render = ({item}) => {
    return (
      <SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleMultiSelect(index, item)}>
            <Text style={{color: 'yellow'}}>{item.itemName}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView>
      {/* <FlatList data={Item} renderItem={Style} />
      <Text>Practice</Text> */}
      <View>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={arr}
          renderItem={renderItem}
          sliderWidth={390}
          itemWidth={350}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={index => setIndex(index)}
          autoplay={true}
          enableSnap={true}
          loop={true}
        />
        <View
          style={{
            position: 'absolute',
            bottom: normalize(0),
            left: normalize(110),
          }}>
          <Pagination
            dotsLength={arr.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
            autoPlay={true}
          />
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#999999',
          height: 50,
          width: '90%',
          marginHorizontal: normalize(15),
          marginVertical: normalize(15),
          justifyContent: 'space-between',
          borderRadius: normalize(10),
        }}> */}
      {/ <FlatList data={category} renderItem={render} /> /}
      {/* <View></View>
        <Text>
          {selected.length === 0
            ? 'Please Select'
            : selected.map(item => item.itemName)}
        </Text>
        <TouchableOpacity onPress={() => setItem(!item)}>
          <Image
            resizeMode="contain"
            style={{
              height: normalize(20),
              width: normalize(20),
              right: normalize(6),
            }}
            source={IMAGE.Down_Arrow}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        {item
          ? category.map((item, index) => (
              <TouchableOpacity
                style={{
                  height: normalize(35),
                  width: normalize(300),
                  backgroundColor: '#999999',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: normalize(10),
                  marginVertical: normalize(5),
                }}
                onPress={() => handleMultiSelect(index, item)}>
                <Text
                  style={{color: indexNo.includes(index) ? 'yellow' : 'red'}}>
                  {item.itemName}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </View> */}
      <DropDown
        backgroundColor={'#999999'}
        height={normalize(40)}
        width={'90%'}
        marginHorizontal={normalize(15)}
        marginVertical={normalize(15)}
        justifyContent={'space-between'}
        borderRadius={normalize(10)}
        imgheight={normalize(15)}
        imgwidth={normalize(15)}
        source={IMAGE.Down_Arrow}
        data={category}
        renderItem={render}
        txt={
          selected.length === 0
            ? 'Please Select'
            : selected.map(item => item.itemName)
        }
        txtColor={'red'}
      />
    </SafeAreaView>
  );
};
export default Practice;
