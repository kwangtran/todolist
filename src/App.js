import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import tasks from './mocks/data'
import { generateID } from './helpers/IDHelper'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			filter: {
				name: '',
				status: -1
			},
			keyword: '',
			sortBy: 'name',
			sortValue: 1
		}
	}
	componentDidMount() {
		if (!localStorage.getItem('tasks')) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		// this.setState({
		// 	tasks: JSON.parse(localStorage.getItem('tasks'))
		// });
		this.setState((state, props) => {
			return {
				tasks: JSON.parse(localStorage.getItem('tasks'))
			}
		});

	}
	componentWillMount() {
	}
	onToggleForm = () => {
		//Dang sua roi an them
		if (this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null
			});
		} else {
			//An them ngay tu dau
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditing: null
			});
		}

	}
	onCloseForm = () => {
		this.setState((state, props) => (
			{ isDisplayForm: false }
		));
	}
	onShowForm = () => {
		this.setState((state, props) => (
			{ isDisplayForm: true }
		));
	}
	onSubmit = (data) => {
		var { tasks } = this.state;
		if (data.id === null) {
			data.id = generateID();
			tasks.push(data);
		} else {
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks: tasks,
			taskEditing: null
		});
		localStorage.setItem('tasks', JSON.stringify(tasks))

	}
	onDelete = (id) => {
		var index = this.findIndex(id);
		var { tasks } = this.state;
		if (index !== -1) {
			tasks.splice(index, 1);
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.onCloseForm();
	}
	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		// this.setState({
		// 	taskEditing: tasks[index]
		// });
		// console.log(this.state.taskEditing);

		var taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing
		});
		this.onShowForm();
	}

	onChangeStatus = (id) => {
		var index = this.findIndex(id);
		var { tasks } = this.state;
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	}
	onChangeKeyword = (keyword) => {
		this.setState({
			keyword: this.state.keyword
		});
	}
	findIndex(id) {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		});
		return result;
	}
	handleChange = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus, 10);
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		});
	}
	onSearchKeyword = (keyword) => {
		this.setState((state, props) => { return { keyword: keyword } })
	}
	onSort = (sortBy, sortValue) => {
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		})
		// console.log(this.state.sortBy, this.state.sortValue);
	}
	render() {
		var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;
		if (filter) {
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1
				})
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) {
					return task;
				}
				else {
					return task.status === (filter.status === 1 ? true : false)
				}
			})
		}
		console.log(sortBy, sortValue)
		if (keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
			})
		}

		if (sortBy === 'name') {
			tasks.sort((a, b) => {
				if (a.name > b.name) return sortValue;
				else if (a.name < b.name) return -sortValue;
				else return 0;
			})
		}
		else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sortValue;
				else if (a.status < b.status) return sortValue;
				else return 0;
			})
		}
		var elmTaskForm = isDisplayForm ?
			<TaskForm
				onCloseForm={this.onCloseForm}
				onSubmit={this.onSubmit}
				task={taskEditing}
			/> : null;
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
						{/* <TaskForm /> */}
						{elmTaskForm}
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={this.onToggleForm}
						>
							<span className="fa fa-plus mr-5" />Thêm Công Việc
			  			</button>
						<button onClick={this.onGenerateData} type="button" className="btn btn-danger">
							<span className="fa fa-plus mr-5" />Generate data
			  			</button>
						<Control
							sortBy={sortBy}
							sortValue={sortValue}
							onChangeKeyword={this.onChangeKeyword}
							onSearchKeyword={this.onSearchKeyword}
							onSort={this.onSort}
						/>
						<TaskList
							tasks={tasks}
							onChangeStatus={this.onChangeStatus}
							onDelete={this.onDelete}
							onUpdate={this.onUpdate}
							handleChange={this.handleChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// function App() {
// 	return (
// 		<div className="container">
// 			<div className="text-center">
// 				<h1>Quản Lý Công Việc</h1>
// 				<hr />
// 			</div>
// 			<div className="row">
// 				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
// 					{/* Form */}
// 					<TaskForm />
// 				</div>
// 				<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
// 					<button type="button" className="btn btn-primary">
// 						<span className="fa fa-plus mr-5" />Thêm Công Việc
// 		  </button>
// 					<Control />
// 					<TaskList />
// 				</div>
// 			</div>
// 		</div>

// 	);
// }

// export default App;
