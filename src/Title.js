import React from 'react';


class Title extends React.Component {
    render() {
        if (this.props.title.length === 0) {
            return null
        }

        return (
            <div>
                <p className="title">{this.props.title}</p>
            </div>
        )
    }
}

export default Title;
