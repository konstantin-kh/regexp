import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			stringValue: '',
			regexValue: '',
			matched: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputRegex = this.handleInputRegex.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		this.setState({
			stringValue: value
		});
	}

	handleInputRegex(e) {
		const target = e.target;
		const value = target.value;
		this.setState({
			regexValue: value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		let string = this.state.stringValue;
		let reg = this.state.regexValue;
		let found = RegExp(reg);
		let res = found.test(string);


		console.log(string);
		console.log(reg);
		console.log(res);

		// let found = string.match(reg);

		if (res === false || !(string && reg)) {
			this.setState({
				matched: 'not matches'
			})
		} else {
			this.setState({
				matched: 'true'
			})
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<main>
					<form className="App-form" onSubmit={this.handleSubmit}>
						< input type = "text"
							placeholder = "string"
							value = {this.state.stringValue}
							onChange = {this.handleInputChange}
						/>
						< input type = "text"
							placeholder = "regex"
							value = {this.state.regexValue}
							onChange = {this.handleInputRegex}
						/>
						<button type="submit">Match</button>
						<div className="result">Found: {this.state.matched}</div>
					</form>
				</main>
			</div>
		);
	}
}

export default App;
