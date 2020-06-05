import * as React from "react";
//import * as axios from 'axios';

interface IProp {
  title:string,
  description: string,
}

interface IState {
  career: IProp[]
}

class Career extends React.Component<{},IState>{
  constructor() {
    super({});
    this.state = {
      career: []
    }
  }

  callAPI() {
    fetch("http://localhost:5000/career")
      .then(res => res.json())
      //.then(res => console.log(res))
      .then(res => this.setState({career:res}));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    //const career = this.state;
    return (
      <ul>
        {this.state.career.map(function(career,index) {
          return (
            <div key={index}>
              <h1>{career.title} </h1>
              <p> {career.description} </p>
            </div>
          );
        }
        )}
      </ul>
    );
  }
}

export default Career;
