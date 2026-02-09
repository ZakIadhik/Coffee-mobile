import { Coffee } from "@/types/coffee-data-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface CoffeeStore {
    products: Coffee[];
    totalPrice: number; 
    addProduct: (product: Coffee) => void;
    removeProduct: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearProducts: () => void;

    getProductCount: () => number;
}

export const useCoffeeStore = create<CoffeeStore>((set, get) => ({
    products: [],
    totalPrice: 0,

    addProduct: (product: Coffee) => {
        set((state) => {
            const productExists = state.products.find((p) => p.id === product.id);
            let updatedProducts;

            if (productExists) {
                updatedProducts = state.products.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
                );
            } else {
                updatedProducts = [...state.products, { ...product, quantity: 1 }];
            }

            // Считаем новую сумму сразу при обновлении стейта
            const newTotal = updatedProducts.reduce(
                (sum, p) => sum + p.price * (p.quantity || 1), 0
            );

            // Сохраняем в локальное хранилище (побочный эффект)
            AsyncStorage.setItem("products", JSON.stringify(updatedProducts));

            return {
                products: updatedProducts,
                totalPrice: newTotal,
            };
        });
    },

    removeProduct: (id: number) => {
        set((state) => {
            const updatedProducts = state.products.filter((p) => p.id !== id);
            const newTotal = updatedProducts.reduce(
                (sum, p) => sum + p.price * (p.quantity || 1), 0
            );
            
            AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts, totalPrice: newTotal };
        });
    },

    decreaseQuantity: (id: number) => {
        set((state) => {
            const product = state.products.find((p) => p.id === id);
            let updatedProducts;

            if (product && product.quantity > 1) {
                updatedProducts = state.products.map((p) =>
                    p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                );
            } else {
                updatedProducts = state.products.filter((p) => p.id !== id);
            }

            const newTotal = updatedProducts.reduce(
                (sum, p) => sum + p.price * (p.quantity || 1), 0
            );

            AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts, totalPrice: newTotal };
        });
    },

    clearProducts: () => {
        AsyncStorage.removeItem("products");
        set({ products: [], totalPrice: 0 });
    },

    getProductCount: () => get().products.reduce((count, p) => count + (p.quantity || 0), 0),
}));