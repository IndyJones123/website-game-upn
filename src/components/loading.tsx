import { BiSolidGame } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import "animate.css";

const Loading = () => {
    return (
        <div className="">
            <div className="animate__animated animate__bounceOutRight text-7xl text-white animate__infinite infinite animate__slow 1s">
                <BiSolidGame />
            </div>
            <div className="flex">
                <h1 className="text-white text-5xl font-bold">Loading</h1>
                <div className="flex items-end mt-5">
                    <div className="animate__animated animate__bounce animate__infinite infinite ">
                        <RxDotFilled className="text-4xl text-white" />
                    </div>
                    <div className="animate__animated animate__bounce animate__infinite infinite animate__slow">
                        <RxDotFilled className="text-4xl text-white" />
                    </div>
                    <div className="animate__animated animate__bounce animate__infinite infinite animate__slower">
                        <RxDotFilled className="text-4xl text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
