import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    // onChangeKeyword = input => e => {
    //     console.log('1')
    //     this.props.onChangeKeyword(e.target.value);
    //     console.log(e.target.value)
    //     this.setState({ [input]: e.target.value });
    // }
    onChangeKeyword = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
        this.props.onChangeKeyword(value);
    }
    onSearchKeyword = () => {
        this.props.onSearchKeyword(this.state.keyword);
    }
    render() {
        var { keyword } = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input value={keyword} name="keyword" onChange={this.onChangeKeyword} type="text" className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button onClick={this.onSearchKeyword} className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5" />Tìm
					 </button>
                    </span>
                </div>
            </div>
        )
    }
}
