import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import AppDrawer from "./components/Drawer/Drawer";
import {Route} from "react-router-dom";
import Contacts from "./components/Contacts/Contacts";
import Main from "./components/Main/Main";
import Products from "./components/Products/Products";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";


const App = (props)=>{
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    ///////////////////////////////////////////////////
    //cart events

    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product)=>{
        let alreadyInCart = false;
        cartItems.forEach((item)=>{
            if(item.id === product.id){
                item.count++;
                setCartItems([
                    ...cartItems,
                ]);
                alreadyInCart = true;
            }
        });
        if(!alreadyInCart){
            product.count = 1;
            setCartItems([
                ...cartItems,
                product
            ]);
        }
    };

    const decCartCount = (product)=>{
        cartItems.forEach((item)=> {
            if (item.id === product.id && product.count > 1) {
                item.count--;
                setCartItems([
                    ...cartItems,
                ]);
            }
            });
    };

    const InputChangeCartCount = ({cartData: product, value})=>{
        cartItems.forEach((item)=> {
            if (item.id === product.id) {
                item.count = +value;
                console.log(item.count);
                setCartItems([
                    ...cartItems,
                ]);
            }
        });
    };

    const removeFromCart = (product)=>{
        setCartItems(cartItems.filter(x=>x.id!==product.id));
    };
    useEffect(() => {
        countTotalSum(cartItems);
    }, [cartItems]);

    const [totalSum, setTotalSum] = useState(0);
    const countTotalSum = (cartItems)=>{
        setTotalSum( cartItems.reduce((a,c)=> a + (c.price * c.count),0));

    };

    // const [totalCount,setTotalCount] = useState(0);
    // const cartCounted = (counts)=>{
    //     let sumOfTotalCount = 0;
    //     counts.forEach((item) => {sumOfTotalCount += item.count});
    //     setTotalCount(sumOfTotalCount);
    // };
///////////////////////////////////////////////////
    return(
        <div>
            <Header setDrawerOpen={setDrawerOpen} cartItems={cartItems} addToCart={addToCart}
                    removeFromCart={removeFromCart} totalSum={totalSum} decCartCount={decCartCount}
                    InputChangeCartCount={InputChangeCartCount}
            />
            <AppDrawer open={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
            <Route exact path='/' component={Main} />
            <Route path='/contacts' component={Contacts} />
            {/*<Route path='/products' component={Products}/>*/}
            <Route path='/products' render={() => <Products  addToCart={addToCart} />} />
            <Route path='/productDetails/:id' component={ProductDetails} />
        </div>
    )};

export default App;
