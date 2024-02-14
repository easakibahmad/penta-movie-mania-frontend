/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpOutlined } from "@ant-design/icons";

const BackToTopButton = ({ scrollToTop, backToTopButton }: any) => {
  return (
    <div className="flex justify-center">
      <button
        className="fixed top-10  bg-white text-black px-4 py-1 text-sm rounded-full shadow-lg transition-opacity duration-1000 ease-in-out hover:opacity-100 hover:bg-blue-500 hover:text-white"
        onClick={scrollToTop}
        style={{ opacity: backToTopButton ? 1 : 0 }}
      >
        <ArrowUpOutlined style={{ marginRight: "5px" }} />
        Back to Top
      </button>
    </div>
  );
};

export default BackToTopButton;
