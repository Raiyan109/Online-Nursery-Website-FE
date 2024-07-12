import { Button } from "@/components/ui/button"
import {
    Drawer,

    DrawerContent,


    DrawerHeader,

    DrawerTrigger,
} from "@/components/ui/drawer"

import { Label } from "./ui/label";
import { Slider } from "@/components/ui/slider"

interface FilterSearchProps {
    searchText: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    minPrice: number;
    maxPrice: number;
    handlePriceChange: (min: number, max: number) => void;
    setMinPrice: React.Dispatch<React.SetStateAction<number>>;
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
    searchText,
    handleChange,

    minPrice,
    maxPrice,
    handlePriceChange,

}) => {

    // const handleResetFilters = () => {
    //     Reset all filter states to their initial values
    //     setSelectedCategory(null);
    //     setMinPrice(0);
    //     setMaxPrice(1000);
    //     setSearchText('');
    // };
    return (

        <div className="p-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none mr-12">
            <div className="relative flex">
                {/* <select
                    className="bg-white dark:bg-gray-800 h-10 px-5 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 dark:border-gray-600 border-r-1 cursor-pointer max-h-10 overflow-y-hidden">
                    <option className="font-medium cursor-pointer" value="filter">filter</option>
                </select> */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="btn-green-rounded rounded-s-2xl">Filter</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-2xl">
                            <DrawerHeader>
                                <div className=" py-4">
                                    <div className="flex justify-between items-center gap-10">
                                        <div className="flex-1">
                                            <Label htmlFor="title" className="text-right text-2xl">
                                                Filter by price
                                            </Label>
                                        </div>
                                        <div className="flex-1">
                                            <Slider defaultValue={[minPrice, maxPrice]} max={1000} step={1} onValueChange={handlePriceChange} />
                                        </div>

                                    </div>

                                </div>
                                {/* <DrawerTitle>Move Goal</DrawerTitle>
                                <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
                            </DrawerHeader>
                            {/* <div className="p-4 pb-0">
                                <div className="flex items-center justify-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() => onClick(-10)}
                                        disabled={goal <= 200}
                                    >
                                        <Minus className="h-4 w-4" />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <div className="flex-1 text-center">
                                        <div className="text-7xl font-bold tracking-tighter">
                                            {goal}
                                        </div>
                                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                                            Calories/day
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() => onClick(10)}
                                        disabled={goal >= 400}
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span className="sr-only">Increase</span>
                                    </Button>
                                </div>
                                <div className="mt-3 h-[120px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data}>
                                            <Bar
                                                dataKey="goal"
                                                style={
                                                    {
                                                        fill: "hsl(var(--foreground))",
                                                        opacity: 0.9,
                                                    } as React.CSSProperties
                                                }
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div> */}
                            {/* <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter> */}
                        </div>
                    </DrawerContent>
                </Drawer>
                <input
                    type="search"
                    name="search"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="Search"
                    className="bg-white dark:bg-gray-800 h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"
                />
                {/* <button
                    type="submit"
                    className="absolute inset-y-0 right-0 mr-2 flex items-center px-2">
                    <svg
                        className="h-4 w-4 fill-current dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1" id="Capa_1" x="0px" y="0px"
                        viewBox="0 0 56.966 56.966"
                        xml:space="preserve"
                        width="512px"
                        height="512px">
                        <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button> */}
            </div>
        </div>

    )
}

export default FilterSearch