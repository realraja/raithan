import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { checkAdmin } from "@/redux/actions/adminActions";
import toast from "react-hot-toast";
import axios from "axios";
import ChooseMethod from "../ImageDialog/ChooseMethod";
import mime from "mime";

const AddQuestion = ({ isOpen, setIsOpen, quiz }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState("2");
  const [questionUrl, setQuestionUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("image");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // console.log(questionUrl)
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/question", {
       question,
        answer,
        quiz,
        timer,
        options:activeTab === "details" && options,
        questionUrl:activeTab !== "details" && questionUrl,
      });

      // console.log(data);

      await dispatch(checkAdmin());
      toast.success(data.message);
      setIsOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      error.response
        ? toast.error(error.response.data.message)
        : toast.error(error.message);
      setLoading(false);
    }
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };


// console.log(mime.getType(questionUrl));

  return (<>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full overflow-auto items-end sm:items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full mx-4 sm:max-w-lg p-6 bg-gray-900 text-white rounded-lg shadow-xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-lg font-medium leading-6 text-purple-400">
                    Add Quiz Question
                  </Dialog.Title>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mt-4">
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "details"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    } rounded-l-lg`}
                    onClick={() => setActiveTab("details")}
                  >
                    Enter Details
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "image"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    } rounded-r-lg`}
                    onClick={() => setActiveTab("image")}
                  >
                    Upload Image
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {activeTab === "details" && (
                    <>
                      <div>
                        <textarea
                          className="w-[90%] mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Type your question"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium">
                          Options
                        </label>
                        {["a", "b", "c", "d"].map((opt) => (
                          <div
                            key={opt}
                            className="mt-1 flex justify-around items-center"
                          >
                            <label className="w-max font-medium">
                              {opt.toUpperCase()} :
                            </label>
                            <input
                              className="w-[90%] p-2 bg-gray-800 border border-gray-700 rounded"
                              type="text"
                              name={opt}
                              value={options[opt]}
                              onChange={handleOptionChange}
                              placeholder={`Enter option ${opt.toUpperCase()}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-5 mx-10 justify-center items-center">
                        <select
                          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          required
                        >
                          <option value="">Correct Option</option>
                          {["a", "b", "c", "d"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <select
                          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                          value={timer}
                          onChange={(e) => setTimer(e.target.value)}
                          required
                        >
                          <option value="">Timer</option>
                          {["1", "2", "3", "4", "5"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.toUpperCase()} Minutes
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === "image" && (
                    <div className="space-y-4">
                      <div>
                        <label>Question Image</label>
                        {questionUrl ? (
                          <div onClick={() => setIsImageDialogOpen(true)}  className="h-52 flex justify-center items-center m-5 rounded-lg cursor-pointer">
                            <img className="h-full" src={questionUrl} alt="question url" />
                          </div>
                        ) : (
                          <div  onClick={() => setIsImageDialogOpen(true)} className="h-52 flex flex-col justify-center items-center gap-1 cursor-pointer bg-gray-800 m-5 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                              />
                            </svg>
                            <p>Upload Image</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-5 mx-10 justify-center items-center">
                        <select
                          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          required
                        >
                          <option value="">Correct Option</option>
                          {["a", "b", "c", "d"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <select
                          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                          value={timer}
                          onChange={(e) => setTimer(e.target.value)}
                          required
                        >
                          <option value="">Timer</option>
                          {["1", "2", "3", "4", "5"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.toUpperCase()} Minutes
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 rounded"
                    >
                      {loading ? (
                        <BeatLoader className=" self-center" color="white" />
                      ) : (
                        "Add Question"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>


    </Transition>
      <ChooseMethod isOpen={isImageDialogOpen} setIsOpen={setIsImageDialogOpen} setImgUrl={setQuestionUrl} />
    </>
  );
};

export default AddQuestion;
