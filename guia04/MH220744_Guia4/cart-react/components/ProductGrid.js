'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product-grid.css';
const products = [
 {
 id: 1,
 title: 'Cien años de soledad',
 price: 100,
 image: 'https://images.penguinrandomhouse.com/cover/9780525562443',
 quantity: 1
 },
 {
    id: 2,
    title: 'El señor de los anillos (Trilogía)',
    price: 190,
    image:
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzr39cargk6qYla4frWiAJa51p7tGksoIzTA&s',
    quantity: 1
    },
    {
    id: 3,
    title: 'Cuentos de Barro',
    price: 30,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDl7tSJQ_rtKfoRJgvxsuuitoyLAnYh_lb8f1ZL8fUIRXZEndq1A7wBQIMJHd6nHz9w1E&usqp=CAU',
    quantity: 1
    },
    {
    id: 4,
    title: 'Tierra de Infancia',
    price: 30,
    image: 'https://assets.isu.pub/document-structure/230605011415-591c5b47dde190303e7de29a0a888041/v1/fa8a209bb2ce609861c6572f117e69f8.jpeg?width=720&quality=85%2C50',
    quantity: 1
    },
    {
    id: 5,
    title: 'Harry Potter Pack',
    price: 390,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcA3oZyeX1He2cdNQm85ewyK-xHCYlKvHm-2dSyKOngkK_e6eIE__ipdYGgVGguKQ2jM&usqp=CAU',
    quantity: 1
    }
   ];
   const ProductGrid = () => {
    const dispatch = useDispatch();
    return (
    <div className="product-grid">
    {products.map(product => (
    <div key={product.id} className="product-card">
        <img src={product.image} alt={product.title} />
 <h3>{product.title}</h3>
 <p>${product.price}</p>
 <button onClick={() => dispatch(addToCart(product))}>
 Agregar al carrito
 </button>
 </div>
 ))}
 </div>
 );
};
export default ProductGrid;