import React, { Component } from 'react';

import { v4 } from 'uuid';


const staticText = "That's what makes you dangerous. It's not the mask, it's not the skills, it's your ideology. The lone man who thinks he can make a difference. I'm glad we could talk. I... I respect your conviction even if it runs counter with my own."

class Home extends Component {

    state = {
        textArray: [],
        inputValue: '',
        currentIndex: 0,
        achievedArray: [],
        failedIndex: -1
    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let splittedArray = staticText.split(" ");
        this.setState({ textArray: splittedArray })
        console.log("splittedArray", splittedArray)
    }

    handleInputChange = (e) => {

        // making sure that current index is not exceeded the limit
        this.state.currentIndex < this.state.textArray.length ?
            this.setState({ inputValue: e.target.value, failedIndex: -1 }, () => {

                // verifying whether the word starts with same letters
                this.state.textArray[this.state.currentIndex].startsWith(this.state.inputValue) && this.state.inputValue.length > 0 ?
                    this.isEqual() : this.handleError();
            })
            : console.log("Length exceeded")
    }

    isEqual() {

        // making the word highlighted
        this.handleActive();

        // checking for exact match , and clearing input field if it matches 
        // then indexing to next word
        if (this.state.textArray[this.state.currentIndex] === this.state.inputValue) {
            this.setState({ inputValue: '', currentIndex: (this.state.currentIndex + 1), failedIndex: -1 })
        }
    }

    handleSpace(e) {
        let char = e.keyCode
        if (char == 32) { e.preventDefault() }
    }

    handleActive() {
        console.log("this.state.handleActive", this.state.inputValue)
        let successArray = [...this.state.achievedArray];
        let arrayIndex = successArray.findIndex((item) => item == this.state.currentIndex);
        arrayIndex < 0 ? successArray.push(this.state.currentIndex) : console.log("")
        this.setState({ achievedArray: successArray })
    }

    handleError() {
        let successArray = [...this.state.achievedArray];
        console.log("successArray", successArray)
        let arrayIndex = successArray.findIndex((item) => item == this.state.currentIndex);
        arrayIndex >= 0 ? successArray.splice(arrayIndex, 1) : console.log("arrayIndex", arrayIndex)
        this.setState({ achievedArray: successArray, failedIndex: this.state.currentIndex }, () => {
            console.log("this.state.handleError", this.state.failedIndex)
        })

    }


    render() {

        return (
            <div className="container" style={{ marginTop: '40px' }}>

                <div className="col-md-12" style={{ fontWeight: '900' }}>
                    {this.state.textArray.map((item, index) =>

                        // checking for the completed words
                        this.state.achievedArray.length > 0 ?

                            // finding the position of completed word
                            this.state.achievedArray.findIndex((item) => item == index) >= 0 ?
                                <span id={v4()} style={{ color: 'green' }}> {item} </span>
                                :

                                // handling the error if its not in completed words group
                                this.state.failedIndex == index ?
                                    <span id={v4()} style={{ background: 'red' }}> {item} </span> :
                                    <span id={v4()} > {item} </span>
                            :
                            // handling the error for initial run
                            this.state.failedIndex == index ?
                                <span id={v4()} style={{ background: 'red' }}> {item} </span> :
                                <span id={v4()}> {item} </span>
                    )}

                </div>


                {this.state.currentIndex < this.state.textArray.length ?
                    // checking for the current index value is not exceeding the limit
                    <div className="col-md-12" style={{ marginTop: '40px' }}>
                        <input className={this.state.failedIndex >= 0 ? "error" : ''} value={this.state.inputValue} onKeyDown={this.handleSpace} onChange={this.handleInputChange} placeholder="Enter value" />
                    </div>
                    :
                    <div className="col-md-12" style={{ marginTop: '40px' }}>
                        <p> Congrats your game is completed </p>
                    </div>
                }


            </div >
        )
    }

}



export default Home;
