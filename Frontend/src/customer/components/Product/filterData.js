export const color = [
    { value: "blue" },
    { value: "white" },
    { value: "black" },
    { value: "red" },
    { value: "maroon" },
    { value: "beige" },
    { value: "pink" },
    { value: "green" },
    { value: "yellow" },
    { value: "purple" },
    { value: "brown" }
];

export const filters = [
    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White" },
            { value: "beige", label: "Beige" },
            { value: "brown", label: "Brown" },
            { value: "green", label: "Green" },
            { value: "purple", label: "Purple" },
            { value: "blue", label: "Blue" }
        ]
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "in stock", label: "In Stock" },
            { value: "out of stock", label: "Out Of Stock" }
        ]
    }
];

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "159-399", label: "₹159 To ₹399" },
            { value: "399-999", label: "₹399 To ₹999" },
            { value: "999-1999", label: "₹999 To 1999" },
            { value: "1999-2999", label: "₹1999 To ₹2999" },
            { value: "3999-4999", label: "3999 To ₹4999" },
        ],
    },
    {
        id: "disccout",
        name: "Discount Range",
        options: [
            {
                value: "10",
                label: "10% And Above",
            },
            { value: "20", label: "20% And Above" },
            { value: "30", label: "30% And Above" },
            { value: "40", label: "40% And Above" },
            { value: "50", label: "50% And Above" },
            {
                value: "60", label:
                    "60% And Above"
            },
            { value: "70", label: "70% And Above" },
            { value: "80", label: "80% And Above" },

        ]
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out Of Stock" }
        ],
    }
]

export const sortOptions = [
    { name: "Price: Low to High", query: "price_low" },
    { name: "Price: High to Low", query: "price_high" }
];