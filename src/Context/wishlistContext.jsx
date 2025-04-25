import React, { createContext, useEffect, useState } from 'react'
export const WishlistContext = createContext()

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [])

    const addToWishlist = (product)=>{
        const findWishlist = wishlist.find(x => x.id === product.id)

        if (!findWishlist) {
            setWishlist([...wishlist,product])
        } else {
            setWishlist(wishlist.filter(x=>x.id !== product.id))
        }
    }
    
    useEffect(() => {
      localStorage.setItem("wishlist",JSON.stringify(wishlist))
    }, [wishlist])
    
    const data = {wishlist,addToWishlist}
    return (
        <WishlistContext.Provider value={data}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider