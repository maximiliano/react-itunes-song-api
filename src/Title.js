import React from 'react';


class Title extends React.Component {
    render() {
        if (this.props.title.length === 0) {
            return null
        }

        return (
            <div>
                <h1>{this.props.title}</h1>
                <hr />
            </div>
        )
    }
}

export default Title;
