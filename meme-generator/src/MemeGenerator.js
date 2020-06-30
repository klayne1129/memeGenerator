import React, {Component} from "react"
import "./style.css"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state ={
            topText: '',
            bottomText: '',
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.genClicked = this.genClicked.bind(this)
    }
    genClicked(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImage: randImg
        })
    }
    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
        
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes[0])
            this.setState({allMemeImgs: memes})
        })
    }
     /**
     * We'll be using an API that provides a bunch of meme images.
     * 
     * Your task:
     * make an API call to "https://api.imgflip.com/get_memes" and save the 
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that comes back is an array)
     */
    


    render() {
        return (
            <div>
            <form className="meme-form">

                <input 
                type="text" 
                name="topText" 
                placeholder="Top Text" 
                value={this.state.topText} 
                onChange={this.handleChange}
                />

                <input 
                type="text" 
                name="bottomText"
                placeholder="Bottom Text" 
                value={this.state.bottomText} 
                onChange={this.handleChange}
                />
                {
                    /**
                     * Create 2 input fields, one for the topText and one for the bottomText
                     * Remember that these will be "controlled forms", so make sure to add
                     * all the attributes you'll need for that to work
                     */
                }    
            
                <button onClick={this.genClicked}>Gen</button>
            </form>

            <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
            </div>
            
        </div>
        )
    }
}

export default MemeGenerator