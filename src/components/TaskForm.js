import React, { Component } from 'react'

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            status: false
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = JSON.parse(value)
        }
        this.setState({
            [name]: value
        });
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        //Cancel and close form
        this.onClear()
        this.onCloseForm();
    }
    onClear = () => {
        this.setState((state, props) => ({
            name: '',
            status: false
        }));
    }
    componentWillMount() {
        console.log('COmponent will mount');
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            });
        } else if (!nextProps.task) {
            console.log('vao day');
            this.setState({
                id: null,
                name: '',
                status: false
            });
        }
    }
    render() {
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== null ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                        <span style={{ float: "right" }} onClick={this.onCloseForm} className="fa fa-times-circle"></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{id !== null ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                     <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
