import home from "../../assets/media/home.png";
import developer from "../../assets/media/developer.png";
import project from "../../assets/media/project.png";
import planning from "../../assets/media/planning.png";
import hr from "../../assets/media/hr.png";
import software from "../../assets/media/software.png";
import bank from "../../assets/media/bank.png";
import data from "../../assets/media/data.png";
import startup from "../../assets/media/startup.png";
import sales from "../../assets/media/sales.png";
import next from "../../assets/media/next.png";
import mnc from "../../assets/media/MNC.png";
function CategoryCompany(){
    return(
        <>
          <div className="mt-10">
            <div className="flex flex-nowrap gap-6 justify-start overflow-y-hidden overflow-x-auto lg:justify-center">
              
              <div className="flex-shrink-0 rounded-xl hover:shadow-blue-600 hover:shadow-lg flex items-center gap-3 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={home} alt="" className="h-5"/>
                <h1 className="text-lg  font-semibold m-0">Remote</h1>
                <img src={next} alt="" className="h-5" />
              </div>

              <div className="flex-shrink-0  flex  rounded-xl hover:shadow-blue-600 hover:shadow-lg items-center gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
               <img src={mnc} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0 ">MNC</h1>
                <img src={next} alt="" className="h-5" />
              </div>


              <div className="flex-shrink-0  flex rounded-xl items-center hover:shadow-blue-600 hover:shadow-lg gap-2 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={developer} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Engineering</h1>
                <img src={next} alt="" className="h-5"  />
              </div>

              <div className="flex-shrink-0 rounded-xl  flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
               <img src={project} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Project Mg..</h1>
                <img src={next} alt="" className="h-5"   />
              </div>

              <div className="flex-shrink-0 rounded-xl  flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={planning} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Marketing</h1>
                <img src={next} alt="" className="h-5"  />
              </div>
              <div className="flex-shrink-0 rounded-xl  flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={hr} alt="" className="h-5"/>
                <h1 className="text-sm  font-semibold m-0">HR</h1>
                <img src={next} alt="" className="h-5" />
              </div>

            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-nowrap gap-6 justify-start overflow-y-hidden overflow-x-auto lg:justify-center">
              
              <div className="flex-shrink-0  rounded-xl flex items-center hover:shadow-blue-600 hover:shadow-lg gap-3 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={software} alt="" className="h-5"/>
                <h1 className="text-lg  font-semibold m-0">Software & ..</h1>
                <img src={next} alt=""  className="h-5" />
              </div>

              <div className="flex-shrink-0 rounded-xl  flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={bank} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0 ">Banking & ...</h1>
                <img src={next} alt="" className="h-5" />
              </div>


              <div className="flex-shrink-0 rounded-xl flex items-center hover:shadow-blue-600 hover:shadow-lg gap-2 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={data} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Data Science</h1>
                <img src={next} alt="" className="h-5" />
              </div>

              <div className="flex-shrink-0 rounded-xl flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={startup} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Startup</h1>
                <img src={next} alt="" className="h-5" />
              </div>

              <div className="flex-shrink-0 rounded-xl flex items-center hover:shadow-blue-600 hover:shadow-lg gap-5 whitespace-nowrap border border-gray-400 h-15 ml-5 px-4 min-w-[160px] sm:min-w-[180px]">
                <img src={sales} alt="" className="h-5"/>
                <h1 className="text-sm font-semibold m-0">Sales</h1>
                <img src={next} alt="" className="h-5" />
              </div>
            </div>
          </div>
        </>
    )
}
export default CategoryCompany;