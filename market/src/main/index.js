import React from 'react';
import './index.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import {API_URL} from "../config/constant";

dayjs.extend(relativeTime);

function Mainpage(){
    const [products, setProducts] = React.useState([]);
    React.useEffect(
        function(){
        axios.get(`${API_URL}/products`)
        .then(function(result){
                const products = result.data.products;
                setProducts(products);        
            }).catch(function(error){
                console.error('error 발생 : ',error);
            });
        },[]);

    return (
        <div>
            <div id="body">
                <div id="banner">
                    <img src="images/banners/banner1.png" />
                </div>
                <h1>판매되는 상품들</h1>
                <div id="product-list">
                    {
                        products.map(function(product, index){
                            return (
                            <div className='product-card'>
                                <Link className='product-link' to={'/products/'+product.id}>
                                    <div>
                                        <img className='product-img' src={product.imgUrl} />
                                    </div>
                                    <div className='product-contents'>
                                        <span className='product-name'>
                                            {product.name}   
                                        </span>
                                        <span className='product-price'>
                                            {product.price}원
                                        </span>
                                        <div className='product-footer'>
                                            <div className='product-seller'>
                                                <img className='product-avatar' src='images/icons/avatar.png' />
                                                <span>{product.seller}</span>                                    
                                            </div>
                                            <span className='product-date'>{dayjs(product.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>    
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Mainpage