import React, { Component } from 'react'

class Product extends Component {
    render(){
        const {item, onBuy} = this.props

        const buyProduct = () => {
            onBuy(item.price)
        }

        return(
            <div>
                <button id="buy" value="buy" onClick={buyProduct}></button>
                Name: {item.name}, price: {item.price}
            </div>
        )
    }
}

export default Product