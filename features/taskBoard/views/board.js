import React from 'react';
import Card from './card';
import Mod from './mod';
import TaskList from './taskList';
import TaskListContainer from './taskListContainer';
import Task from './task';
import TaskContainer from './taskContainer';

export default class Board extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		

		return(
				<div className="container taskboard">
					
					<div className="row" style={{marginBottom: '10px'}}>
						<div className="col-md-4">
							<div className="btn-group" role="group" aria-label="Basic example">
							  <Mod />
							  <button type="button" className="btn btn-secondary">btn2</button>
							  <button type="button" className="btn btn-secondary">btn3</button>
							</div>
						</div>
						<div className="col-md-8">
							<div className="btn-group" role="group" aria-label="Basic example">
							  <Mod />
							  <button type="button" className="btn btn-secondary">btn2</button>
							  <button type="button" className="btn btn-secondary">btn3</button>
							</div>
						</div>
					</div>
					<div className="row">
						<TaskListContainer>
							<TaskList />
							<TaskList />
							<TaskList />
						</TaskListContainer>
						<TaskContainer>
							<Task />
							<Task />
							<Task />
						</TaskContainer>
					</div>
				</div>
		)
	}
}