import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import { Colors, Fonts, Images } from '../resources';
import CardView from 'react-native-cardview'
export default class BackgroundButton extends React.Component {
  render() {

    return (

      <CardView style={{
        flexWrap: 'wrap',
        flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: Colors.light_grayish_cyan, elevation: 3, margin: 8, borderRadius: 3
      }}
        cardElevation={1}

        cardMaxElevation={1}
        cornerRadius={6}>
        <TouchableOpacity disabled={this.props.search} onPress={this.props.onPress}>
          <Text style={{ fontFamily: Fonts.SpartanBold, fontSize: 14, color: Colors.primary, padding: 6 }}>{this.props.title}</Text>
        </TouchableOpacity>
        { this.props.search && <TouchableOpacity
          style={{
            backgroundColor: Colors.primary, width: 25, borderRadius: 3, alignItems: 'center', justifyContent: 'center'
          }}
          onPress={this.props.onRemove}>

          <Image source={require('../assets/images/close.png')}
            resizeMode={'contain'}
            style={{ width: 12, height: 12, alignSelf: 'center', justifyContent: 'center' }} />

        </TouchableOpacity>}
      </CardView>

    )
  }

}