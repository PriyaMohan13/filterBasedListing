
import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';

import { Colors, Fonts, Images } from '../resources';

import SplashScreenInit from 'react-native-splash-screen';
import CardView from 'react-native-cardview'
import data from '../utils/data.json'
import TagsView from '../component/TagsView'

const Listing = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [candidateList, setCandidateList] = useState([]);

  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    initial()
  }, [])

  const initial = async () => {
    SplashScreenInit.hide();

    setTimeout(() => {
      setCandidateList(data)
      setIsLoading(false)
    }, 500);
  }

  const onSelectFilter = (item, options) => {
    let selectedFl = [...filterList]
    let alreadyFind = selectedFl.find(obj => obj == item)
    if (alreadyFind == undefined) {
      selectedFl.push(item)
    }
    setFilterList(selectedFl)

    let candidateListFl = []

    data.map(function (value) {
      const options = [...value.languages, ...value.tools]
      let status = selectedFl.every((a1) => options.includes(a1))
      if (status) {
        candidateListFl.push(value)
      }
    })
    setCandidateList(candidateListFl)

  }

  const onRemoveFilter = (item) => {
    let removeFl = [...filterList]
    let removedData = removeFl.filter(obj => obj != item)

    setFilterList(removedData)

    let candidateListFl = []

    data.map(function (value) {
      const options = [...value.languages, ...value.tools]
      let status = removedData.every((a1) => options.includes(a1))
      if (status) {
        candidateListFl.push(value)
      }
    })
    setCandidateList(candidateListFl)
  }

  const onClearFilter = () => {
    setFilterList([])
    setCandidateList(data)
  }

  const getImage = (image) => {

    switch (image) {
      case "photosnap":
        return require("../assets/images/photosnap.png")
        break;
      case "manage":
        return require("../assets/images/manage.png")
        break;
      case "account":
        return require("../assets/images/account.png")
        break;
      case "myhome":
        return require("../assets/images/myhome.png")
        break;
      case "loop-studios":
        return require("../assets/images/loop-studios.png")
        break;
      case "faceit":
        return require("../assets/images/faceit.png")
        break;
      case "shortly":
        return require("../assets/images/shortly.png")
        break;
      case "insure":
        return require("../assets/images/insure.png")
        break;
      case "eyecam-co":
        return require("../assets/images/eyecam-co.png")
        break;
      case "the-air-filter-company":
        return require("../assets/images/the-air-filter-company.png")
        break;
      default:
        return require("../assets/images/photosnap.png")
        break;
    }
  }

  const ListEmpty = () => {
    if (!isLoading && candidateList.length == 0) {
      return (
        //View to show when list is empty
        <View
          style={styles.flatCon}>
          <View style={styles.emptyCon}>
            <Text
              numberOfLines={2}
              style={styles.emptyTxt}>
              {'No data found'}
            </Text>
          </View>
        </View>
      );
    } else if (isLoading) {
      return (
        //View to show when list is empty
        <View style={styles.flatCon}>
          <View style={styles.emptyCon}>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainCon}>
      <View style={styles.subCon}>

        <Images.bgHeader />
        <View style={[styles.subCon, { backgroundColor: Colors.light_grayish_cyan }]}>


          {filterList.length > 0 && <CardView cardElevation={2}

            cardMaxElevation={2}
            cornerRadius={6}
            style={styles.searchCon}>


            <TagsView
              style={styles.searchTagCon}
              all={filterList}
              selected={filterList}
              search={true}
              isExclusive={false}
              onRemove={(tag) => onRemoveFilter(tag)}

            />
            <TouchableOpacity style={styles.clearCon}
              onPress={() => onClearFilter()}>

              <Text style={[styles.subTxt, { textAlign: 'center' }]}>{'Clear'}</Text>
            </TouchableOpacity>

          </CardView>
          }


          <FlatList
            data={candidateList}
            style={styles.flatCon}
            ListEmptyComponent={ListEmpty()}
            contentContainerStyle={[
              styles.flatContainerCon,
              { flexGrow: candidateList.length == 0 ? 1 : 0 },
            ]}
            renderItem={({ item, index }) => {

              const options = [...item.languages, ...item.tools]


              return (
                <View style={styles.cardCon}>
                  <CardView style={
                    styles.cardSubCon
                  }

                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={6}>
                    <View style={[
                      styles.cardInsideCon, {
                        borderStartWidth: item.featured ? 4 : 0, borderRadius: 6
                      }]}>
                      <View style={styles.txtCon}>
                        <View style={styles.txtSubCon}>
                          <View style={{ width: item.new && item.featured ? '40%' : item.featured ? '50%' : item.new ? '50%' : '100%', justifyContent: 'flex-start', alignSelf: 'center' }}>
                            <Text numberOfLines={1} style={styles.compTxt}>{item.company}</Text>

                          </View>
                          {item.new && <View style={styles.newCon}>
                            <Text style={styles.labelTxt}>{' NEW! '}</Text>

                          </View>}

                          {item.featured &&
                            <View style={styles.featuredCon}>
                              <Text style={styles.labelTxt}>{' FEATURED '}</Text>

                            </View>}

                        </View>
                        <Text style={styles.titleTxt}>{item.position}</Text>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 8 }}>
                          <Text numberOfLines={1} style={[styles.subTxt, { marginEnd: 5 }]}>{item.postedAt + '  '}
                            <Images.circle width={5} height={5} style={styles.subTxtCon} />
                            {'  ' + item.contract + '  '}
                            <Images.circle width={5} height={5} style={styles.subTxtCon} />

                            <Text style={[styles.subTxt, { marginStart: 5 }]}>{'  ' + item.location}</Text></Text>
                        </View>
                      </View>

                      <View style={styles.divider} />

                      <View style={styles.optionCon}>
                        <TagsView
                          style={styles.tagCon}
                          all={options}
                          selected={options}
                          search={false}
                          isExclusive={false}
                          onClick={(tag) => onSelectFilter(tag, options)}

                        />

                      </View>
                    </View>
                  </CardView>

                  <View style={styles.logoCon}>

                    <Image source={getImage(item.logo)} style={styles.logoSizeCon} />
                  </View>



                </View>

              )
            }} />

        </View>

        {isLoading ? (
          <View
            style={styles.loaderCon}>
            <ActivityIndicator
              size={25}
              color={Colors.primary}
              backgroundColor={'transparent'}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({

  mainCon: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  subCon: {
    flex: 1,
  },
  flatCon: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.light_grayish_cyan_lite,

  },
  flatContainerCon: {
    justifyContent: 'flex-start',
    paddingTop: 10,

  },
  emptyCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTxt: {
    color: Colors.dark_grayish_cyan_lite,
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  loaderCon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardCon: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 25
  },
  subTxt: {
    fontFamily: Fonts.SpartanMedium,
    fontSize: 13,
    color: Colors.dark_grayish_cyan_lite
  },
  searchCon: {
    width: '92%',
    marginTop: -20,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
    backgroundColor: Colors.light
  },
  clearCon: {
    width: '21%',
    marginEnd: '2%',
    alignSelf: 'center'
  },
  logoCon: {
    position: 'absolute',
    marginTop: -25,
    marginStart: 40,
    width: 50, height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark_grayish_cyan_lite,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoSizeCon: {
    width: 50,
    height: 50
  },
  divider: {
    flex: 1,
    width: '92%',
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: 25
  },
  optionCon: {
    flex: 1,
    width: '92%',
    marginTop: 5,
    marginBottom: 5
  },
  tagCon: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  cardSubCon: {
    width: '92%',
    flexDirection: 'column',
    backgroundColor: Colors.light,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.primary
  },
  cardInsideCon: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.light,
    borderRadius: 6,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderStartWidth: 4
  },
  subTxtCon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 3
  },
  featuredCon: {
    width: '30%',
    padding: 5,
    borderRadius: 15,
    marginStart: 8,
    justifyContent: 'center',
    backgroundColor: Colors.dark_grayish_cyan
  },
  newCon: {
    width: '20%',
    padding: 5,
    borderRadius: 15,
    marginStart: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  txtCon: {
    flex: 1,
    width: '92%',
    marginTop: 35
  },
  txtSubCon: {
    width: '100%',
    flexDirection: 'row'
  },
  titleTxt: {
    fontFamily: Fonts.SpartanBold,
    fontSize: 15,
    color: Colors.dark_grayish_cyan,
    marginTop: 8
  },
  labelTxt: {
    fontFamily: Fonts.SpartanBold,
    fontSize: 12,
    color: Colors.light_grayish_cyan_lite,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center'
  },
  compTxt: {
    fontFamily: Fonts.SpartanBold,
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'left'
  },
  searchTagCon: {
    width: '75%',
    alignSelf: 'center',
    margin: '2%'
  }


});

export default Listing;