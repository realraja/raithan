"use client"
import { adminTryCatch } from '@/utils/AdminActions';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ModalImage from 'react-modal-image';
import { ClipLoader } from 'react-spinners';

const Page = () => {
  return (
    <div>
      <AdminNotification />
    </div>
  )
}

export default Page;


const AdminNotification = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [commentData, setCommentData] = useState([]);

  const getComments = adminTryCatch(async () => {
    const { data } = await axios.get(`/api/admin/notification`);
    setCommentData(data.data);
    setLoading(false);
  });

  const handleSubmitComment = adminTryCatch(async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/admin/notification", {
      message,
    });
    toast.success(data.message);
    setMessage("");
  });

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="w-full px-5">
      <form
        className=" flex justify-center items-center flex-col"
        onSubmit={handleSubmitComment}
      >
        <textarea
          placeholder="Send Notification to Users..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 mt-4 rounded-lg focus:outline-none w-full bg-gray-800"
          rows="2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 self-start text-white px-6 py-3 mt-4 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>

      {loading ? (
        <div className="w-full p-5 flex justify-center items-center">
          <ClipLoader color="#46e53c" size={100} />{" "}
        </div>
      ) : (
        <div>
          {commentData &&
            [...commentData].reverse().map((i, j) => (
              <div
                key={j}
                className="flex items-center gap-4 border rounded-md px-4 py-2 my-5"
              >
                <ModalImage
                  className="h-12 w-12 rounded-full object-cover"
                  small={i?.user?.avatar || 'https://res.cloudinary.com/dwc3gwskl/image/upload/v1721379013/samples/ecommerce/fiiijyy4cq1nrcp7t4zz.jpg'}
                  large={i?.user?.avatar || 'https://res.cloudinary.com/dwc3gwskl/image/upload/v1721379013/samples/ecommerce/fiiijyy4cq1nrcp7t4zz.jpg'} // Replace with your actual image URL
                  alt="question Image"
                />
                <div className="w-[90%]">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-lg font-bold">
                      {i?.user?.name ?(i.user.name[0].toUpperCase() + i.user.name.slice(1)): (i.name[0].toUpperCase() + i.name.slice(1))}
                    </p>
                    <p className="text-lg">
                    {i?.user?.phone || i?.phone}
                    </p>
                    <p className="text-xs font-extralight text-gray-300">
                      {moment(i.updatedAt).fromNow()}
                    </p>
                  </div>
                  <p className="text-gray-200 font-extralight font-sans">
                    {i.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

