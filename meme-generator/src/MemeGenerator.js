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