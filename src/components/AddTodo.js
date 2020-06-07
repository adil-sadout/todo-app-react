import React, {Component} from 'react';


export class AddTodo extends Component{

    state= {
        title:''
    }

    submitTodo = (e)=>{
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''})
    }

    changeText = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <form style={{display:'flex'}} onSubmit={this.submitTodo}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Add Todo..."
                    style={{ flex:'10', padding:'5px'}}
                    value={this.state.title}
                    onChange={this.changeText}
                />
                <input 
                    type="submit" 
                    value="Submit"
                    className="btn"
                    style={{flex:'1'}}
                />
            </form>
        )
    }
}