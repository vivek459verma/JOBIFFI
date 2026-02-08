import { BsBoxSeam } from "react-icons/bs"; 
import { BsRocketTakeoff } from "react-icons/bs"; 
import { BiBarChart } from "react-icons/bi"; 
import { FaRupeeSign } from "react-icons/fa"; 
import { HiComputerDesktop } from "react-icons/hi2"; 
import { BiTrendingUp } from "react-icons/bi"; 
import { BsCheck2Circle } from "react-icons/bs"; 
import { AiOutlineSetting } from "react-icons/ai"; 
import { BsPeople } from "react-icons/bs"; 
import { BsFillBuildingsFill } from "react-icons/bs"; 
import { TbMathGreater } from "react-icons/tb"; 
import { AiOutlineHome } from "react-icons/ai"; 
function CategoryCompany(){
    return(
        <>
          <div className="mt-10">
            <div className="flex flex-nowrap gap-6 justify-start overflow-y-hidden overflow-x-auto lg:justify-center">
              
              <div className="flex-shrink-0 flex items-center gap-3 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <AiOutlineHome className="text-lg"/>
                <h1 className="text-lg  font-semibold m-0">Remote</h1>
                <TbMathGreater className="text-lg" />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BsFillBuildingsFill />
                <h1 className="text-sm font-semibold m-0 ">MNC</h1>
                <TbMathGreater />
              </div>


              <div className="flex-shrink-0  flex items-center gap-2 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <AiOutlineSetting />
                <h1 className="text-sm font-semibold m-0">Engineering</h1>
                <TbMathGreater />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BsCheck2Circle />
                <h1 className="text-sm font-semibold m-0">Project Mg..</h1>
                <TbMathGreater />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BiTrendingUp />
                <h1 className="text-sm font-semibold m-0">Marketing</h1>
                <TbMathGreater />
              </div>
              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BsPeople />
                <h1 className="text-sm  font-semibold m-0">HR</h1>
                <TbMathGreater />
              </div>

            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-nowrap gap-6 justify-start overflow-y-hidden overflow-x-auto lg:justify-center">
              
              <div className="flex-shrink-0 flex items-center gap-3 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <HiComputerDesktop className="text-lg"/>
                <h1 className="text-lg  font-semibold m-0">Software & ..</h1>
                <TbMathGreater className="text-lg" />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <FaRupeeSign />
                <h1 className="text-sm font-semibold m-0 ">Banking & ...</h1>
                <TbMathGreater />
              </div>


              <div className="flex-shrink-0  flex items-center gap-2 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BiBarChart className="text-lg"/>
                <h1 className="text-sm font-semibold m-0">Data Science</h1>
                <TbMathGreater />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BsRocketTakeoff />
                <h1 className="text-sm font-semibold m-0">Startup</h1>
                <TbMathGreater />
              </div>

              <div className="flex-shrink-0  flex items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <BsBoxSeam />
                <h1 className="text-sm font-semibold m-0">Sales</h1>
                <TbMathGreater />
              </div>
            </div>
          </div>
        </>
    )
}
export default CategoryCompany;