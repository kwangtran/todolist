import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		}
	}
	onGenerateData = () => {
		console.log('ahihi');
		var tasks = [
			{
				id: this.generateID(),
				name: 'Học lập trình',
				status: true
			},
			{
				id: this.generateID(),
				name: 'Đi chơi',
				status: false
			},
			{
				id: this.generateID(),
				name: 'Ngủ',
				status: true
			},
		]

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			});

		}
	}
	s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	generateID() {
		return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4()
	}
	render() {
		var { tasks } = this.state;
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						{/* Form */}
						<TaskForm />
					</div>
					<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
						<button type="button" className="btn btn-primary">
							<span className="fa fa-plus mr-5" />Thêm Công Việc
			  			</button>
						<button onClick={this.onGenerateData} type="button" className="btn btn-danger">
							<span className="fa fa-plus mr-5" />Generate data
			  			</button>
						<Control />
						<TaskList tasks={tasks} />
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
