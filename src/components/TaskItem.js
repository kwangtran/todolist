import React, { Component } from 'react'

export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }
    onChangeStatus = () => {
        this.props.onChangeStatus(this.props.task.id)
    }
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center" onClick={this.onChangeStatus}>
                    <span className={task.status === true ? 'label label-success' : 'label label-danger'}>
                        {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={this.onUpdate} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>&nbsp;
                 <button onClick={this.onDelete} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5" />Xóa
                </button>
                </td>
            </tr>
        )
    }
}
