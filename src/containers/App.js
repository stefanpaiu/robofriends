import React, {useState, useEffect, Component} from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

// The state I need to listen to and send down to props.
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// What props I should listen to that are actions and need to be dispatched.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => {
      dispatch(setSearchField(event.target.value))
    },
    onRequestRobots: () => {
      requestRobots(dispatch)
    }
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  // With Hooks
  // const [robots, setRobots] = useState([]);
  // const [searchfield, setSearchfield] = useState('')
  // With Redux

  render() {
    const {searchField, onSearchChange, robots, isPending} = this.props;
// With Hooks
    //useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((users) => {
    //     setRobots(users);
    //   });

    // }, [])


    // Sets the state - changes
    // const onSearchChange = (event) => {
    //   setSearchfield(event.target.value);
    // };

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ? (
        <h1>Loading</h1>
    ) : (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
