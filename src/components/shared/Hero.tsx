import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            Sh
            <span className="relative inline-block">
              <span className="relative z-10">oes</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-500 dark:bg-orange-400 rounded-full -z-0"></span>
            </span>
            <br />
            Collect !
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor
          </p>

          <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white px-8 py-6 text-lg rounded-full">
            Shop Now
          </Button>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="2"
                  className="dark:fill-white dark:stroke-white"
                />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                adidas
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.05 11.62C3.19 13.83 5.12 15.58 7.5 16.5C8.19 12.84 10.5 9.69 13.62 7.88C11.41 6.74 8.81 6.38 6.38 7C3.95 7.62 1.98 9.23 1 11.5L2.05 11.62ZM15.5 9C13.64 9 12 10.02 11.12 11.5C10.24 12.98 10.24 14.77 11.12 16.25C12 17.73 13.64 18.75 15.5 18.75C17.36 18.75 19 17.73 19.88 16.25C20.76 14.77 20.76 12.98 19.88 11.5C19 10.02 17.36 9 15.5 9Z"
                  fill="black"
                  className="dark:fill-white"
                />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                PUMA
              </span>
            </div>
            <span className="border-orange-300 border rounded-full px-4 p-1">
              7+ brand
            </span>
          </div>
        </div>

        <img
          src="https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Nike Air Sneaker"
        />
      </div>
    </section>
  );
}
