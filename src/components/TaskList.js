import React, { Component } from 'react'
import TaskItem from './TaskItem';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name, value)
        this.setState({
            [name]: value
        })
        this.props.handleChange(
            name === 'filterName' ? value : this.state.filterName,
            name === 'fitlerStatus' ? value : this.state.filterStatus,
        )
    }
    render() {
        var { tasks } = this.props;
        var { filterName, filterStatus } = this.state;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={index}
                task={task}
                index={index}
                onChangeStatus={this.props.onChangeStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        })
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover mt-40">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input
                                        onChange={(event) => this.handleChange(event)}
                                        value={filterName}
                                        name="filterName"
                                        type="text"
                                        className="form-control" />
                                </td>
                                <td>
                                    <select
                                        onChange={(event) => this.handleChange(event)}
                                        name="fitlerStatus"
                                        className="form-control">
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
