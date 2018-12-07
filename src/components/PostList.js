import React from 'react';
import $ from 'jquery';
import {PostItem} from "./PostItem"

export class PostList extends React.Component {
    state = {
        children: [],
        error: ''
    }

    componentWillMount() {
        this.parsePosts();
    }

    parsePosts = () => {
        $.ajax({
            url: `https://www.reddit.com/${this.props.name}.json`,
            method: 'GET',
        }).then(
            (response) => {
                // console.log(response);
                if (response.data) {
                    this.setState({
                        children: response.data.children,
                        error: ''
                    });
                } else {
                    this.setState({
                        error: `No such data`
                    });
                }

            },
            (response) => {
                const {message, error} = response.responseJSON;
                this.setState({
                    error: `${error} ${message}`
                });
            }
        )
    }

    render() {
        return (
            <div className="post-list">
                {
                    this.state.error ?
                        <p style={ {color: 'red'} }>Error: {this.state.error}</p> :
                        this.state.children.map(({data}, index) => (
                                <PostItem
                                    title={data.title}
                                    permalink={data.permalink}
                                    key={index}
                                />
                            )
                        )
                }
            </div>
        );
    }
}