export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  scientificName: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  sunlight: string;
  water: string;
  difficulty: string;
  plantType: string;
  indoorOutdoor: string;
  potSize: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  tags: string[];
}

export interface Vendor {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  city: string;
  state: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  deliveryRadius: number;
  verified: boolean;
  joinedYear: number;
  specialties: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface Service {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  slug: string;
  description: string;
  priceFrom: number;
  images: string[];
  rating: number;
  reviewCount: number;
  serviceArea: string;
  duration: string;
  features: string[];
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export const categories: Category[] = [
  { id: '1', name: 'Indoor Plants', slug: 'indoor-plants', icon: '🌿', productCount: 245, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop' },
  { id: '2', name: 'Outdoor Plants', slug: 'outdoor-plants', icon: '🌳', productCount: 189, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
  { id: '3', name: 'Flowering Plants', slug: 'flowering-plants', icon: '🌸', productCount: 156, image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=300&fit=crop' },
  { id: '4', name: 'Succulents', slug: 'succulents', icon: '🌵', productCount: 98, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop' },
  { id: '5', name: 'Bonsai', slug: 'bonsai', icon: '🎋', productCount: 45, image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&h=300&fit=crop' },
  { id: '6', name: 'Air Purifying', slug: 'air-purifying', icon: '💨', productCount: 78, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=300&fit=crop' },
  { id: '7', name: 'Herbs & Medicinal', slug: 'herbs-medicinal', icon: '🌱', productCount: 67, image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop' },
  { id: '8', name: 'Pots & Planters', slug: 'pots-planters', icon: '🪴', productCount: 134, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop' },
  { id: '9', name: 'Gardening Tools', slug: 'gardening-tools', icon: '🧰', productCount: 89, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
  { id: '10', name: 'Seeds', slug: 'seeds', icon: '🌾', productCount: 112, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop' },
  { id: '11', name: 'Soil & Fertilizers', slug: 'soil-fertilizers', icon: '🧪', productCount: 56, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop' },
  { id: '12', name: 'Fruit Plants', slug: 'fruit-plants', icon: '🍋', productCount: 73, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop' },
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    businessName: 'Green Valley Nursery',
    slug: 'green-valley-nursery',
    description: 'Premium nursery specializing in exotic indoor plants and rare tropical species. 15+ years of expertise in plant care and cultivation.',
    logo: '🌿',
    coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop',
    city: 'Bangalore',
    state: 'Karnataka',
    rating: 4.8,
    totalReviews: 342,
    totalProducts: 156,
    deliveryRadius: 25,
    verified: true,
    joinedYear: 2020,
    specialties: ['Indoor Plants', 'Tropical Plants', 'Rare Species']
  },
  {
    id: 'v2',
    businessName: 'Rose Garden Farms',
    slug: 'rose-garden-farms',
    description: 'Family-owned nursery with a passion for flowering plants and roses. We grow over 50 varieties of roses and seasonal flowers.',
    logo: '🌹',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=400&fit=crop',
    city: 'Pune',
    state: 'Maharashtra',
    rating: 4.6,
    totalReviews: 218,
    totalProducts: 98,
    deliveryRadius: 30,
    verified: true,
    joinedYear: 2019,
    specialties: ['Flowering Plants', 'Roses', 'Seasonal Flowers']
  },
  {
    id: 'v3',
    businessName: 'Urban Greens',
    slug: 'urban-greens',
    description: 'Modern nursery focused on air-purifying plants and urban gardening solutions. Perfect for apartments and office spaces.',
    logo: '🏙️',
    coverImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&h=400&fit=crop',
    city: 'Delhi',
    state: 'Delhi',
    rating: 4.7,
    totalReviews: 189,
    totalProducts: 134,
    deliveryRadius: 20,
    verified: true,
    joinedYear: 2021,
    specialties: ['Air Purifying', 'Office Plants', 'Terrace Gardens']
  },
  {
    id: 'v4',
    businessName: 'Succulent Paradise',
    slug: 'succulent-paradise',
    description: 'India\'s largest collection of succulents and cacti. Over 200 varieties from around the world, carefully curated for Indian climate.',
    logo: '🌵',
    coverImage: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&h=400&fit=crop',
    city: 'Jaipur',
    state: 'Rajasthan',
    rating: 4.9,
    totalReviews: 456,
    totalProducts: 210,
    deliveryRadius: 35,
    verified: true,
    joinedYear: 2018,
    specialties: ['Succulents', 'Cacti', 'Desert Plants']
  },
  {
    id: 'v5',
    businessName: 'Herbal Heights',
    slug: 'herbal-heights',
    description: 'Organic herb garden specializing in Ayurvedic and medicinal plants. All plants grown without chemicals using traditional methods.',
    logo: '🌱',
    coverImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=400&fit=crop',
    city: 'Kerala',
    state: 'Kerala',
    rating: 4.5,
    totalReviews: 167,
    totalProducts: 87,
    deliveryRadius: 40,
    verified: true,
    joinedYear: 2020,
    specialties: ['Medicinal Plants', 'Herbs', 'Organic']
  },
  {
    id: 'v6',
    businessName: 'Bonsai Art Studio',
    slug: 'bonsai-art-studio',
    description: 'Master-crafted bonsai trees with decades of tradition. Each piece is a living artwork, carefully shaped over years.',
    logo: '🎋',
    coverImage: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1200&h=400&fit=crop',
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.8,
    totalReviews: 98,
    totalProducts: 45,
    deliveryRadius: 15,
    verified: true,
    joinedYear: 2017,
    specialties: ['Bonsai', 'Japanese Maples', 'Art Trees']
  },
];

export const products: Product[] = [
  {
    id: 'p1', vendorId: 'v1', vendorName: 'Green Valley Nursery', categoryId: '1',
    name: 'Monstera Deliciosa', slug: 'monstera-deliciosa',
    description: 'The iconic Swiss Cheese Plant with its characteristic split leaves. A stunning tropical plant that adds instant jungle vibes to any space. Easy to care for and grows beautifully in indirect light.',
    scientificName: 'Monstera deliciosa', price: 899, compareAtPrice: 1299, stock: 45,
    images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1597055181300-e3633a917e38?w=600&h=600&fit=crop'],
    rating: 4.8, reviewCount: 124, sunlight: 'Indirect Bright', water: 'Weekly', difficulty: 'Easy',
    plantType: 'Tropical', indoorOutdoor: 'Indoor', potSize: '8 inch', isFeatured: true, isBestSeller: true,
    tags: ['trending', 'air-purifying', 'low-maintenance']
  },
  {
    id: 'p2', vendorId: 'v1', vendorName: 'Green Valley Nursery', categoryId: '6',
    name: 'Snake Plant (Sansevieria)', slug: 'snake-plant',
    description: 'One of the best air-purifying plants according to NASA. Extremely low maintenance and thrives in almost any condition. Perfect for bedrooms and offices.',
    scientificName: 'Dracaena trifasciata', price: 449, compareAtPrice: 599, stock: 78,
    images: ['https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=600&h=600&fit=crop'],
    rating: 4.9, reviewCount: 256, sunlight: 'Low to Bright', water: 'Bi-weekly', difficulty: 'Very Easy',
    plantType: 'Succulent', indoorOutdoor: 'Indoor', potSize: '6 inch', isFeatured: true, isBestSeller: true,
    tags: ['air-purifying', 'beginner-friendly', 'bedroom']
  },
  {
    id: 'p3', vendorId: 'v2', vendorName: 'Rose Garden Farms', categoryId: '3',
    name: 'Hybrid Tea Rose - Red', slug: 'hybrid-tea-rose-red',
    description: 'Classic red hybrid tea rose with perfectly formed blooms. Fragrant and long-lasting flowers that bloom repeatedly throughout the season.',
    scientificName: 'Rosa hybrida', price: 349, compareAtPrice: 499, stock: 32,
    images: ['https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop'],
    rating: 4.7, reviewCount: 89, sunlight: 'Full Sun', water: 'Regular', difficulty: 'Medium',
    plantType: 'Flowering', indoorOutdoor: 'Outdoor', potSize: '10 inch', isFeatured: true, isBestSeller: false,
    tags: ['fragrant', 'classic', 'gift']
  },
  {
    id: 'p4', vendorId: 'v4', vendorName: 'Succulent Paradise', categoryId: '4',
    name: 'Echeveria Collection (Set of 5)', slug: 'echeveria-collection',
    description: 'Beautiful collection of 5 different Echeveria varieties in pastel colors. Perfect for windowsills, desks, and succulent gardens. Each plant is unique.',
    scientificName: 'Echeveria spp.', price: 599, compareAtPrice: 799, stock: 25,
    images: ['https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=600&fit=crop'],
    rating: 4.6, reviewCount: 167, sunlight: 'Bright Indirect', water: 'Weekly', difficulty: 'Easy',
    plantType: 'Succulent', indoorOutdoor: 'Indoor/Outdoor', potSize: '3 inch each', isFeatured: true, isBestSeller: true,
    tags: ['collection', 'gift', 'desk-plants']
  },
  {
    id: 'p5', vendorId: 'v3', vendorName: 'Urban Greens', categoryId: '6',
    name: 'Peace Lily (Spathiphyllum)', slug: 'peace-lily',
    description: 'Elegant white-flowering plant that thrives in low light conditions. Excellent air purifier that removes toxins like benzene and formaldehyde.',
    scientificName: 'Spathiphyllum wallisii', price: 549, compareAtPrice: 699, stock: 56,
    images: ['https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&h=600&fit=crop'],
    rating: 4.7, reviewCount: 198, sunlight: 'Low to Medium', water: 'When soil is dry', difficulty: 'Easy',
    plantType: 'Flowering', indoorOutdoor: 'Indoor', potSize: '8 inch', isFeatured: false, isBestSeller: true,
    tags: ['air-purifying', 'low-light', 'flowering']
  },
  {
    id: 'p6', vendorId: 'v5', vendorName: 'Herbal Heights', categoryId: '7',
    name: 'Tulsi (Holy Basil) Plant', slug: 'tulsi-plant',
    description: 'Sacred Indian herb with immense medicinal properties. Boosts immunity, reduces stress, and purifies air. An essential for every Indian household.',
    scientificName: 'Ocimum tenuiflorum', price: 199, compareAtPrice: 299, stock: 120,
    images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=600&fit=crop'],
    rating: 4.8, reviewCount: 312, sunlight: 'Full Sun', water: 'Daily', difficulty: 'Easy',
    plantType: 'Herb', indoorOutdoor: 'Outdoor', potSize: '6 inch', isFeatured: true, isBestSeller: true,
    tags: ['medicinal', 'sacred', 'immunity']
  },
  {
    id: 'p7', vendorId: 'v6', vendorName: 'Bonsai Art Studio', categoryId: '5',
    name: 'Ficus Bonsai - 5 Years Old', slug: 'ficus-bonsai',
    description: 'Beautifully trained Ficus bonsai tree, 5 years of careful shaping. Comes in a handcrafted ceramic pot. A living piece of art for your home or office.',
    scientificName: 'Ficus retusa', price: 2499, compareAtPrice: 3499, stock: 12,
    images: ['https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&h=600&fit=crop'],
    rating: 4.9, reviewCount: 67, sunlight: 'Bright Indirect', water: 'When soil is dry', difficulty: 'Medium',
    plantType: 'Bonsai', indoorOutdoor: 'Indoor', potSize: 'Bonsai pot', isFeatured: true, isBestSeller: false,
    tags: ['premium', 'gift', 'art']
  },
  {
    id: 'p8', vendorId: 'v1', vendorName: 'Green Valley Nursery', categoryId: '1',
    name: 'Fiddle Leaf Fig', slug: 'fiddle-leaf-fig',
    description: 'Statement plant with large, violin-shaped leaves. A favorite among interior designers for its dramatic presence. Grows tall and majestic.',
    scientificName: 'Ficus lyrata', price: 1299, compareAtPrice: 1799, stock: 18,
    images: ['https://images.unsplash.com/photo-1597055181300-e3633a917e38?w=600&h=600&fit=crop'],
    rating: 4.5, reviewCount: 89, sunlight: 'Bright Indirect', water: 'Weekly', difficulty: 'Medium',
    plantType: 'Tropical', indoorOutdoor: 'Indoor', potSize: '10 inch', isFeatured: true, isBestSeller: false,
    tags: ['statement', 'designer', 'tall']
  },
  {
    id: 'p9', vendorId: 'v2', vendorName: 'Rose Garden Farms', categoryId: '3',
    name: 'Jasmine (Mogra) Plant', slug: 'jasmine-mogra',
    description: 'Fragrant white flowers that bloom throughout summer. The sweet scent fills your garden and home. Traditional Indian favorite for pooja and decoration.',
    scientificName: 'Jasminum sambac', price: 299, compareAtPrice: 399, stock: 67,
    images: ['https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=600&h=600&fit=crop'],
    rating: 4.6, reviewCount: 145, sunlight: 'Full Sun', water: 'Regular', difficulty: 'Easy',
    plantType: 'Flowering', indoorOutdoor: 'Outdoor', potSize: '8 inch', isFeatured: false, isBestSeller: true,
    tags: ['fragrant', 'traditional', 'summer']
  },
  {
    id: 'p10', vendorId: 'v4', vendorName: 'Succulent Paradise', categoryId: '4',
    name: 'String of Pearls', slug: 'string-of-pearls',
    description: 'Unique trailing succulent with pearl-like leaves. Perfect for hanging baskets and shelves. Creates a beautiful waterfall effect as it grows.',
    scientificName: 'Senecio rowleyanus', price: 449, compareAtPrice: 599, stock: 34,
    images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop'],
    rating: 4.4, reviewCount: 78, sunlight: 'Bright Indirect', water: 'Bi-weekly', difficulty: 'Medium',
    plantType: 'Succulent', indoorOutdoor: 'Indoor', potSize: '5 inch hanging', isFeatured: false, isBestSeller: false,
    tags: ['hanging', 'unique', 'trailing']
  },
  {
    id: 'p11', vendorId: 'v3', vendorName: 'Urban Greens', categoryId: '1',
    name: 'Areca Palm', slug: 'areca-palm',
    description: 'Graceful tropical palm that adds elegance to any space. Top-rated air purifier that adds humidity and removes pollutants. Perfect for living rooms.',
    scientificName: 'Dypsis lutescens', price: 799, compareAtPrice: 999, stock: 42,
    images: ['https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&h=600&fit=crop'],
    rating: 4.7, reviewCount: 156, sunlight: 'Bright Indirect', water: 'Regular', difficulty: 'Easy',
    plantType: 'Palm', indoorOutdoor: 'Indoor', potSize: '10 inch', isFeatured: true, isBestSeller: true,
    tags: ['air-purifying', 'elegant', 'tropical']
  },
  {
    id: 'p12', vendorId: 'v5', vendorName: 'Herbal Heights', categoryId: '7',
    name: 'Aloe Vera Plant', slug: 'aloe-vera',
    description: 'Miracle plant with countless health and beauty benefits. Easy to grow, drought-tolerant, and produces oxygen at night. Perfect for bedrooms.',
    scientificName: 'Aloe barbadensis', price: 249, compareAtPrice: 349, stock: 89,
    images: ['https://images.unsplash.com/photo-1596547609652-9cf5d8c10d90?w=600&h=600&fit=crop'],
    rating: 4.8, reviewCount: 234, sunlight: 'Bright Indirect', water: 'Bi-weekly', difficulty: 'Very Easy',
    plantType: 'Succulent', indoorOutdoor: 'Indoor/Outdoor', potSize: '6 inch', isFeatured: false, isBestSeller: true,
    tags: ['medicinal', 'bedroom', 'beginner']
  },
];

export const services: Service[] = [
  {
    id: 's1', vendorId: 'v1', vendorName: 'Green Valley Nursery',
    name: 'Home Garden Setup', slug: 'home-garden-setup',
    description: 'Complete home garden setup including plant selection, soil preparation, planting, and initial care guide. We transform your space into a green paradise.',
    priceFrom: 4999, images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop'],
    rating: 4.8, reviewCount: 56, serviceArea: 'Bangalore', duration: '1-2 days',
    features: ['Site Assessment', 'Plant Selection', 'Soil Preparation', 'Planting', 'Care Guide', '30-day Support']
  },
  {
    id: 's2', vendorId: 'v3', vendorName: 'Urban Greens',
    name: 'Terrace Garden Design', slug: 'terrace-garden-design',
    description: 'Professional terrace garden design and installation. We create beautiful rooftop gardens with proper waterproofing, drainage, and plant selection.',
    priceFrom: 14999, images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop'],
    rating: 4.9, reviewCount: 34, serviceArea: 'Delhi NCR', duration: '3-5 days',
    features: ['Design Consultation', 'Waterproofing', 'Raised Beds', 'Irrigation Setup', 'Plant Installation', '90-day Warranty']
  },
  {
    id: 's3', vendorId: 'v1', vendorName: 'Green Valley Nursery',
    name: 'Tree Plantation Drive', slug: 'tree-plantation-drive',
    description: 'Organize a tree plantation drive for your society, office, or event. We provide saplings, tools, expert guidance, and post-plantation care.',
    priceFrom: 2999, images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'],
    rating: 4.7, reviewCount: 89, serviceArea: 'Bangalore', duration: '1 day',
    features: ['Saplings Provided', 'Tools & Equipment', 'Expert Guidance', 'Photo Documentation', 'Care Schedule', 'Follow-up Visit']
  },
  {
    id: 's4', vendorId: 'v3', vendorName: 'Urban Greens',
    name: 'Landscape Design & Installation', slug: 'landscape-design',
    description: 'Complete landscape design for residential and commercial properties. From concept to completion, we create stunning outdoor spaces.',
    priceFrom: 24999, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop'],
    rating: 4.8, reviewCount: 23, serviceArea: 'Delhi NCR', duration: '1-2 weeks',
    features: ['3D Design', 'Hardscape', 'Softscape', 'Lighting', 'Irrigation', '1-year Maintenance']
  },
  {
    id: 's5', vendorId: 'v5', vendorName: 'Herbal Heights',
    name: 'Herbal Garden Setup', slug: 'herbal-garden-setup',
    description: 'Create your own medicinal and culinary herb garden at home. We design, plant, and maintain a complete herbal garden with Ayurvedic plants.',
    priceFrom: 3999, images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop'],
    rating: 4.6, reviewCount: 45, serviceArea: 'Kerala', duration: '1-2 days',
    features: ['Herb Selection', 'Organic Soil', 'Planting', 'Usage Guide', 'Recipe Book', 'Monthly Check-in']
  },
  {
    id: 's6', vendorId: 'v6', vendorName: 'Bonsai Art Studio',
    name: 'Bonsai Workshop', slug: 'bonsai-workshop',
    description: 'Learn the ancient art of bonsai from master craftsmen. Hands-on workshop covering wiring, pruning, repotting, and styling techniques.',
    priceFrom: 1999, images: ['https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&h=400&fit=crop'],
    rating: 4.9, reviewCount: 67, serviceArea: 'Mumbai', duration: '4 hours',
    features: ['Expert Instruction', 'Materials Provided', 'Take-home Bonsai', 'Certificate', 'Refreshments', 'Community Access']
  },
];

export const reviews: Review[] = [
  { id: 'r1', userName: 'Priya Sharma', avatar: '👩', rating: 5, title: 'Absolutely beautiful plant!', comment: 'The Monstera arrived in perfect condition. Well-packaged and healthy. Already showing new growth after 2 weeks!', date: '2024-01-15', verified: true },
  { id: 'r2', userName: 'Rahul Verma', avatar: '👨', rating: 4, title: 'Great quality, fast delivery', comment: 'Plant was healthy and bigger than expected. Delivery was quick. Only giving 4 stars because the pot had a small chip.', date: '2024-01-12', verified: true },
  { id: 'r3', userName: 'Anita Desai', avatar: '👩', rating: 5, title: 'Best nursery online!', comment: 'I have ordered from multiple nurseries but Green Valley is consistently the best. Plants are always healthy and well-cared for.', date: '2024-01-10', verified: true },
  { id: 'r4', userName: 'Vikram Singh', avatar: '👨', rating: 5, title: 'Perfect gift for my mom', comment: 'Ordered the succulent collection as a gift. My mom loved it! Beautiful packaging and healthy plants.', date: '2024-01-08', verified: true },
  { id: 'r5', userName: 'Meera Patel', avatar: '👩', rating: 4, title: 'Good plant, could be bigger', comment: 'Plant is healthy and growing well, but it was smaller than the photo suggested. Still happy with the purchase.', date: '2024-01-05', verified: true },
];

export const testimonials = [
  { name: 'Sneha Reddy', location: 'Bangalore', text: 'PlantConnect transformed my balcony into a mini jungle! The variety of plants and quality is unmatched.', avatar: '👩‍🦱', rating: 5 },
  { name: 'Arjun Kapoor', location: 'Mumbai', text: 'Booked a terrace garden service and the team was professional. My rooftop is now a green oasis!', avatar: '👨‍🦲', rating: 5 },
  { name: 'Deepika Nair', location: 'Kerala', text: 'Finally found a platform that connects me with authentic nurseries. The herbal plants I got are thriving!', avatar: '👩', rating: 5 },
  { name: 'Rajesh Kumar', location: 'Delhi', text: 'As a nursery owner, PlantConnect has doubled my sales. The platform is easy to use and customers love it.', avatar: '👨', rating: 5 },
];
