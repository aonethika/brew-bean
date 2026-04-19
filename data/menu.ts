export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    price: 120,
    image: "/espresso.jpeg",
    desc: "Made by forcing hot water through finely ground coffee beans to create a strong, concentrated shot of coffee.",
  },
  {
    id: "latte",
    name: "Latte",
    price: 180,
    image: "/latte.jpeg",
    desc: "Prepared with espresso and steamed milk, creating a smooth and creamy coffee with a light foam layer on top.",
  },
  {
    id: "iced",
    name: "Iced Coffee",
    price: 150,
    image: "/iced.jpeg",
    desc: "Brewed coffee is cooled and served over ice, often mixed with milk and sugar for a refreshing chilled drink.",
  },
  {
    id: "americano",
    name: "Americano",
    price: 150,
    image: "/americano.jpg",
    desc: "Made by diluting a shot of espresso with hot water, giving a lighter taste while preserving coffee strength.",
  },
  {
    id: "mocha",
    name: "Mocha",
    price: 200,
    image: "/mocha.jpg",
    desc: "A rich blend of espresso, chocolate syrup, and steamed milk, topped with a creamy chocolate flavor.",
  },
  {
    id: "hotchocolate",
    name: "Hot Chocolate",
    price: 160,
    image: "/hot-chocolate.jpg",
    desc: "Prepared by mixing cocoa powder with hot milk and sugar, resulting in a warm and creamy chocolate drink.",
  },
  {
    id: "filtercoffee",
    name: "Filter Coffee",
    price: 100,
    image: "/coffee.jpg",
    desc: "Traditional South Indian coffee brewed using a metal filter and mixed with hot milk for a strong aromatic taste.",
  },
];