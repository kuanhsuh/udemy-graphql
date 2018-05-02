import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li
            key={id}
            className="collection-item"
            onClick={()=>this.onLike(id, likes)}
            >
            {content}
            <div className="vote-box">
                <i className="material-icons">thumb_up</i>
                {likes}
            </div>
          </li>
      )
    })
  }
  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)