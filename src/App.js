import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

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
  render() {
    const { activeIndex } = this.props;

    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.props.onTabSelect(index)
      });
    });
    return <div>{children}</div>;
  }
}

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      console.log(child);
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onTabSelect: this.selectTabIndex
      });
    });
    return <div>{children}</div>;
  }
}

class TabPanels extends Component {
  render() {
    const { activeIndex } = this.props;

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
        <TabList>{data.map(tab => <Tab>{tab.label}</Tab>)}</TabList>
        <TabPanels>
          {data.map(tab => <TabPanel>{tab.content}</TabPanel>)}
        </TabPanels>
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
 
    return <div className="App">
      <DataTabs data={tabData} />
    </div>;
  }
}

export default App;
