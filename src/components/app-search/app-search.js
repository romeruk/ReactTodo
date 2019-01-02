import React, {Component} from 'react';
import './app-search.css';

export default class AppSearch extends Component {

    state = {
        search: ''
    };

    onSearchChange = (e) => {

        this.setState({
          term: e.target.value
        });

        this.props.searchFilter(e.target.value);
    }

    render() {
        return (
          <input type="text"
                 className="form-control search-input"
                 placeholder="type to search"
                 value={this.state.term}
                 onChange={ this.onSearchChange} />
        );
      };
};
