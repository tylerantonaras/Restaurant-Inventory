import React, { useEffect, useState } from "react";
import axios from "axios";

function Ingredients() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Fetch ingredients from the backend
        axios.get("http://localhost:8080/ingredients") // Update the URL if necessary
            .then((response) => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching ingredients:", error);
            });
    }, []);

    return (
        <div>
            <h1>Ingredients</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Stock Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{ingredient.id}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{ingredient.name}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{ingredient.category}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{ingredient.stockQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Ingredients;
