import { configureStore } from "@reduxjs/toolkit";
import { CatgoryReducer } from "./CategorySlice";
import { BrandsReduser } from "./BrandsSlice";
import { wishListReducer } from "./WishList";
import { wishListDelReducer } from "./DeletWishList";
import { wishListADDReducer } from "./AddWishList";
import { AllOrderReducer } from "./AllorderForUser";

export let ConfigurationStore = configureStore({
    reducer:{
        CategoryData : CatgoryReducer,
        BrandsData : BrandsReduser,
        whshListData : wishListReducer,
        whshListDelete:wishListDelReducer,
        whshListAdd:wishListADDReducer,
        AllOrderData : AllOrderReducer

    }
}) 