type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
    id: string;
    name: string;
    manufacturer: string;
    category: Category;
    price: number;
    image_url: string;
    created_at: Date;
    description: string;
    year: number;
}

async function fetchMotorcycles(): Promise<Motorcycle[]> {
    const response = await fetch(`https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json`);
    const data = await response.json();
    return data;
}

function getHorsepower(motorcycle: Motorcycle): string {
    const match = motorcycle.description.match(/(\d+)\s?hp/i);
    return match ? `${match[1]} hp` : 'N/A';
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
    return `
        <div class="card">
            <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" alt="${motorcycle.name}">
            <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
            <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
            <p class="motorcycle-card-year-badge">Year: ${motorcycle.year}</p>
            <p class="motorcycle-card-category">Category: ${motorcycle.category}</p>
            <p class="motorcycle-card-price">Price: $${motorcycle.price.toFixed(2)}</p>
            <p class="motorcycle-card-description">${motorcycle.description}</p>
            <p class="motorcycle-card-engine">Engine: ${getHorsepower(motorcycle)}</p>
        </div>
    `;
}

class MotorcycleGalleryApp {
    private allMotorcycles: Motorcycle[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.allMotorcycles = await fetchMotorcycles();
        this.renderMotorcycles(this.allMotorcycles);
        this.setupEventListeners();
    }

    private setupEventListeners() {
        const nameFilterInput = document.getElementById('name-filter-input');
        if (nameFilterInput) {
            nameFilterInput.addEventListener('input', () => this.applyFilters());
        }
    }

    private applyFilters() {
        const nameFilterInput = document.getElementById('name-filter-input') as HTMLInputElement | null;
        const query = nameFilterInput?.value.trim().toLowerCase() ?? '';

        const filtered = this.allMotorcycles.filter(m =>
            m.name.toLowerCase().includes(query)
        );

        this.renderMotorcycles(filtered);
    }

    private renderMotorcycles(motorcycles?: Motorcycle[]) {

        if (!motorcycles && this.allMotorcycles.length === 0) return;

        const list = motorcycles ?? this.allMotorcycles;

        const grid = document.getElementById('motorcycle-grid');
        if (grid) {
            grid.innerHTML = list.map(renderMotorcycleCard).join('');
        }

        const result = document.getElementById('results-number');
        if (result) {
            result.textContent = list.length.toString();
        }

        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = list.length === 0 ? 'block' : 'none';
        }
    }
}

new MotorcycleGalleryApp();