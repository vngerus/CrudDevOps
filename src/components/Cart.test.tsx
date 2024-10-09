import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Cart from './Cart';
import { CartProvider } from '../context/cartContext';
import { AuthProvider } from '../context/authContext';

describe('Cart Component', () => {
    test('Muestra el texto cuando no hay productos en el carrito', () => {
        render(
            <AuthProvider>
                <CartProvider>
                    <Cart />
                </CartProvider>
            </AuthProvider>
        );
        const noItemsMessage = screen.getByText(/No hay productos en el carrito./i);
        expect(noItemsMessage).toBeInTheDocument();
    });

    test('Renderiza un producto en el carrito', () => {
        const mockCartItem = {
            name: 'Big Miau',
            quantity: 2,
            price: 4990,
            image: 'image-url',
            category: 'hamburguesa',
        };

        // Mockear el contexto para simular que hay un producto en el carrito
        render(
            <AuthProvider>
                <CartProvider>
                    <Cart />
                </CartProvider>
            </AuthProvider>
        );

        // Simular que se ha agregado el producto al carrito
        const itemName = screen.getByText(mockCartItem.name);
        expect(itemName).toBeInTheDocument();

        const itemQuantity = screen.getByText(mockCartItem.quantity.toString());
        expect(itemQuantity).toBeInTheDocument();
    });

    test('El botón de eliminar funciona correctamente', () => {
        const mockCartItem = {
            name: 'Big Miau',
            quantity: 2,
            price: 4990,
            image: 'image-url',
            category: 'hamburguesa',
        };

        render(
            <AuthProvider>
                <CartProvider>
                    <Cart />
                </CartProvider>
            </AuthProvider>
        );

        // Comprobar que el producto está en el carrito
        const itemName = screen.getByText(mockCartItem.name);
        expect(itemName).toBeInTheDocument();

        // Simular clic en el botón de eliminar
        const removeButton = screen.getByText(/Eliminar/i);
        fireEvent.click(removeButton);

        // Comprobar que el botón y el artículo ya no están en el documento
        expect(itemName).not.toBeInTheDocument();
        expect(removeButton).not.toBeInTheDocument();
    });
});
