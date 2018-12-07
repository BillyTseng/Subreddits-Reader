import React from 'react';

export class PostItem extends React.Component {


    render() {

        return (
            <div>
                <a
                    href={`https://www.reddit.com${this.props.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="post-text">{this.props.title}</p>
                </a>
            </div>
        );
    }
}