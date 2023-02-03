import React, { Component } from 'react'
import Product from './Product'
import ProductStore from '../stores/ProductStore'

class VendingMachine extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            tokens: 0
        }

        this.addToken = () => {
            this.state.tokens+=1
        }

        this.buyProduct = (price) => {
           if(this.state.tokens >= price){
                this.state.tokens-=price
           }
        }
    }
    componentDidMount(){
		this.store = new ProductStore()
		this.setState({
			products : this.store.getAll()
		})
	}

    render() {
        return (
            <div>
                { this.state.products.map((e, i) => <Product item={e} key={i} onBuy={this.buyProduct}/>)}
                {/* <div>Tokens: {this.state.tokens}</div> */}
                <button value="add token" onClick={this.addToken}/>
            </div>
        )
    }
}

export default VendingMachine