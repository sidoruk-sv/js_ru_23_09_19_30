import React from 'react'

export default function accordion(Component) {
  return class AccordeonList extends React.Component {
    state = {
      activeAccordionItemId: null
    }

    render() {
      const { activeAccordionItemId } = this.state
      return <Component {...this.props} {...this.state}
                        toggleActiveAccordionItem = {this.toggleActiveAccordionItem}
                        activeAccordionItemId = { activeAccordionItemId } />
    }

    toggleActiveAccordionItem = id => ev => {
      const isSameItem = id === this.state.activeAccordionItemId;
      this.setState({ activeAccordionItemId: isSameItem ? null : id})
    }

  }
}
