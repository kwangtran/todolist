import React, { Component } from 'react'
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="row mt-15">
                <Search onChangeKeyword={this.props.onChangeKeyword}  onSearchKeyword={this.props.onSearchKeyword}/>
                <Sort />
            </div>
        )
    }
}
