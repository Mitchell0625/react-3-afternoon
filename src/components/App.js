import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(res => {
      this.setState({ posts: res.data });
    });
  }

  updatePost(id, text) {
    let url = "https://practiceapi.devmountain.com/api/posts";
    axios.put(`${url}?id=${id}`, { text }).then(res => {
      this.setState({ posts: res.data });
    });
  }

  deletePost(id) {
    let url = "https://practiceapi.devmountain.com/api/posts";
    axios.delete(`${url}?id=${id}`).then(res => {
      this.setState({ posts: res.data });
    });
  }

  createPost(text) {
    let url = "https://practiceapi.devmountain.com/api/posts";
    axios.post(url, { text }).then(res => {
      this.setState({ posts: res.data });
    });
  }
  render() {
    const { posts } = this.state;

    let mappedPosts = posts.map((e, i) => {
      return (
        <Post
          key={e.text}
          text={e.text}
          date={e.date}
          id={e.id}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}
        />
      );
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {mappedPosts}
        </section>
      </div>
    );
  }
}

export default App;
