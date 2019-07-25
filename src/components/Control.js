import React, { Component } from 'react'
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search onChangeKeyword={this.props.onChangeKeyword} onSearchKeyword={this.props.onSearchKeyword} />
                <Sort
                    onSort={this.props.onSort}
                    sortBy={this.props.sortBy}
                    sortValue={this.props.sortValue}
                />
            </div>
        )
    }
}
