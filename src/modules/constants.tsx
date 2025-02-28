export const homepageImages = [
  '/assets/recipe-home/main1.jpg',
  '/assets/recipe-home/main2.jpg',
  '/assets/recipe-home/main3.jpg',
  '/assets/recipe-home/main4.jpg',
  '/assets/recipe-home/main5.jpg',
];

export const limitText = (text: string | undefined, wordLimit: number) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

{
  /* <button
onClick={handleScrollToRecipe}
className="w-2/3 sm:w-1/3 rounded-full bg-transparent hover:backdrop-blur-md cursor-pointer px-3 py-2 sm:py-4 text-sm sm:text-3xl duration-300 text-white hover:text-white ring-2 ring-white focus:outline-none"
>
Chef's Special
</button> */
}
