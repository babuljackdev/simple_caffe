// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Active Navigation Link Highlighting
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (currentPage.includes(linkPath) || 
            (currentPage === '/' && linkPath === 'index.html') ||
            (currentPage.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavLink();
/* Premium Homepage JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarScroll();
    initStatsCounter();
    initNewsletterForm();
    initFeaturedItems();
    init3DTiltEffect();
    initParallax();
    initMouseGlow();
});

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

/* Navbar Scroll Effect */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}


// Menu Items Data
const menuItems = {
    // Breakfast Items
    'classic-breakfast': {
        id: 'classic-breakfast',
        name: 'Classic Breakfast',
        category: 'Breakfast',
        price: '$8.99',
        description: 'Start your day right with our classic breakfast featuring two perfectly cooked eggs, crispy bacon, toasted sourdough bread, and golden hash browns. Made with farm-fresh eggs and premium bacon, this hearty meal will keep you energized throughout the morning.',
        details: [
            'Two farm-fresh eggs cooked to your preference',
            'Crispy smoked bacon strips',
            'Toasted sourdough bread with butter',
            'Golden crispy hash browns',
            'Served with your choice of coffee or juice'
        ],
        nutrition: {
            calories: 650,
            protein: '28g',
            carbs: '45g',
            fat: '38g'
        },
        images: [
            'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'hearty']
    },
    'avocado-toast': {
        id: 'avocado-toast',
        name: 'Avocado Toast',
        category: 'Breakfast',
        price: '$7.99',
        description: 'Our signature avocado toast features perfectly ripe, creamy avocado spread on toasted artisan sourdough bread, topped with a perfectly poached egg, a sprinkle of red pepper flakes, and a drizzle of olive oil. A healthy and delicious choice for any time of day.',
        details: [
            'Fresh ripe avocado spread on sourdough',
            'Perfectly poached egg on top',
            'Red pepper flakes for a kick',
            'Extra virgin olive oil drizzle',
            'Seasoned with sea salt and black pepper'
        ],
        nutrition: {
            calories: 420,
            protein: '14g',
            carbs: '35g',
            fat: '26g'
        },
        images: [
            'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
        ],
        tags: ['vegetarian', 'healthy', 'popular']
    },
    'pancakes': {
        id: 'pancakes',
        name: 'Pancakes',
        category: 'Breakfast',
        price: '$6.99',
        description: 'Fluffy, golden pancakes stacked high and served with pure maple syrup and creamy butter. Our secret recipe makes these pancakes light, airy, and absolutely delicious. Perfect for a weekend treat!',
        details: [
            'Three fluffy buttermilk pancakes',
            'Pure maple syrup',
            'Creamy butter on top',
            'Optional: fresh berries or whipped cream',
            'Made from scratch daily'
        ],
        nutrition: {
            calories: 520,
            protein: '12g',
            carbs: '68g',
            fat: '22g'
        },
        images: [
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    'breakfast-burrito': {
        id: 'breakfast-burrito',
        name: 'Breakfast Burrito',
        category: 'Breakfast',
        price: '$8.49',
        description: 'A hearty breakfast wrapped in a warm flour tortilla. Our breakfast burrito is packed with fluffy scrambled eggs, melted cheddar cheese, black beans, and fresh vegetables. Served with salsa on the side.',
        details: [
            'Fluffy scrambled eggs',
            'Melted cheddar cheese',
            'Black beans and corn',
            'Fresh bell peppers and onions',
            'Warm flour tortilla with salsa'
        ],
        nutrition: {
            calories: 580,
            protein: '24g',
            carbs: '52g',
            fat: '30g'
        },
        images: [
            'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&h=600&fit=crop'
        ],
        tags: ['hearty', 'popular']
    },
    'oatmeal-bowl': {
        id: 'oatmeal-bowl',
        name: 'Oatmeal Bowl',
        category: 'Breakfast',
        price: '$5.99',
        description: 'Warm and comforting oatmeal made with rolled oats and almond milk, topped with a generous portion of fresh mixed berries, a drizzle of honey, and a sprinkle of chia seeds. A nutritious and satisfying way to start your day.',
        details: [
            'Warm rolled oats with almond milk',
            'Fresh mixed berries (strawberries, blueberries)',
            'Pure honey drizzle',
            'Chia seeds for extra nutrition',
            'Optional: nuts or granola topping'
        ],
        nutrition: {
            calories: 320,
            protein: '10g',
            carbs: '58g',
            fat: '6g'
        },
        images: [
            'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'vegetarian', 'vegan']
    },
    'french-toast': {
        id: 'french-toast',
        name: 'French Toast',
        category: 'Breakfast',
        price: '$7.49',
        description: 'Classic French toast made with thick-cut brioche bread soaked in a rich egg and cinnamon mixture, then grilled to golden perfection. Served with a dusting of powdered sugar and pure maple syrup.',
        details: [
            'Thick-cut brioche bread',
            'Egg and cinnamon custard',
            'Grilled to golden perfection',
            'Powdered sugar dusting',
            'Pure maple syrup on the side'
        ],
        nutrition: {
            calories: 480,
            protein: '16g',
            carbs: '62g',
            fat: '18g'
        },
        images: [
            'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    // Lunch Items
    'grilled-chicken-sandwich': {
        id: 'grilled-chicken-sandwich',
        name: 'Grilled Chicken Sandwich',
        category: 'Lunch',
        price: '$9.99',
        description: 'Juicy grilled chicken breast served on a toasted brioche bun with fresh lettuce, ripe tomato, and our house-made garlic mayo. A satisfying and delicious lunch option.',
        details: [
            'Grilled chicken breast',
            'Toasted brioche bun',
            'Fresh lettuce and tomato',
            'House-made garlic mayo',
            'Served with a side of chips'
        ],
        nutrition: {
            calories: 520,
            protein: '32g',
            carbs: '38g',
            fat: '26g'
        },
        images: [
            'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'hearty']
    },
    'caesar-salad': {
        id: 'caesar-salad',
        name: 'Caesar Salad',
        category: 'Lunch',
        price: '$8.49',
        description: 'Fresh and crisp romaine lettuce tossed with our house-made Caesar dressing, topped with shaved parmesan cheese and crunchy garlic croutons. A classic salad that never disappoints.',
        details: [
            'Fresh romaine lettuce',
            'House-made Caesar dressing',
            'Shaved parmesan cheese',
            'Garlic croutons',
            'Optional: grilled chicken add-on'
        ],
        nutrition: {
            calories: 380,
            protein: '12g',
            carbs: '18g',
            fat: '28g'
        },
        images: [
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'vegetarian']
    },
    'club-sandwich': {
        id: 'club-sandwich',
        name: 'Club Sandwich',
        category: 'Lunch',
        price: '$10.99',
        description: 'Our classic triple-decker club sandwich features layers of roasted turkey, crispy bacon, lettuce, tomato, and mayo stacked between three slices of toasted white bread. A hearty and satisfying lunch.',
        details: [
            'Triple-decker toasted white bread',
            'Roasted turkey breast',
            'Crispy bacon',
            'Fresh lettuce and tomato',
            'Mayo and served with chips'
        ],
        nutrition: {
            calories: 680,
            protein: '35g',
            carbs: '48g',
            fat: '38g'
        },
        images: [
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop'
        ],
        tags: ['hearty', 'popular']
    },
    'veggie-wrap': {
        id: 'veggie-wrap',
        name: 'Veggie Wrap',
        category: 'Lunch',
        price: '$8.99',
        description: 'A colorful and nutritious wrap filled with grilled vegetables (zucchini, bell peppers, onions), creamy hummus, and fresh mixed greens. Wrapped in a whole wheat tortilla for a healthy lunch option.',
        details: [
            'Grilled zucchini and bell peppers',
            'Creamy hummus spread',
            'Fresh mixed greens',
            'Whole wheat tortilla',
            'Light and flavorful'
        ],
        nutrition: {
            calories: 380,
            protein: '14g',
            carbs: '42g',
            fat: '18g'
        },
        images: [
            'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'vegetarian', 'vegan']
    },
    'tomato-soup': {
        id: 'tomato-soup',
        name: 'Tomato Soup',
        category: 'Lunch',
        price: '$5.99',
        description: 'Creamy and comforting tomato soup made with ripe tomatoes, fresh herbs, and a touch of cream. Served with a grilled cheese sandwich on the side for the ultimate comfort meal.',
        details: [
            'Creamy tomato soup',
            'Fresh basil and herbs',
            'Grilled cheese sandwich',
            'Made from scratch daily',
            'Perfect for a light lunch'
        ],
        nutrition: {
            calories: 420,
            protein: '16g',
            carbs: '38g',
            fat: '24g'
        },
        images: [
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1574868233270-3a6c5f5d8d4d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop'
        ],
        tags: ['comfort', 'vegetarian']
    },
    'quinoa-bowl': {
        id: 'quinoa-bowl',
        name: 'Quinoa Bowl',
        category: 'Lunch',
        price: '$9.49',
        description: 'A nutritious bowl featuring fluffy quinoa topped with roasted vegetables (sweet potato, Brussels sprouts, chickpeas), fresh greens, and a creamy tahini dressing. A healthy and satisfying meal.',
        details: [
            'Fluffy cooked quinoa',
            'Roasted sweet potato and Brussels sprouts',
            'Chickpeas for protein',
            'Fresh mixed greens',
            'Creamy tahini dressing'
        ],
        nutrition: {
            calories: 450,
            protein: '18g',
            carbs: '55g',
            fat: '20g'
        },
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'vegetarian', 'vegan', 'gluten-free']
    },
    // Drinks Items
    'espresso': {
        id: 'espresso',
        name: 'Espresso',
        category: 'Drinks',
        price: '$2.99',
        description: 'A single shot of rich, bold espresso made from our signature blend of premium Arabica beans. Perfect for a quick caffeine boost or as the base for your favorite coffee drink.',
        details: [
            'Single shot of pure espresso',
            'Premium Arabica bean blend',
            'Rich and bold flavor',
            'Perfect crema',
            'Quick and energizing'
        ],
        nutrition: {
            calories: 5,
            protein: '0g',
            carbs: '1g',
            fat: '0g'
        },
        images: [
            'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'caffeine']
    },
    'americano': {
        id: 'americano',
        name: 'Americano',
        category: 'Drinks',
        price: '$3.49',
        description: 'A classic Americano made with a double shot of espresso topped with hot water. Smooth and flavorful with the rich taste of espresso but a lighter body.',
        details: [
            'Double shot of espresso',
            'Hot water added',
            'Smooth and flavorful',
            'Less intense than straight espresso',
            'Perfect for coffee lovers'
        ],
        nutrition: {
            calories: 10,
            protein: '0g',
            carbs: '2g',
            fat: '0g'
        },
        images: [
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'caffeine']
    },
    'cappuccino': {
        id: 'cappuccino',
        name: 'Cappuccino',
        category: 'Drinks',
        price: '$4.49',
        description: 'A perfectly balanced cappuccino with equal parts espresso, steamed milk, and velvety milk foam. Topped with a dusting of cocoa powder for that classic café experience.',
        details: [
            'Double shot of espresso',
            'Steamed milk',
            'Thick velvety foam',
            'Cocoa powder topping',
            'Perfectly balanced'
        ],
        nutrition: {
            calories: 120,
            protein: '8g',
            carbs: '10g',
            fat: '6g'
        },
        images: [
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'creamy']
    },
    'latte': {
        id: 'latte',
        name: 'Latte',
        category: 'Drinks',
        price: '$4.49',
        description: 'A smooth and creamy latte made with a double shot of espresso and steamed milk, topped with a light layer of foam. Perfect for those who prefer a milder coffee with a velvety texture.',
        details: [
            'Double shot of espresso',
            'Steamed milk',
            'Light foam layer',
            'Smooth and creamy',
            'Customizable with syrups'
        ],
        nutrition: {
            calories: 190,
            protein: '10g',
            carbs: '15g',
            fat: '10g'
        },
        images: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop'
        ],
        tags: ['popular', 'creamy']
    },
    'mocha': {
        id: 'mocha',
        name: 'Mocha',
        category: 'Drinks',
        price: '$4.99',
        description: 'A decadent mocha combining rich espresso, premium chocolate, and steamed milk. Topped with whipped cream and a chocolate drizzle. The perfect blend of coffee and chocolate.',
        details: [
            'Double shot of espresso',
            'Premium chocolate',
            'Steamed milk',
            'Whipped cream topping',
            'Chocolate drizzle'
        ],
        nutrition: {
            calories: 290,
            protein: '10g',
            carbs: '35g',
            fat: '14g'
        },
        images: [
            'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    'iced-coffee': {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        category: 'Drinks',
        price: '$3.99',
        description: 'Refreshing cold-brewed coffee served over ice. Our cold brew process extracts the smooth, rich flavors of our premium beans without the bitterness, creating a perfectly balanced iced coffee.',
        details: [
            'Cold-brewed coffee',
            'Served over ice',
            'Smooth and refreshing',
            'Less acidic than hot coffee',
            'Perfect for warm days'
        ],
        nutrition: {
            calories: 5,
            protein: '0g',
            carbs: '1g',
            fat: '0g'
        },
        images: [
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop'
        ],
        tags: ['refreshing', 'caffeine']
    },
    'green-tea': {
        id: 'green-tea',
        name: 'Green Tea',
        category: 'Drinks',
        price: '$2.99',
        description: 'Premium Japanese green tea leaves steeped to perfection. Served hot with a slice of fresh lemon. Rich in antioxidants and offering a delicate, refreshing flavor.',
        details: [
            'Premium Japanese green tea',
            'Steeped to perfection',
            'Served hot',
            'Fresh lemon slice',
            'Rich in antioxidants'
        ],
        nutrition: {
            calories: 2,
            protein: '0g',
            carbs: '0g',
            fat: '0g'
        },
        images: [
            'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'caffeine']
    },
    'fresh-juice': {
        id: 'fresh-juice',
        name: 'Fresh Juice',
        category: 'Drinks',
        price: '$4.49',
        description: 'Freshly squeezed juice made from premium fruits. Choose from our refreshing orange juice or crisp apple juice. Made daily using only the freshest fruits.',
        details: [
            'Freshly squeezed daily',
            'Choice of orange or apple juice',
            'No added sugar',
            'Pure fruit juice',
            'Rich in vitamins'
        ],
        nutrition: {
            calories: 110,
            protein: '2g',
            carbs: '26g',
            fat: '0g'
        },
        images: [
            'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&h=600&fit=crop'
        ],
        tags: ['healthy', 'refreshing', 'vegetarian', 'vegan']
    },
    // Desserts Items
    'chocolate-cake': {
        id: 'chocolate-cake',
        name: 'Chocolate Cake',
        category: 'Desserts',
        price: '$4.99',
        description: 'Rich and decadent chocolate cake made with premium cocoa and topped with a smooth chocolate ganache. A chocolate lover\'s dream come true.',
        details: [
            'Rich chocolate cake layers',
            'Premium cocoa',
            'Smooth chocolate ganache',
            'Made from scratch',
            'Perfectly moist'
        ],
        nutrition: {
            calories: 450,
            protein: '6g',
            carbs: '55g',
            fat: '24g'
        },
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    'cheesecake': {
        id: 'cheesecake',
        name: 'Cheesecake',
        category: 'Desserts',
        price: '$5.49',
        description: 'Classic New York-style cheesecake with a graham cracker crust, topped with a sweet mixed berry sauce. Creamy, rich, and absolutely delicious.',
        details: [
            'Classic New York style',
            'Graham cracker crust',
            'Mixed berry sauce',
            'Creamy and rich',
            'Made fresh daily'
        ],
        nutrition: {
            calories: 480,
            protein: '10g',
            carbs: '42g',
            fat: '30g'
        },
        images: [
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    'apple-pie': {
        id: 'apple-pie',
        name: 'Apple Pie',
        category: 'Desserts',
        price: '$4.49',
        description: 'Warm apple pie filled with cinnamon-spiced apples in a flaky butter crust, served with a scoop of creamy vanilla ice cream. The ultimate comfort dessert.',
        details: [
            'Warm apple pie',
            'Cinnamon-spiced apples',
            'Flaky butter crust',
            'Vanilla ice cream',
            'Made from scratch'
        ],
        nutrition: {
            calories: 380,
            protein: '4g',
            carbs: '52g',
            fat: '18g'
        },
        images: [
            'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'comfort']
    },
    'chocolate-croissant': {
        id: 'chocolate-croissant',
        name: 'Chocolate Croissant',
        category: 'Desserts',
        price: '$3.49',
        description: 'Buttery, flaky croissant filled with rich Belgian chocolate. Baked fresh daily, this pastry is perfect for breakfast or as an afternoon treat.',
        details: [
            'Buttery flaky croissant',
            'Rich Belgian chocolate',
            'Baked fresh daily',
            'Perfect for any time',
            'Pairs well with coffee'
        ],
        nutrition: {
            calories: 320,
            protein: '6g',
            carbs: '35g',
            fat: '18g'
        },
        images: [
            'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop'
        ],
        tags: ['sweet', 'popular']
    },
    'blueberry-muffin': {
        id: 'blueberry-muffin',
        name: 'Blueberry Muffin',
        category: 'Desserts',
        price: '$2.99',
        description: 'Fresh blueberry muffin bursting with juicy blueberries in a moist, tender crumb. Baked daily using only the freshest ingredients.',
        details: [
            'Fresh blueberries',
            'Moist tender crumb',
            'Baked daily',
            'Sweet but not too sweet',
            'Perfect with coffee'
        ],
        nutrition: {
            calories: 280,
            protein: '5g',
            carbs: '38g',
            fat: '12g'
        },
        images: [
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop'
        ],
        tags: ['sweet']
    },
    'cookie': {
        id: 'cookie',
        name: 'Cookie',
        category: 'Desserts',
        price: '$1.99',
        description: 'Freshly baked cookie available in chocolate chip or oatmeal raisin. Soft, chewy, and full of flavor. The perfect little treat.',
        details: [
            'Choice of chocolate chip or oatmeal raisin',
            'Soft and chewy',
            'Baked fresh daily',
            'Perfect size for a snack',
            'Pairs well with any drink'
        ],
        nutrition: {
            calories: 180,
            protein: '2g',
            carbs: '24g',
            fat: '9g'
        },
        images: [
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop'
        ],
        tags: ['sweet']
    }
};

// Get item ID from URL
function getItemIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load item details
function loadItemDetails() {
    const itemId = getItemIdFromUrl();
    
    if (!itemId || !menuItems[itemId]) {
        showErrorMessage('Item not found');
        return;
    }

    const item = menuItems[itemId];
    
    // Update page title
    document.title = `${item.name} - Simple Café`;
    
    // Update header
    document.getElementById('itemTitle').textContent = item.name;
    document.getElementById('itemCategory').textContent = item.category;
    
    // Update item info
    document.getElementById('itemName').textContent = item.name;
    document.getElementById('itemPrice').textContent = item.price;
    document.getElementById('itemDescription').textContent = item.description;
    
    // Update details list
    const detailsList = document.getElementById('itemDetailsList');
    detailsList.innerHTML = '';
    item.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });
    
    // Update nutrition
    document.getElementById('calories').textContent = item.nutrition.calories;
    document.getElementById('protein').textContent = item.nutrition.protein;
    document.getElementById('carbs').textContent = item.nutrition.carbs;
    document.getElementById('fat').textContent = item.nutrition.fat;
    
    // Update images
    updateGallery(item.images);
    
    // Update tags
    updateTags(item.tags);
    
    // Load related items
    loadRelatedItems(item.category, itemId);
}

// Update gallery
function updateGallery(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    
    if (images.length > 0) {
        mainImage.src = images[0];
        mainImage.alt = 'Main Item Image';
        
        thumbnailGallery.innerHTML = '';
        images.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                mainImage.src = imgSrc;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            thumbnailGallery.appendChild(thumbnail);
        });
    }
}

// Update tags
function updateTags(tags) {
    const tagsContainer = document.getElementById('itemTags');
    tagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        
        if (tag === 'vegetarian') tagElement.classList.add('vegetarian');
        if (tag === 'vegan') tagElement.classList.add('vegan');
        if (tag === 'gluten-free') tagElement.classList.add('gluten-free');
        if (tag === 'spicy') tagElement.classList.add('spicy');
        
        tagElement.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        tagsContainer.appendChild(tagElement);
    });
}

// Load related items
function loadRelatedItems(category, currentItemId) {
    const relatedContainer = document.getElementById('relatedItems');
    relatedContainer.innerHTML = '';
    
    // Get items from same category, excluding current item
    const relatedItems = Object.values(menuItems)
        .filter(item => item.category === category && item.id !== currentItemId)
        .slice(0, 4);
    
    relatedItems.forEach(item => {
        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-item';
        relatedItem.innerHTML = `
            <div class="related-item-image">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="related-item-content">
                <h3>${item.name}</h3>
                <span class="price">${item.price}</span>
            </div>
        `;
        relatedItem.addEventListener('click', () => {
            window.location.href = `item-details.html?id=${item.id}`;
        });
        relatedContainer.appendChild(relatedItem);
    });
}

// Show error message
function showErrorMessage(message) {
    const container = document.querySelector('.item-details-container');
    container.innerHTML = `<div class="loading">${message}</div>`;
}

// Add to cart button
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const itemId = getItemIdFromUrl();
            const item = menuItems[itemId];
            
            // Show success message
            alert(`${item.name} has been added to your order!`);
        });
    }
    
    // Load item details
    loadItemDetails();
});
