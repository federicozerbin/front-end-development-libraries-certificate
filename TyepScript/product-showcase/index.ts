interface Item {
    type: "book" | "electronics" | "clothing";
    id: string;
    price: number;
}

interface Book extends Item {
    type: "book";
    title: string;
    author: string;
}

interface Electronics extends Item {
    type: "electronics";
    item: string;
    model: string;
    warranty?: number;
}

interface Clothing extends Item {
    type: "clothing";
    item: string;
    brand: string;
    size?: "S" | "M" | "L";
}

type Product = Book | Electronics | Clothing;

class Collection<T> {

    items: Array<T>;

    constructor(array: Array<T>) {
        this.items = array;
    }

    getAll(): Array<T> {
        return this.items;
    }

    filter(condition: (el: T) => boolean): Array<T> {
        return this.items.filter(condition);
    }
}

const list: Product[] = [
    {
        type: "clothing",
        id: "p1",
        item: "Jacket",
        brand: "Northloom",
        size: "M",
        price: 89.99,
    },
    {
        type: "electronics",
        id: "p2",
        item: "Tablet",
        model: "Pixelon Slate-A9",
        warranty: 2,
        price: 349.99,
    },
    {
        type: "book",
        id: "p3",
        title: "Dune",
        author: "Frank Herbert",
        price: 14.99,
    },
    {
        type: "electronics",
        id: "p4",
        item: "Smartphone",
        model: "NovaCore X1-Alpha",
        warranty: 2,
        price: 699.99,
    },
    {
        type: "clothing",
        id: "p5",
        item: "Hoodie",
        brand: "CozyForge",
        size: "S",
        price: 49.99,
    },
    {
        type: "book",
        id: "p6",
        title: "1984",
        author: "George Orwell",
        price: 9.99,
    },
    {
        type: "electronics",
        id: "p7",
        item: "Headphones",
        model: "EchoSphere Silent-7",
        price: 129.99,
    },
    {
        type: "clothing",
        id: "p8",
        item: "Jeans",
        brand: "BlueWeave",
        size: "L",
        price: 59.99,
    },
    {
        type: "electronics",
        id: "p9",
        item: "Laptop",
        model: "HexaBook Orion-15",
        warranty: 3,
        price: 1199.99,
    },
    {
        type: "book",
        id: "p10",
        title: "Brave New World",
        author: "Aldous Huxley",
        price: 11.99,
    },
    {
        type: "clothing",
        id: "p11",
        item: "T-Shirt",
        brand: "Fabricon",
        price: 19.99,
    },
    {
        type: "electronics",
        id: "p12",
        item: "Smartwatch",
        model: "Chronex Pulse-Q",
        warranty: 1,
        price: 199.99,
    },
    {
        type: "book",
        id: "p13",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 24.99,
    },
];

const products = new Collection<Product>(list);

function renderProduct(p: Product): string {
    let description: string;

    if (p.type === "book") {
        description = `Book: ${p.title} by ${p.author}`;
    } else if (p.type === "electronics") {
        description = p.warranty !== undefined
            ? `Electronics: ${p.item} - ${p.model} - Warranty: ${p.warranty} year(s)`
            : `Electronics: ${p.item} - ${p.model}`;
    } else if (p.type === "clothing") {
        description = p.size !== undefined
            ? `Clothing: ${p.item} by ${p.brand} - Size ${p.size}`
            : `Clothing: ${p.item} by ${p.brand}`;
    } else {
        throw new Error(`Unknown product type: ${JSON.stringify(p)}`);
    }

    return `
        <div class="item" id="${p.id}">
            <p class="price">${p.price}</p>
            <p class="additional">${description}</p>
        </div>
    `;
}

function showProducts(typeFilter?: Product["type"]) {
    const toBeShown: Product[] = typeFilter
        ? products.filter(p => p.type === typeFilter)
        : products.getAll();

    const outputDiv = document.getElementById("output");
    if (outputDiv) {
        outputDiv.innerHTML = toBeShown
            .map(p => renderProduct(p))
            .join("");
    }
}

document.getElementById("all")?.addEventListener("click", () => showProducts());
document.getElementById("books")?.addEventListener("click", () => showProducts("book"));
document.getElementById("electronics")?.addEventListener("click", () => showProducts("electronics"));
document.getElementById("clothing")?.addEventListener("click", () => showProducts("clothing"));

document.addEventListener("DOMContentLoaded", () => {
    showProducts();
});