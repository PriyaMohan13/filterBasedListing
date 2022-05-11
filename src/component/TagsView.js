import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import BackgroundButton from './BackgroundButton'

export default class TagsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected,
      search: props.search

    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.makeButtons()}
      </View>
    )
  }

  onRemove = (tag) => {
    this.props.onRemove(tag)
  }
  onPress = (tag) => {
    this.props.onClick(tag)
  }

  makeButtons() {
    return this.props.all.map((tag, i) => {
      const on = this.state.selected.includes(tag)
      const backgroundColor = on ? 'red' : 'blue'
      const textColor = on ? 'blue' : 'red'
      const borderColor = on ? 'green' : 'wheat'
      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          search={this.state.search}
          textColor={textColor}
          borderColor={borderColor}
          onRemove={() => {
            this.onRemove(tag)
          }}
          onPress={() => {
            this.onPress(tag)
          }}
          key={i}
          showImage={on}
          title={tag} />
      )
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})