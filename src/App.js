import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			stringValue: '',
			regexValue: '',
			matched: []
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

	getAllMatches(text, regex) {
		let clearRegex = new RegExp(regex, 'g');

		if (clearRegex.constructor !== RegExp) {
			throw new Error('not RegExp');
		}

		let resArray = [];
		let match = null;

		if (clearRegex.global) {
			while ((match = clearRegex.exec(text)) !== null) {
				resArray.push(match);
			}
		}

		return resArray;
	}

	handleSubmit(e) {
		e.preventDefault();

		let string = this.state.stringValue;
		let reg = this.state.regexValue;
		let self = this;
		let resItems = this.state.matched;

		if (!string && !reg) return;

		let res = this.getAllMatches(string, reg);
		
		res.forEach((item) => {
			console.log(item);
			
			resItems.push(item)
			self.setState({
				matched: resItems
			});
		});
	}

	render() {
		let matchedItems = this.state.matched.map((item, index) => {
			return item.map((list, index) => {
				return <div key={index}>
						<span>Group {index + 1}.</span> <span>{item[0]} : </span><mark>{list}</mark>
					</div>
			});
		});

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<main>
					<form className="App-form" onSubmit={this.handleSubmit}>
						<div className="input-wrap">
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
						</div>
						<div className="result"><strong>Found:</strong>{matchedItems}</div>
					</form>
				</main>
			</div>
		);
	}
}

export default App;
