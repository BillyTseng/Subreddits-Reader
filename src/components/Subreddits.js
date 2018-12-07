import React from 'react';
import { Tabs } from 'antd';
import {UserInput} from "./UserInput"
import {PostList} from "./PostList"

const TabPane = Tabs.TabPane;

export class Subreddits extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'r/news', content: <PostList name='r/news'/>, key: '1', closable: false },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem("tabs"));
        const panes = this.state.panes;
        for (let title of items) {
            if (title !== "r/news") {
                panes.push({
                    title,
                    content: <PostList name={title}/>,
                    key: `newTab${this.newTabIndex++}`,
                    closable: true
                });
            }
        }
        this.setState({panes});
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    updateLocalStorage = (panes) => {
        const object = [];
        for (let item of panes) {
            object.push(item.title);
        }
        // console.log(JSON.stringify(object));
        localStorage.setItem("tabs", JSON.stringify(object));
    }

    add = (subredditsName) => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({title: subredditsName, content: <PostList name={subredditsName}/>, key: activeKey, closable: true});
        this.setState({ panes, activeKey });
        this.updateLocalStorage(panes);
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
        this.updateLocalStorage(panes);
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <UserInput add={this.add}/>
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.state.panes.map(pane =>
                        <TabPane
                            tab={pane.title}
                            key={pane.key}
                            closable={pane.closable}
                        >
                            {pane.content}
                        </TabPane>)
                    }
                </Tabs>
            </div>
        );
    }
}