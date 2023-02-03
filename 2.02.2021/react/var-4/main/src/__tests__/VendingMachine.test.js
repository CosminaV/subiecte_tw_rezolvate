import React from 'react'
import ReactDOM from 'react-dom'
import VendingMachine from '../components/VendingMachine'
import Product from '../components/Product'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it ('state is loaded when component mounts', () => {
	const component = mount(<VendingMachine />)
	expect(component.state().products.length).toEqual(3)	
})

it ('renders a list of products with buy buttons', () => {
	const component = mount(<VendingMachine />)
	let product = component.find(Product).first()
	let button = product.find('[value="buy"]').first()
	expect(button.length).toEqual(1)	
})

it ('pressing add tokens shoud increase the number of tokens', () => {
	const component = mount(<VendingMachine />)
	let button = component.find('[value="add token"]').first()
	button.simulate("click")
	expect(component.state().tokens).toEqual(1)	
})

it ('buy a product shoud decrease tokens', () => {
	const component = mount(<VendingMachine />)
	
	let button = component.find('[value="add token"]').first()
	button.simulate("click")
	button.simulate("click")
	button.simulate("click")
	button.simulate("click")
	button.simulate("click")
	expect(component.state().tokens).toEqual(5)	

	let product = component.find(Product).first()
	let buyButton = product.find('[value="buy"]').first()
	buyButton.simulate("click")
	expect(component.state().tokens).toEqual(2)	
})




