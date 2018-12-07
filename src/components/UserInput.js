import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export class UserInput extends React.Component {
    state = {
        userInput: ''
    }

    onInputChange = (e) => {
        this.setState({
            userInput: e.target.value
        });
    }

    onAdd = () => {
        if (this.state.userInput) {
            this.props.add(this.state.userInput);
        }

        this.setState({
            userInput: ''
        });
    }

    render() {
        return (
            <div>
                <Search
                    style={{ width: "700px" }}
                    placeholder="input Subreddit. e.g. r/javascript"
                    enterButton="Add Subreddit"
                    size="large"
                    onSearch={this.onAdd}
                    onPressEnter={this.onAdd}
                    onChange={this.onInputChange}
                    value={this.state.userInput}
                />
            </div>
        );
    }
}