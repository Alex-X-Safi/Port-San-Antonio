document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.querySelector('.home-page');
    const snackMenu = document.querySelector('.snack-menu');
    const restaurantMenu = document.querySelector('.restaurant-menu');
    const chatbox = document.querySelector('.chatbox');
    const sailorMascot = document.querySelector('.sailor-mascot');
    const searchBar = document.getElementById('searchBar');
    const filterSelect = document.getElementById('filterSelect');
    const chatboxBody = document.querySelector('.chatbox-body');
    const chatInput = document.getElementById('chatInput');

    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => button.addEventListener('click', () => {
        homePage.classList.remove('hidden');
        snackMenu.classList.add('hidden');
        restaurantMenu.classList.add('hidden');
    }));

    document.getElementById('snackButton').addEventListener('click', () => {
        homePage.classList.add('hidden');
        snackMenu.classList.remove('hidden');
    });

    document.getElementById('restaurantButton').addEventListener('click', () => {
        homePage.classList.add('hidden');
        restaurantMenu.classList.remove('hidden');
    });

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            showCategory(category);
        });
    });

    function showCategory(category) {
        document.querySelectorAll('.menu-section').forEach(section => {
            if (section.getAttribute('data-category') === category || category === 'All') {
                section.classList.remove('hidden');
                colorMenuItems(section, category); // Color items when shown
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function colorMenuItems(section, category) {
        let color;
        switch (category) {
            case 'Burgers':
                color = '#FF7F50';
                break;
            case 'Pizza':
                color = '#FFD700';
                break;
            case 'Sandwiches':
                color = '#32CD32';
                break;
            case 'Salads':
                color = '#20B2AA';
                break;
            case 'Appetizers-Side-Items':
                color = '#FF8C00';
                break;
            case 'Platters':
                color = '#BA55D3';
                break;
            case 'Drinks':
                color = '#1E90FF';
                break;
            default:
                color = '#f0f8ff';
        }
        section.querySelectorAll('li').forEach(item => {
            item.style.backgroundColor = color;
        });
    }

    searchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        filterMenuItems(query);
    });

    filterSelect.addEventListener('change', (event) => {
        const sortType = event.target.value;
        sortMenuItems(sortType);
    });

    function filterMenuItems(query) {
        document.querySelectorAll('.menu-section ul li').forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function sortMenuItems(sortType) {
        document.querySelectorAll('.menu-section ul').forEach(list => {
            const items = Array.from(list.querySelectorAll('li'));
            items.sort((a, b) => {
                if (sortType === 'priceAsc') {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                } else if (sortType === 'priceDesc') {
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                } else {
                    return 0; // No sorting
                }
            });
            list.innerHTML = '';
            items.forEach(item => list.appendChild(item));
        });
    }

    sailorMascot.addEventListener('click', () => {
        chatbox.style.display = 'block'; // Show the chatbox
    });

    document.querySelector('.close-button').addEventListener('click', () => {
        chatbox.style.display = 'none'; // Hide the chatbox
    });

    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && chatInput.value.trim() !== "") {
            const userMessage = chatInput.value;
            addMessageToChatbox("User", userMessage);
            processUserInput(userMessage);
            chatInput.value = "";
        }
    });

    function addMessageToChatbox(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatboxBody.appendChild(messageElement);
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
    }

    function processUserInput(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response;

        if (lowerCaseMessage.includes("suggest")) {
            response = suggestMenuItems();
        } else if (lowerCaseMessage.includes("ingredient") || lowerCaseMessage.includes("what's in")) {
            response = provideIngredients(lowerCaseMessage);
        } else {
            response = "I'm not sure how to respond to that. You can ask me for suggestions or ingredients!";
        }

        addMessageToChatbox("Sailor AI", response);
    }

    function suggestMenuItems() {
        const suggestions = [
            "How about trying our delicious Cheese Burger? It's made with a grilled beef patty, tomatoes, onions, pickles, lettuce, ketchup, and cheese!",
            "If you're in the mood for something lighter, our Greek Salad is a great choice with feta cheese, tomatoes, cucumber, olives, and Greek dressing.",
            "Our Pepperoni Pizza is a customer favorite, with Italian sausage, oregano, and plenty of cheese.",
            "Looking for something spicy? The Fajita Sub, with grilled chicken strips, mixed onions, pepper with guacamole spread, and mixed cheese, might be just what you need!"
        ];

        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    function provideIngredients(message) {
        const ingredients = {
            "classic hamburger": "Grilled beef patty with tomatoes, onions, pickles, lettuce, and ketchup.",
            "cheese burger": "Grilled beef patty with tomatoes, onions, pickles, lettuce, ketchup, and cheese.",
            "chicken burger": "Grilled chicken, lettuce, tomatoes, pickles, garlic mayo sauce.",
            "pizza cheese": "Tomato sauce, cheese, and oregano.",
            "cheese & ham pizza": "Tomato sauce, cheese, oregano, and ham.",
            "pepperoni pizza": "Tomato sauce, Italian sausage, oregano, cheese.",
            "vegetarian pizza": "Green peppers, onions, corn, olives, mushrooms, oregano.",
            "chicken sub": "Grilled chicken breast, lettuce, tomatoes, pickles, mayo sauce.",
            "fajita sub": "Grilled chicken strips, mixed onions, pepper with guacamole spread, mixed cheese.",
            "tuna sandwich": "Tuna mix, pickles, lettuce, corn, mayo sauce.",
            "hot dog": "Beef hotdog, coleslaw, pickles, ketchup, mustard.",
            "tawouk": "Grilled marinated chicken breast skewers, French fries, coleslaw, pickles, garlic, mayo sauce.",
            "season salad": "Lettuce, tomatoes, cucumber, chopped mint with olive oil, and house dressing.",
            "greek salad": "Lettuce, feta cheese, tomatoes, cucumber, olives, green pepper, Greek dressing.",
            "crab salad": "Shaved crab sticks, rocca, shredded carrots, lettuce, corn, olives, lemon, or cocktail dressing.",
            "shrimp salad": "Baby shrimps, lettuce, corn, carrot, cucumber, rocca, cherry tomatoes, avocado, lemon, or mayo sauce."
        };

        for (let item in ingredients) {
            if (message.includes(item)) {
                return `The ingredients in our ${item.replace("-", " ")} are: ${ingredients[item]}`;
            }
        }

        return "I'm sorry, I don't recognize that item. Please check the name and try again!";
    }
});
