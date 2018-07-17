import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types'

class Tab extends Component {
  render() {
    return (
      <div
        className={this.props.isActive ? "active" : "notactive"}
        onClick={this.props.onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabList extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabSelect: PropTypes.func.isRequired
  }


  render() {
    const { activeIndex } = this.context;

    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.context.onTabSelect(index)
      });
    });
    return <div>{children}</div>;
  }
}

class Tabs extends Component {  
  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabSelect: PropTypes.func.isRequired
  }

  state = {
    activeIndex: 0
  };

  //called every render
  getChildContext(){
    return {
      activeIndex: this.state.activeIndex,
      onTabSelect: this.selectTabIndex
    }
  }

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    // const children = React.Children.map(this.props.children, (child, index) => {
    //   console.log(child);
    //   return React.cloneElement(child, {
    //     activeIndex: this.state.activeIndex,
    //     onTabSelect: this.selectTabIndex
    //   });
    // });
    return <div>{this.props.children}</div>;
  }
}

class TabPanels extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  }

  render() {
    const { activeIndex } = this.context;

    return this.props.children[activeIndex];
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children;
  }
}

class DataTabs extends Component {
  render() {
    const { data } = this.props;

    return (
      <Tabs>
        <div>
          <TabList>{data.map(tab => <Tab>{tab.label}</Tab>)}</TabList>
        </div>
       <div>
          <TabPanels>
            {data.map(tab => <TabPanel>{tab.content}</TabPanel>)}
          </TabPanels>
       </div>
      </Tabs>
    );
  }
}

class App extends Component {
  render() {
    const tabData = [
      { label: 1, content: "hello" },
      { label: 2, content: "world" },
      { label: 3, content: "foo" }
    ];

    return (
      <div className="App">
        <p>FooBar</p>
        <DataTabs data={tabData} />
      </div>
    );
  }
}

export default App;
